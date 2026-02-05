import React, {useEffect, useMemo, useRef} from "react";

/**
 * Shopify Collection Buy Button (TypeScript + React)
 * - Loads Shopify Buy Button SDK once
 * - Creates a `collection` component inside a div ref
 * - Cleans up on unmount or when props change
 *
 * Notes
 * - `storefrontAccessToken` is a public Storefront API token (safe for client).
 * - Works with Next.js/SSR: runs only in the browser.
 */

declare global {
  interface Window {
    ShopifyBuy?: any;
    __shopifyBuyLoadedPromise?: Promise<void>;
  }
}

export type ShopifyUIOptions = Record<string, any>;

export interface ShopifyCollectionBuyButtonProps {
  domain: string;
  storefrontAccessToken: string;
  collectionId: string | number;
  moneyFormat?: string; // e.g. "Ush%20%7B%7Bamount_no_decimals%7D%7D"
  /**
   * Options object passed to ShopifyBuy.UI.createComponent("collection", { options })
   * See https://shopify.dev/docs/custom-storefronts/buy-button for schema.
   */
  options?: ShopifyUIOptions;
  /**
   * Optional id/class for the container div.
   */
  id?: string;
  className?: string;
}

const DEFAULT_OPTIONS: ShopifyUIOptions = {
  product: {
    styles: {
      product: {
        "@media (min-width: 601px)": {
          maxWidth: "calc(25% - 20px)",
          marginLeft: "20px",
          marginBottom: "50px",
          width: "calc(25% - 20px)",
        },
        img: {
          height: "calc(100% - 15px)",
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
        },
        imgWrapper: {
          paddingTop: "calc(75% + 15px)",
          position: "relative",
          height: 0,
        },
      },
      button: {
        fontFamily: "Lato, sans-serif",
        ":hover": { backgroundColor: "#004c8a" },
        backgroundColor: "#005499",
        ":focus": { backgroundColor: "#004c8a" },
        borderRadius: "10px",
        paddingLeft: "29px",
        paddingRight: "29px",
      },
    },
    buttonDestination: "modal",
    contents: { options: false },
    text: { button: "View product" },
    googleFonts: ["Lato"],
  },
  productSet: {
    styles: { products: { "@media (min-width: 601px)": { marginLeft: "-20px" } } },
  },
  modalProduct: {
    contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
    styles: {
      product: { "@media (min-width: 601px)": { maxWidth: "100%", marginLeft: "0px", marginBottom: "0px" } },
      button: {
        fontFamily: "Lato, sans-serif",
        ":hover": { backgroundColor: "#004c8a" },
        backgroundColor: "#005499",
        ":focus": { backgroundColor: "#004c8a" },
        borderRadius: "10px",
        paddingLeft: "29px",
        paddingRight: "29px",
      },
    },
    googleFonts: ["Lato"],
    text: { button: "Add to cart" },
  },
  option: {},
  cart: {
    styles: {
      button: {
        fontFamily: "Lato, sans-serif",
        ":hover": { backgroundColor: "#004c8a" },
        backgroundColor: "#005499",
        ":focus": { backgroundColor: "#004c8a" },
        borderRadius: "10px",
      },
    },
    text: { total: "Subtotal", button: "Checkout" },
    popup: false,
    googleFonts: ["Lato"],
  },
  toggle: {
    styles: {
      toggle: {
        fontFamily: "Lato, sans-serif",
        backgroundColor: "#005499",
        ":hover": { backgroundColor: "#004c8a" },
        ":focus": { backgroundColor: "#004c8a" },
      },
    },
    googleFonts: ["Lato"],
  },
};

const SDK_URL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

/** Ensures the Shopify SDK is loaded once per page. */
function ensureShopifySdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.ShopifyBuy?.UI) {
    return Promise.resolve();
  }
  if (!window.__shopifyBuyLoadedPromise) {
    window.__shopifyBuyLoadedPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = SDK_URL;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Shopify Buy Button SDK"));
      (document.head || document.body).appendChild(script);
    });
  }
  return window.__shopifyBuyLoadedPromise;
}

export const ShopifyCollectionBuyButton: React.FC<ShopifyCollectionBuyButtonProps> = ({
  domain,
  storefrontAccessToken,
  collectionId,
  moneyFormat,
  options,
  id,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const componentRef = useRef<any>(null);

  // Stabilize options to avoid needless re-inits when parent re-renders
  const mergedOptions = useMemo(() => ({ ...DEFAULT_OPTIONS, ...(options || {}) }), [JSON.stringify(options)]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (typeof window === "undefined") return;
      await ensureShopifySdk();
      if (cancelled) return;

      const ShopifyBuy = window.ShopifyBuy;
      if (!ShopifyBuy?.UI) return;

      const client = ShopifyBuy.buildClient({ domain, storefrontAccessToken });

      const node = containerRef.current;
      if (!node) return;

      // Destroy any previous component instance
      if (componentRef.current && typeof componentRef.current.destroy === "function") {
        componentRef.current.destroy();
        componentRef.current = null;
      }

      const ui = await ShopifyBuy.UI.onReady(client);

      // Create the collection component
      componentRef.current = ui.createComponent("collection", {
        id: String(collectionId),
        node,
        moneyFormat,
        options: mergedOptions,
      });
    }

    init();

    return () => {
      cancelled = true;
      if (componentRef.current && typeof componentRef.current.destroy === "function") {
        componentRef.current.destroy();
        componentRef.current = null;
      }
    };
    // Re-init when these change
  }, [domain, storefrontAccessToken, collectionId, moneyFormat, mergedOptions]);

  return <div id={id} className={className} ref={containerRef} />;
};

/**
 * Example Usage
 *
 * <ShopifyCollectionBuyButton
 *   domain="uzu8j6-ac.myshopify.com"
 *   storefrontAccessToken="c33c193599919caf67d61662c5bd3021"
 *   collectionId={"455318601955"}
 *   moneyFormat="Ush%20%7B%7Bamount_no_decimals%7D%7D"
 * />
 *
 * // Customize styles/behavior by passing `options` to override defaults:
 * <ShopifyCollectionBuyButton
 *   domain="uzu8j6-ac.myshopify.com"
 *   storefrontAccessToken="c33c193599919caf67d61662c5bd3021"
 *   collectionId={"455318601955"}
 *   moneyFormat="Ush%20%7B%7Bamount_no_decimals%7D%7D"
 *   options={{ product: { text: { button: "View product" } } }}
 * />
 */
