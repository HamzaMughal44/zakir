"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import Link from "next/link";
import Image from "next/image";

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

const ProductCard = ({ product, user }: { product: Product; user: any }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="min-w-[300px] md:min-w-[400px] group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 300px, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-60" />

        {/* Info */}
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-2xl font-playfair font-bold text-cream mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-gold font-bold">{formatPrice(product.price1kg)}</span>
            <Link
              href={`/product/${product.id}`}
              className="px-6 py-2 bg-gold text-forest-deep font-bold rounded-full hover:bg-cream transition-all duration-300 uppercase text-[10px] tracking-widest"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchProducts();
    checkUser();
  }, []);

  return (
    <section id="products" className="py-24 bg-forest-deep relative">
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-cream mb-6">
            Our  <br />
            <span className="text-gold italic text-gradient">Products</span>
          </h2>
          <p className="text-cream/50 font-outfit">
            Handpicked with precision, packed with care. Explore the finest range of premium dry fruits selected from the heart of Quetta
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gold font-bold uppercase tracking-widest text-xs hover:text-cream transition-colors group">
            <span>View All Products</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex space-x-8 overflow-x-auto pb-12 px-6 no-scrollbar snap-x snap-mandatory min-h-[400px] items-center"
      >
        {loading ? (
          <div className="w-full flex justify-center py-20">
            <Loader2 className="animate-spin text-gold w-10 h-10" />
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="snap-center">
              <ProductCard product={product} user={user} />
            </div>
          ))
        )}
        {/* Extra padding for end of scroll */}
        {!loading && <div className="min-w-[100px]" />}
      </div>


      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;

