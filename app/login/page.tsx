'use client'

import { useState, useEffect, Suspense } from 'react'
import { login, signup } from './actions'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorMsg = searchParams.get('error')
    const successMsg = searchParams.get('message')
    
    if (errorMsg) {
      setError(errorMsg)
      setIsLoading(false)
    }
    if (successMsg) {
      setMessage(successMsg)
      setIsLogin(true) // Switch to login after successful signup
      setIsLoading(false)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-forest-deep">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 rounded-3xl relative z-10 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="ZK Dry Fruits Logo"
            className="w-20 h-20 rounded-full object-cover border-2 border-gold/20"
          />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair text-gradient mb-2">
            {isLogin ? 'Welcome Back' : 'Join ZK Dry Fruits'}
          </h1>
          <p className="text-cream/60 font-outfit">
            {isLogin ? 'Sign in to access your premium collection' : 'Create an account for a luxurious experience'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-forest-deep/50 p-1 rounded-xl mb-8 border border-white/5">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-outfit transition-all ${isLogin ? 'bg-gold text-forest-deep' : 'text-cream/60 hover:text-cream'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-outfit transition-all ${!isLogin ? 'bg-gold text-forest-deep' : 'text-cream/60 hover:text-cream'}`}
          >
            Signup
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm font-outfit"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </motion.div>
        )}

        {message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm font-outfit"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            {message}
          </motion.div>
        )}

        <form action={isLogin ? login : signup} onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode='wait'>
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-cream/80 text-sm font-outfit ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full bg-forest-deep/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-all font-outfit"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-cream/80 text-sm font-outfit ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="name@example.com"
                    className="w-full bg-forest-deep/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-all font-outfit"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-cream/80 text-sm font-outfit ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                  <input 
                    name="password"
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full bg-forest-deep/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-all font-outfit"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-forest-deep font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold/90 transition-all active:scale-[0.98] mt-6 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-cream/40 text-sm font-outfit">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold ml-1 hover:underline underline-offset-4"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-forest-deep flex items-center justify-center text-gold">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
