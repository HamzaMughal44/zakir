import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-deep border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <img
                src="/logo.jpg"
                alt="ZK Dry Fruits Logo"
                className="w-[60px] h-[60px] rounded-full object-cover border border-gold/20"
              />
            </Link>
            <p className="text-cream/50 font-outfit mb-8 leading-relaxed">
              Premium Pakistani dry fruit brand dedicated to bringing you the finest, 100% natural treasures from Quetta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-playfair font-bold text-cream mb-8 italic">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-cream/50 hover:text-gold transition-colors font-outfit uppercase text-[10px] tracking-widest">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-cream/50 hover:text-gold transition-colors font-outfit uppercase text-[10px] tracking-widest">
                  Our Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xl font-playfair font-bold text-cream mb-8 italic">Support</h4>
            <ul className="space-y-4">
              {["Shipping Policy", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-cream/50 hover:text-gold transition-colors font-outfit uppercase text-[10px] tracking-widest">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-playfair font-bold text-cream mb-8 italic">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="text-gold w-5 h-5 shrink-0" />
                <span className="text-cream/50 font-outfit text-sm">Nawa Killi Quetta.</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="text-gold w-5 h-5 shrink-0" />
                <Link href="https://wa.me/923252940423" target="_blank" className="text-cream/50 hover:text-gold font-outfit text-sm transition-colors">+92 325 2940423</Link>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-gold w-5 h-5 shrink-0" />
                <span className="text-cream/50 font-outfit text-sm">zakirturk000@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-cream/30 text-[10px] font-outfit uppercase tracking-widest">
            © 2026 ZK Dry Fruits. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
             <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-20" />
             <span className="text-cream/20 text-[10px] uppercase tracking-widest">100% Organic & Pure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

