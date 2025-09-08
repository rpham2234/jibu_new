"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/[country]/cart/cart-context";

type SiteInfo = { country: string };

export function CartClient({ siteInfo }: { siteInfo: SiteInfo }) {
  const {
    cart,
    updateLine,
    removeLine,
    formatMoney,
    ensureCart,
    bootstrapped,
    country, // active market (from provider)
  } = useCart();

  // On cart page, only load an existing cart; don't create a new one
  useEffect(() => {
    if (!bootstrapped) return;
    ensureCart({ createIfMissing: false });
  }, [bootstrapped, ensureCart, country]);

  const checkout = () => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  };

  // Show a tiny skeleton while we restore cart ID from storage
  if (!bootstrapped) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
        <div className="space-y-4">
          <div className="h-24 bg-gray-100 animate-pulse rounded" />
          <div className="h-24 bg-gray-100 animate-pulse rounded" />
        </div>
      </main>
    );
  }

  // After bootstrapping, if no cart (or no lines), show empty state WITHOUT creating one
  if (!cart || !cart.lines?.length) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <div className="mt-6">
          <Link
            href={`/${siteInfo.country.toLowerCase()}#products`}
            prefetch={false}
            className="text-blue-600 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = formatMoney(cart.cost.subtotalAmount);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.lines.map((line) => {
          const img = line.merchandise.image;
          const title = line.merchandise.product.title;
          const opts = line.merchandise.selectedOptions
            ?.map((o) => `${o.name}: ${o.value}`)
            .join(" · ");
          const linePrice = formatMoney(line.cost.totalAmount);

          return (
            <div key={line.id} className="flex items-center gap-4 border-b pb-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                {img?.url && (
                  <Image
                    src={img.url}
                    alt={img.altText || title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="font-medium">{title}</div>
                {opts && <div className="text-sm text-gray-600">{opts}</div>}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-[2ch] text-center">{line.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => updateLine(line.id, line.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-sm text-red-600 hover:underline"
                    onClick={() => removeLine(line.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="font-medium">{linePrice}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center">
        <div className="text-lg">
          Subtotal: <span className="font-semibold">{subtotal}</span>
        </div>

        <div className="ml-auto flex items-center gap-3 whitespace-nowrap">
          <Link
            href={`/${siteInfo.country.toLowerCase()}#products`}
            prefetch={false}
            className="text-[#005499] hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005499]"
          >
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={checkout}
            className="px-6 py-3 rounded bg-[#005499] hover:bg-indigo-700 text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
