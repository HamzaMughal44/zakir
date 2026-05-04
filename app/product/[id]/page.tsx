"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, CheckCircle2, Wallet, CreditCard, Truck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface Product {
  id: number;
  name: string;
  price1kg: number;
  price500g: number;
  image: string;
  description: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(price);
};

const ProductDetail = () => {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const supabase = createClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center text-cream">
        <Loader2 className="animate-spin text-gold w-12 h-12" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center text-cream">
        <div className="text-center">
          <h1 className="text-4xl font-playfair mb-4">Product Not Found</h1>
          <Link href="/" className="text-gold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const priceValue = selectedWeight === "1kg" ? product.price1kg : product.price500g;
    const price = formatPrice(priceValue);
    const phoneNumber = "923252940423";
    const message = encodeURIComponent(
      `Assalam-o-Alaikum, I want to order ${product.name}.\nWeight: ${selectedWeight}\nPrice: ${price}\nPlease confirm my order.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="bg-forest-deep min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-gold mb-12 hover:translate-x-[-4px] transition-transform group">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-outfit uppercase tracking-widest text-xs font-bold">Back to Collections</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Premium Quality</span>
              <h1 className="text-5xl md:text-7xl font-playfair font-bold text-cream mt-4 mb-6">{product.name}</h1>
              <p className="text-cream/60 text-lg leading-relaxed font-outfit max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Pricing Options */}
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-bold text-cream italic">Select Weight & Price</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1kg Option */}
                <button 
                   onClick={() => setSelectedWeight("1kg")}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-start ${
                    selectedWeight === "1kg" 
                    ? "bg-gold border-gold text-forest-deep shadow-xl shadow-gold/20" 
                    : "bg-white/5 border-white/10 text-cream hover:border-gold/50"
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-widest mb-2">1 Kilogram</span>
                  <span className="text-2xl font-playfair font-bold">{formatPrice(product.price1kg)}</span>
                  {selectedWeight === "1kg" && <CheckCircle2 className="mt-4 w-5 h-5" />}
                </button>

                {/* 500g Option */}
                <button 
                  onClick={() => setSelectedWeight("500g")}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-start ${
                    selectedWeight === "500g" 
                    ? "bg-gold border-gold text-forest-deep shadow-xl shadow-gold/20" 
                    : "bg-white/5 border-white/10 text-cream hover:border-gold/50"
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-widest mb-2">500 Grams</span>
                  <span className="text-2xl font-playfair font-bold">{formatPrice(product.price500g)}</span>
                  {selectedWeight === "500g" && <CheckCircle2 className="mt-4 w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="py-8 border-t border-white/10 flex flex-wrap gap-8">
              <div className="flex items-center space-x-3 text-cream/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>100% Organic</span>
              </div>
              <div className="flex items-center space-x-3 text-cream/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Vacuum Sealed</span>
              </div>
              <div className="flex items-center space-x-3 text-cream/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Nationwide Delivery</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-playfair font-bold text-cream mb-6 italic">Payment Methods</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Wallet className="text-gold mb-3 w-5 h-5" />
                  <h4 className="text-cream font-bold text-sm mb-1">EasyPaisa</h4>
                  <p className="text-cream/40 text-[10px]">03252940423</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <CreditCard className="text-gold mb-3 w-5 h-5" />
                  <h4 className="text-cream font-bold text-sm mb-1">JazzCash</h4>
                  <p className="text-cream/40 text-[10px]">03252940423</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Truck className="text-gold mb-3 w-5 h-5" />
                  <h4 className="text-cream font-bold text-sm mb-1">Cash on Delivery</h4>
                  <p className="text-cream/40 text-[10px]">Nationwide</p>
                </div>
              </div>
              <p className="mt-4 text-gold/60 text-[10px] font-outfit italic">
                * Please share a screenshot of the transaction on WhatsApp after making the payment.
              </p>
            </div>

            {/* Order Button */}
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full sm:w-fit px-12 py-5 bg-gold text-forest-deep font-bold rounded-2xl hover:bg-sage hover:text-cream transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-gold/20 active:scale-95"
            >
              <MessageCircle size={20} className="fill-current" />
              Order on WhatsApp
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductDetail;

