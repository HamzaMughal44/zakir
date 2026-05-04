"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  return (
    <span ref={ref} className="text-4xl md:text-6xl font-playfair font-black text-gold">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

const stats = [
  { label: "Happy Customers", value: 100, suffix: "+" },
  { label: "Product Varieties", value: 4, suffix: "+" },
  { label: "Years Excellence", value: 2, suffix: "" },
  { label: "Retention Rate", value: 98, suffix: "%" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-forest-light border-y border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col space-y-2"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-cream/60 font-outfit uppercase tracking-widest text-xs font-bold">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
