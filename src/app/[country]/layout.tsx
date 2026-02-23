// app/[country]/layout.tsx
import Footer from "@/components/footer";
export const experimental_ppr = true;

import Example from "@/components/header_new";
import { CartProvider } from "./cart/cart-context";
import { getSiteInfo } from "@/app//[country]/siteInfo"; // adjust path if needed

type Props = {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
};

export default async function CountryLayout({ children, params }: Props) {
  const country = (await params).country.toLowerCase();
  const siteInfo = await getSiteInfo(country); // now dynamic from /[country]

  return (
    <div>
      <Example />
      <CartProvider countryCode={siteInfo.countryCode}>{children}</CartProvider>
      <Footer />
    </div>
  );
}
