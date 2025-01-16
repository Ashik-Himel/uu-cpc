import darkLogo from "@/assets/images/dark-logo.png";
import logo from "@/assets/images/logo.png";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="py-8 md:py-12 lg:py-16 bg-primary/15 text-secondary-foreground">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-x-8 gap-y-10">
          <div className="sm:col-span-2 md:col-span-1">
            <Image
              src={logo}
              alt="UU CPC Logo"
              className="w-[150px] dark:hidden"
            />
            <Image
              src={darkLogo}
              alt="UU CPC Logo"
              className="w-[150px] hidden dark:inline"
            />
            <p className="mt-4 max-w-[460px]">
              Uttara University Computer Programming Club (UU CPC) is a part of
              Uttara University.
            </p>
            <div className="text-primary mt-4 md:mt-6 flex items-center gap-6">
              <Link href="https://www.facebook.com/" target="_blank">
                <Facebook />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                <Instagram />
              </Link>
              <Link href="mailto:" target="_blank">
                <Mail />
              </Link>
              <Link href="tel:" target="_blank">
                <Phone />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-primary text-2xl font-semibold mb-2">
              Quick Links
            </h4>
            <Link href="/announcements">Announcements</Link>
            <Link href="/contests">Contests</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-primary text-2xl font-semibold mb-2">
              Other Pages
            </h4>
            <Link href="/about">About Club</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>Developed by Ashikujjaman Himel</p>
          <div className="flex gap-6">
            <Link
              href="https://www.facebook.com/ashikujjaman.himel"
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ashik-himel"
              target="_blank"
            >
              <Linkedin />
            </Link>
            <Link href="https://www.github.com/ashik-himel" target="_blank">
              <Github />
            </Link>
            <Link href="https://ashik-himel.github.io" target="_blank">
              <Globe />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
