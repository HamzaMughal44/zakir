"use client";

import React from "react";

const TickerMarquee = () => {
  const items = [
    "Premium Almonds",
    "Roasted Pistachios",
    "Jumbo Cashews",
    "Organic Walnuts",
  ];

  return (
    <div className="bg-gold py-4 overflow-hidden border-y border-forest-deep/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center px-8">
            <span className="text-forest-deep font-playfair text-xl font-black uppercase italic tracking-tighter">
              {item}
            </span>
            <span className="mx-8 w-2 h-2 bg-forest-deep rounded-full opacity-30" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerMarquee;
