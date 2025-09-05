"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { BackLinkCountry } from "../subcomponents/BackButton";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/uganda/cart/cart-context";
import {
  getProductWithVariantsById,
  findVariantId,
  type ProductWithVariants,
  formatMoney,
} from "@/lib/shopifyCart"; // ensure this exports formatMoney and matches types

interface Product {
  _id: string;   // numeric Shopify product id
  img: string;
  imageAlt?: string;
  productName: string;
  price?: string;
  type: string;
  description: string;
}

interface ProductPageProps {
  product: Product;
  country: string;
}

export default function ProductPage({ product, country }: ProductPageProps) {
  const [fullProduct, setFullProduct] = useState<ProductWithVariants | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const { addLine } = useCart();
  const addingRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    getProductWithVariantsById(product._id)
      .then((p) => {
        if (!mounted || !p) return;
        setFullProduct(p);
        const initial: Record<string, string> = {};
        (p.options ?? []).forEach((o) => {
          if (o.values?.length) initial[o.name] = o.values[0];
        });
        setSelections(initial);
      })
      .catch((e) => setErr(e.message));
    return () => { mounted = false; };
  }, [product._id]);

  const activeVariant = useMemo(() => {
    if (!fullProduct) return null;
    if (!fullProduct.options?.length) return fullProduct.variants?.[0] ?? null;
    const id = findVariantId(fullProduct, selections);
    return fullProduct.variants.find(v => v.id === id) ?? null;
  }, [fullProduct, selections]);

  const displayPrice = useMemo(() => {
    if (activeVariant?.price) return formatMoney(activeVariant.price);
    const min = (fullProduct as any)?.priceRange?.minVariantPrice; // ensure type includes priceRange
    const max = (fullProduct as any)?.priceRange?.maxVariantPrice;
    if (min && max && (min.amount !== max.amount)) return `${formatMoney(min)} – ${formatMoney(max)}`;
    return min ? formatMoney(min) : (product.price ?? "");
  }, [activeVariant, fullProduct, product.price]);

  const displayCompareAt = useMemo(() => {
    const c = (activeVariant as any)?.compareAtPrice; // ensure Variant has compareAtPrice in your lib
    const p = activeVariant?.price;
    if (!c || !p) return "";
    if (Number(c.amount) <= Number(p.amount)) return "";
    return formatMoney(c);
  }, [activeVariant]);

  const choose = (optName: string, val: string) => {
    setSelections(prev => ({ ...prev, [optName]: val }));
    setErr("");
  };

  const handleAddToCart = useCallback(async () => {
    if (!fullProduct) return;
    // require selections for all options
    const missing = (fullProduct.options ?? []).filter(o => !selections[o.name]);
    if (missing.length) {
      setErr(`Please choose: ${missing.map(o => o.name).join(", ")}`);
      return;
    }
    if (!activeVariant?.id) {
      setErr("Selected option is unavailable.");
      return;
    }
    if (addingRef.current) return; // single-flight guard
    addingRef.current = true;
    setLoading(true);
    setErr("");
    try {
      await addLine(activeVariant.id, 1);
      router.push("/uganda/cart");
    } catch (e: any) {
      setErr(e?.message || "Failed to add to cart");
      setLoading(false); // we stay on page if error
    } finally {
      addingRef.current = false;
    }
  }, [fullProduct, selections, activeVariant?.id, addLine, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left */}
      <div>
        <div className="mb-4">
          <BackLinkCountry country={country} />
        </div>
        <div className="mb-4 relative w-full h-[500px]">
          <Image
            src={product.img}
            alt={product.imageAlt || product.productName}
            fill
            className="rounded-lg object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          {displayCompareAt && <span className="text-gray-500 line-through">{displayCompareAt}</span>}
          <h3 className="text-xl font-semibold">{displayPrice}</h3>
        </div>

        {fullProduct?.options?.map((opt) => (
          <div className="mb-4" key={opt.name}>
            <h3 className="text-sm font-medium mb-2">{opt.name}</h3>
            <div className="flex flex-wrap gap-2">
              {opt.values.map((val) => {
                const selected = selections[opt.name] === val;
                return (
                  <button
                    key={val}
                    onClick={() => choose(opt.name, val)}
                    className={`px-3 py-1 border rounded ${selected ? "border-black bg-black text-white" : "border-gray-300"}`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading || !activeVariant?.id}
          className={`py-3 rounded-lg mb-4 w-full ${
            loading || !activeVariant?.id
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#005499] hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Adding…" : "Add to cart"}
        </button>

        {err && <p className="text-sm text-red-600 mb-3">{err}</p>}

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
