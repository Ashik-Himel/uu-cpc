import { Facebook, Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container text-center flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>Developed by Ashikujjaman Himel</p>
        <div className="flex gap-6">
          <Link
            href="https://www.facebook.com/ashikujjaman.himel"
            target="_blank"
          >
            <Facebook />
          </Link>
          <Link href="https://www.linkedin.com/in/ashik-himel" target="_blank">
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
    </footer>
  );
}
