"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FounderSection = () => {
  return (
    <section className="py-24 bg-forest-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] max-w-[180px] md:max-w-[240px] mx-auto">
              <div className="absolute inset-0 bg-gold/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10">
                {/* User: Change this src to your owner picture (e.g., /owner.jpg) once uploaded */}
                <Image
                  src="/founder.jpeg"
                  alt="Founder of ZK Dry Fruits"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Founder Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-cream mb-6">
              A Message from <br />
              <span className="text-gold italic">The Founder</span>
            </h2>
            <div className="space-y-4 text-cream/70 font-outfit text-base md:text-lg leading-relaxed">
              <p>
                Our mission at ZK Dry Fruits is simple: bringing the purest, premium dry fruits from Quetta directly to you. We hand-pick and vacuum-seal every piece to ensure maximum freshness. Your trust is our biggest asset.
              </p>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-playfair font-bold text-cream">Zakir</h4>
              <p className="text-gold uppercase tracking-widest text-sm font-bold mt-1">Founder & CEO ZK DRY FRUITS</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
