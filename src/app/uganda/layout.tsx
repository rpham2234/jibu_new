import CountryNavbar from "@/components/countries/countryNavbar";
import Footer from "@/components/footer";
export const experimental_ppr = true;
 
export default function ugandaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <CountryNavbar />
        { children }
        <Footer />
    </div>
  );
}