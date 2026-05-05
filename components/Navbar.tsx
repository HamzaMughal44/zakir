"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, LogOut, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check current auth state
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "#products" },
    { name: "Quality", href: "#quality" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-forest-deep/80 backdrop-blur-lg border-b border-white/10" : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center">
        {/* Logo - Flex 1 to push links to center */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="ZK Dry Fruits Logo"
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-cream/80 hover:text-gold transition-colors font-outfit text-sm uppercase tracking-widest font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA - Flex 1 to push links to center */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          <Link href="https://wa.me/923252940423?text=Assalam-o-Alaikum,%20I%20have%20an%20inquiry%20about%20ZK%20Dry%20Fruits" target="_blank" className="hidden md:flex items-center gap-2 px-6 py-2 bg-gold text-forest-deep font-bold rounded-full hover:bg-sage hover:text-cream transition-all duration-300 uppercase text-xs tracking-tighter">
            <MessageCircle size={14} className="fill-current" />
            WhatsApp
          </Link>

          {user ? (
            <button 
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 px-6 py-2 border border-red-500/50 text-red-400 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 uppercase text-xs tracking-tighter"
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <Link href="/login" className="hidden md:block px-6 py-2 border border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-forest-deep transition-all duration-300 uppercase text-xs tracking-tighter">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-forest-light border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-playfair text-cream hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 border border-red-500/50 text-red-400 text-center font-bold rounded-xl uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full py-4 border border-gold text-gold text-center font-bold rounded-xl uppercase tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}

              <Link
                href="https://wa.me/923252940423?text=Assalam-o-Alaikum,%20I%20have%20an%20inquiry%20about%20ZK%20Dry%20Fruits"
                target="_blank"
                className="w-full py-4 bg-gold text-forest-deep text-center font-bold rounded-xl uppercase tracking-widest flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle size={18} className="fill-current" />
                WhatsApp
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

