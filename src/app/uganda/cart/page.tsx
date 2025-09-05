"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cart-context";

export default function CartPage() {
  const { cart, updateLine, removeLine, formatMoney } = useCart();

  const subtotal = formatMoney(cart.cost.subtotalAmount);
  const checkout = () => {
    if (cart.checkoutUrl) window.location.href = cart.checkoutUrl;
  };

  if (!cart.lines.length) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">Continue shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.lines.map((line) => {
          const img = line.merchandise.image;
          const title = line.merchandise.product.title;
          const opts = line.merchandise.selectedOptions?.map(o => `${o.name}: ${o.value}`).join(" · ");
          const linePrice = formatMoney(line.cost.totalAmount);

          return (
            <div key={line.id} className="flex items-center gap-4 border-b pb-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                {img?.url && (
                  <Image src={img.url} alt={img.altText || title} fill className="object-contain" />
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

      <div className="mt-8 flex items-center justify-between">
        <div className="text-lg">
          Subtotal: <span className="font-semibold">{subtotal}</span>
        </div>
        <button
          onClick={checkout}
          className="px-6 py-3 rounded bg-[#005499] hover:bg-indigo-700 text-white"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
