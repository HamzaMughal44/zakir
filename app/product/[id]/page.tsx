"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, CheckCircle2, Wallet, CreditCard, Truck, Loader2, X } from "lucide-react";
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
  
  // Checkout States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod" // 'cod' or 'advance'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const priceValue = selectedWeight === "1kg" ? product.price1kg : product.price500g;
      
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            product_id: product.id,
            product_name: product.name,
            weight: selectedWeight,
            price: priceValue,
            customer_name: orderForm.fullName,
            customer_phone: orderForm.phone,
            delivery_address: orderForm.address,
            city: orderForm.city,
            payment_method: orderForm.paymentMethod,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      
      // WhatsApp notification — owner ko automatically message bhejo
      const priceVal = selectedWeight === "1kg" ? product.price1kg : product.price500g;
      const waMessage = encodeURIComponent(
        `🛒 *Naya Order Aaya!*\n\n` +
        `*Product:* ${product.name}\n` +
        `*Weight:* ${selectedWeight}\n` +
        `*Price:* PKR ${priceVal.toLocaleString()}\n\n` +
        `*Customer Details:*\n` +
        `👤 Name: ${orderForm.fullName}\n` +
        `📞 Phone: ${orderForm.phone}\n` +
        `🏠 Address: ${orderForm.address}\n` +
        `🏙️ City: ${orderForm.city}\n` +
        `💳 Payment: ${orderForm.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Advance (EasyPaisa)'}`
      );
      // Automatically owner ka WhatsApp kholo order details ke saath
      window.open(`https://wa.me/923252940423?text=${waMessage}`, "_blank");

      setOrderSuccess(true);
      setIsCheckoutModalOpen(false);
      // Reset form
      setOrderForm({ fullName: "", phone: "", address: "", city: "", paymentMethod: "cod" });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Order place karne mein masla aaya. Bara-e-maherbani dobara koshish karein.');
    } finally {
      setIsSubmitting(false);
    }
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
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-start ${selectedWeight === "1kg"
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
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-start ${selectedWeight === "500g"
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

            {/* Order Button */}
            <div className="pt-8 border-t border-white/10">
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full sm:w-fit px-12 py-5 bg-gold text-forest-deep font-bold rounded-2xl hover:bg-sage hover:text-cream transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-gold/20 active:scale-95"
              >
                <Truck size={20} className="fill-current" />
                Order Now
              </button>
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
                {/* <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <CreditCard className="text-gold mb-3 w-5 h-5" />
                  <h4 className="text-cream font-bold text-sm mb-1">JazzCash</h4>
                  <p className="text-cream/40 text-[10px]">03252940423</p>
                </div> */}
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
          </motion.div>
        </div>
      </div>

      {/* Success Message Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-forest-deep border border-gold/30 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-gold/10"
          >
            <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-cream mb-4">Order Placed Successfully!</h3>
            <p className="text-cream/70 font-outfit mb-8">
              Aapka order receive ho gaya hai. Hum jald hi aapse confirm karne ke liye raabta karenge. Shukriya!
            </p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="w-full py-4 bg-gold text-forest-deep font-bold rounded-xl hover:bg-sage hover:text-cream transition-colors uppercase tracking-wider text-sm"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest-deep border border-gold/30 rounded-3xl max-w-2xl w-full my-8 relative shadow-2xl shadow-gold/10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-forest-deep z-10 rounded-t-3xl">
              <h2 className="text-2xl font-playfair font-bold text-cream">Checkout Information</h2>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-cream/50 hover:text-cream transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleOrderSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6 flex justify-between items-center">
                <div>
                  <h4 className="text-cream font-bold">{product.name}</h4>
                  <p className="text-cream/60 text-sm">Weight: {selectedWeight}</p>
                </div>
                <div className="text-right">
                  <span className="text-gold font-playfair font-bold text-xl">
                    {formatPrice(selectedWeight === "1kg" ? product.price1kg : product.price500g)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-cream/80 uppercase tracking-wider">Full Name</label>
                  <input
                    required
                    type="text"
                    value={orderForm.fullName}
                    onChange={(e) => setOrderForm({ ...orderForm, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="Ali Khan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-cream/80 uppercase tracking-wider">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="03XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-cream/80 uppercase tracking-wider">Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                  placeholder="House #, Street #, Area..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-cream/80 uppercase tracking-wider">City</label>
                <input
                  required
                  type="text"
                  value={orderForm.city}
                  onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                  placeholder="Karachi"
                />
              </div>

              {/* Payment Method Section */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="text-sm font-bold text-cream/80 uppercase tracking-wider">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center space-x-3 ${orderForm.paymentMethod === 'cod' ? 'bg-gold/10 border-gold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={orderForm.paymentMethod === 'cod'}
                      onChange={() => setOrderForm({ ...orderForm, paymentMethod: 'cod' })}
                      className="accent-gold w-4 h-4"
                    />
                    <div>
                      <h4 className="text-cream font-bold text-sm flex items-center gap-2">
                        <Truck size={16} className="text-gold" /> Cash on Delivery
                      </h4>
                    </div>
                  </label>

                  <label className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center space-x-3 ${orderForm.paymentMethod === 'advance' ? 'bg-gold/10 border-gold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="advance"
                      checked={orderForm.paymentMethod === 'advance'}
                      onChange={() => setOrderForm({ ...orderForm, paymentMethod: 'advance' })}
                      className="accent-gold w-4 h-4"
                    />
                    <div>
                      <h4 className="text-cream font-bold text-sm flex items-center gap-2">
                        <Wallet size={16} className="text-gold" /> Advance Payment
                      </h4>
                    </div>
                  </label>
                </div>

                {/* EasyPaisa Instructions */}
                {orderForm.paymentMethod === 'advance' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gold/5 border border-gold/20 rounded-xl p-4 mt-4 overflow-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <Wallet className="text-gold w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-cream font-bold text-sm mb-1">EasyPaisa Payment</h5>
                        <p className="text-cream/70 text-sm font-outfit mb-3">
                          Advance payment ke liye, neechay diye gaye EasyPaisa number par payment bhejein. Delivery location confirmation ke liye humari team jaldi aapse raabta karegi.
                        </p>
                        <div className="bg-forest-deep/50 p-3 rounded-lg border border-white/5 inline-block">
                          <p className="text-cream/50 text-xs uppercase tracking-wider mb-1">Account Number</p>
                          <p className="text-gold font-bold text-lg tracking-widest">03252940423</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-white/10 sticky bottom-0 bg-forest-deep pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold text-forest-deep font-bold rounded-xl hover:bg-sage hover:text-cream transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default ProductDetail;

