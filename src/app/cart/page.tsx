"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Droplet } from "lucide-react";
import { useState, FormEvent } from "react";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/features/cart/slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(clearCart());
  };

  if (items.length === 0 || submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
              <ShoppingBag className="h-8 w-8 text-sky-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {submitted ? "Order Placed!" : "Your cart is empty"}
            </h1>
            <p className="mb-8 max-w-sm text-center text-gray-500">
              {submitted
                ? "Thank you for your order. We will contact you shortly to confirm delivery."
                : "Looks like you have not added any products yet. Browse our collection to find the perfect water purifier."}
            </p>
            <Link
              href="/products"
              className="rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0e2a4a]">
            <Droplet className="h-5 w-5 fill-sky-400 text-sky-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500">
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row"
              >
                <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32">
                  <Image
                    src={item.image || "/images/kit.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-lg font-bold text-blue-700">
                      ৳ {Number(item.price).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.productId,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-colors hover:border-sky-400 hover:text-sky-600"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.productId,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-colors hover:border-sky-400 hover:text-sky-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-700">
                        ৳{" "}
                        {Number(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item.productId))
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>৳ {Number(cartTotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>৳ {Number(cartTotal).toLocaleString()}</span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                   <input
                     type="text"
                     required
                     className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none"
                     placeholder="Enter your full name"
                   />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                   <input
                     type="tel"
                     required
                     className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none"
                     placeholder="Enter your phone number"
                   />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                   <textarea
                     required
                     rows={3}
                     className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none"
                     placeholder="Enter your full address"
                   />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-sky-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                >
                  Place Order
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-gray-400">
                We will confirm your order via phone call
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
