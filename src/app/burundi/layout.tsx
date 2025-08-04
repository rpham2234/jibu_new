import CountryNavbar from "@/components/countries/countryNavbar";
import Footer from "@/components/footer";
export const experimental_ppr = true;
 
export default function kenyaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <CountryNavbar country="burundi"/>
        { children }
        <Footer />
    </div>
  );
}