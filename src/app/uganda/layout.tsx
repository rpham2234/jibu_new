import CountryNavbar from "@/components/countries/countryNavbar";
import Footer from "@/components/footer";
export const experimental_ppr = true;
import {info} from "./info";
import Example from "@/components/countries/countryNavbar_new";
 
export default function ugandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Example country={info.country.toLowerCase()} />
        { children }
        <Footer />
    </div>
  );
}