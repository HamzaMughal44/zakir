"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-forest-deep">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Premium Dry Fruits"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/40 to-forest-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-transparent to-forest-deep opacity-60" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-sage/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-40 pb-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center space-y-3 md:space-y-6"
          >
            {/* Badge */}
            <div className="inline-block px-6 py-2 bg-gold/10 border border-gold/20 rounded-full backdrop-blur-md">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em]">
                The Heart of Quetta
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-cream leading-[1.1] md:leading-[1] tracking-tighter">
              ZK<br className="hidden md:block" />
              <span className="text-gold italic relative inline-block">
                Dry Fruits
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-1 md:bottom-2 left-0 h-[1px] bg-gold/30"
                />
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-cream/70 text-base md:text-xl font-outfit max-w-2xl leading-relaxed mx-auto px-4">
              Experience the luxury of handpicked, organic treasures from the fertile lands of Quetta. 
              Pure, fresh, and delivered straight to your doorstep.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-2">
              <Link href="#products" className="w-full sm:w-auto px-8 py-4 bg-gold text-forest-deep font-bold rounded-xl hover:bg-white hover:text-forest-deep transition-all duration-500 uppercase tracking-widest text-[10px] shadow-2xl shadow-gold/30">
                Explore Collection
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              {/* <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-cream border border-white/10 font-bold rounded-xl hover:bg-white/5 transition-all duration-300 uppercase tracking-widest text-[10px] backdrop-blur-sm">
                Our Heritage
              </button> */}
            </div>
            
            {/* Trust Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 pt-12 md:pt-16 border-t border-white/5 w-full max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-playfair font-bold text-gold">100%</span>
                <span className="text-[10px] text-cream/40 uppercase tracking-widest mt-2">Organic Purity</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-playfair font-bold text-gold">Fresh</span>
                <span className="text-[10px] text-cream/40 uppercase tracking-widest mt-2">Daily Sourced</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-playfair font-bold text-gold">Fast</span>
                <span className="text-[10px] text-cream/40 uppercase tracking-widest mt-2">Global Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

