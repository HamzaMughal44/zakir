"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "The quality of these almonds is unmatched. ZK Dry Fruits is now my go-to for healthy snacking. The freshness is evident in every bite.",
    author: "Hamza",
    location: "Karachi",
    lang: "en",
  },
  {
    text: "ZK Dry Fruits' walnuts and pistachios are truly unmatched. Number one in both taste and freshness. The packaging is also superb.",
    author: "Adnan",
    location: "Lahore",
    lang: "en",
  },
  {
    text: "Premium packaging and even better taste. Highly recommended for dry fruit lovers in Pakistan who don't want to compromise on purity.",
    author: "Bilal",
    location: "Lahore",
    lang: "en",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-forest-deep relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-cream mb-4">
            Our <span className="text-gold italic">Customers</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass p-8 rounded-3xl relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-8 text-gold/20 w-12 h-12" />
              <p
                className={`text-cream/80 mb-8 leading-relaxed italic ${t.lang === 'ur' ? 'text-right font-medium text-xl leading-loose' : 'font-outfit'}`}
                dir={t.lang === 'ur' ? 'rtl' : 'ltr'}
              >
                "{t.text}"
              </p>
              <div>
                <h4 className={`text-gold font-bold ${t.lang === 'ur' ? 'text-right font-medium text-lg' : 'font-playfair text-xl'}`}>
                  {t.author}
                </h4>
                <p className={`text-cream/40 text-sm uppercase tracking-widest ${t.lang === 'ur' ? 'text-right' : ''}`}>
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
