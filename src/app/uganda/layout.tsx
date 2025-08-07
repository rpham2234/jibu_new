import CountryNavbar from "@/components/countries/countryNavbar";
import Footer from "@/components/footer";
export const experimental_ppr = true;
import {info} from "./info";
 
export default function ugandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <CountryNavbar country={info.country.toLowerCase()} />
        { children }
        <Footer />
    </div>
  );
}