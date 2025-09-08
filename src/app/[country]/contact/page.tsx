import ContactInfo from "@/components/countries/uganda/contact/contactinfo";
import ContactForm from "@/components/countries/uganda/contact/contactForm";
import { getSiteInfo } from "../siteInfo";

type Props = { params: Promise<{ country: string }> };

export default async function Contact({ params }: Props) {
  const { country } = await params;
  const info = await getSiteInfo(country); // e.g. "uganda", "kenya", ...
  return (
    <div>
      <ContactInfo
        phone={info.phone}
        address={info.address}
        facebook={info.facebook}
        twitter={info.twitter}
        instagram={info.instagram}
        linkedin={info.linkedin}
      />
      <ContactForm />
    </div>
  );
}
