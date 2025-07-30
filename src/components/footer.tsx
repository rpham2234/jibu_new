import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#005499] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo + Text */}
          <div className="space-y-4 text-center md:text-left">
            <Image
              src="https://jibuco.com/wp-content/uploads/2022/09/Jibu-Website-Artwork-2_Jibu-Logo-150x48-white.png"
              alt="Jibu Logo"
              width={150}
              height={48}
            />
            <p className="text-sm">
              Local Owners Driving Lasting Solutions
            </p>
            <p className="text-sm">
              Jibu capitalizes and equips emerging market entrepreneurs to create affordable access to drinking water and other necessities
            </p>
          </div>

          {/* Explore Links */}
          <div className="space-y-4 text-center md:text-left">
            <h6 className="uppercase font-bold">Explore</h6>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/franchise" className="hover:underline">
                  Jibu Franchise Opportunity
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4 text-center md:text-left">
            <h6 className="uppercase font-bold">Social</h6>
            <div className="flex justify-center md:justify-start gap-2">
              <a href="https://www.facebook.com/JibuCo" className="bg-blue-600 p-2 rounded hover:bg-blue-700">
                <FaFacebook className="text-white h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded hover:bg-pink-700">
                <FaInstagram className="text-white h-5 w-5" />
              </a>
              <a href="https://x.com/JibuCo" className="bg-blue-400 p-2 rounded hover:bg-blue-500">
                <FaTwitter className="text-white h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/jibu/posts/?feedView=all" className="bg-blue-700 p-2 rounded hover:bg-blue-900">
                <FaLinkedin className="text-white h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Jibu Countries */}
          <div className="space-y-4 text-center md:text-left">
            <h6 className="uppercase font-bold">Jibu Countries</h6>
            <ul className="space-y-2">
              {[
                "Burundi",
                "Ghana",
                "Kenya",
                "Tanzania",
                "Zambia",
                "DRC",
                "Rwanda",
                "Uganda",
              ].map((country) => (
                <li key={country}>
                  <a href={country.toLowerCase()} className="hover:underline inline-flex items-center gap-1">
                    <i className="bi bi-skype"></i>
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="bg-gray-900 text-center text-xs py-3">
        <p className="font-bold">2025 © Jibu, Inc, All Rights Reserved</p>
      </div>
    </footer>
  );
}
