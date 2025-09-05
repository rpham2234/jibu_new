import CountryNavbar from "@/components/countries/countryNavbar";
import Footer from "@/components/footer";
export const experimental_ppr = true;
import {info} from "./info";
import Example from "@/components/countries/countryNavbar_new";
import { CartProvider } from "./cart/cart-context";
 
export default function ugandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Example country={info.country.toLowerCase()} />
        <CartProvider>{ children }</CartProvider>
        <Footer />
    </div>
  );
}