
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="px-4 pb-4">
      <footer className="bg-[#005499] text-white pt-20 pb-6 px-6 md:px-12 overflow-hidden relative rounded-b-[3rem] mx-auto max-w-[95%]">
        <div className="max-w-[90rem] mx-auto relative z-10">

          {/* Top Section: Info & Socials */}
          <div className="mb-24 max-w-lg">
            <div className="mb-6">
              <Image
                src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Jibu-Logo-150x48-white.png"
                alt="Jibu Logo"
                width={120}
                height={38}
                className="mb-6"
              />
              <p className="text-lg font-medium leading-relaxed text-blue-100 mb-4">
                Local Owners Driving Lasting Solutions.
              </p>
              <p className="text-sm text-blue-200 leading-relaxed">
                Jibu capitalizes and equips emerging market entrepreneurs to create affordable access to drinking water and other necessities.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/JibuCo" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-[#005499] transition-all duration-300">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-[#005499] transition-all duration-300">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://x.com/JibuCo" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-[#005499] transition-all duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/jibu/posts/?feedView=all" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-[#005499] transition-all duration-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bottom Section: Big Text + Links */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-10 border-t border-white/10 pt-10">

            {/* Huge Text */}
            <img src="/Jibu-logo.png" alt="Jibu Logo" className="flex-shrink-0 w-64 md:w-[24rem] lg:w-[40rem] h-auto object-contain self-start lg:self-auto -ml-4 lg:-ml-8" />
            {/* <h1 className="text-[18vw] lg:text-[15rem] leading-[0.8] font-serif font-bold tracking-tighter opacity-100 select-none">
              Jibu
            </h1> */}

            {/* Links Columns */}
            <div className="flex gap-16 md:gap-32 pb-4 lg:pb-12 pr-4 lg:pr-10 text-right lg:text-left">

              {/* Explore */}
              <div className="space-y-6">
                <h6 className="uppercase font-bold tracking-widest text-sm text-blue-200">Explore</h6>
                <ul className="space-y-3 text-lg font-medium">
                  <li><a href="/about" className="hover:text-blue-200 transition-colors">About</a></li>
                  <li><a href="/franchise" className="hover:text-blue-200 transition-colors">Franchise</a></li>
                  <li><a href="/ourTeam" className="hover:text-blue-200 transition-colors">Our Team</a></li>
                  <li><a href="https://jibu.byoosi.com/jobs" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">Careers</a></li>
                  <li><a href="/stories" className="hover:text-blue-200 transition-colors">Stories</a></li>
                  <li><a href="/faqs" className="hover:text-blue-200 transition-colors">FAQ</a></li>
                  <li><a href="mailto:example@gmail.com" className="hover:text-blue-200 transition-colors underline decoration-yellow-400 decoration-2 underline-offset-4">Contact Us</a></li>
                </ul>
              </div>

              {/* Countries */}
              <div className="space-y-6">
                <h6 className="uppercase font-bold tracking-widest text-sm text-blue-200">Countries</h6>
                <ul className="space-y-3 text-lg font-medium">
                  {[
                    "Burundi", "Ghana", "Kenya", "Tanzania",
                    "Zambia", "DRC", "Rwanda", "Uganda"
                  ].map((country) => (
                    <li key={country}>
                      <a href={"/" + country.toLowerCase()} className="hover:text-blue-200 transition-colors">
                        {country}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
            <p>2025 © Jibu, Inc. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

