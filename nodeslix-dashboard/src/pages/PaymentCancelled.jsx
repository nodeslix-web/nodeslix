import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, Home } from 'lucide-react';

export default function PaymentCancelled() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full rounded-3xl border border-white/10 bg-[#121212]/60 backdrop-blur-md p-8 md:p-10 text-center space-y-8 shadow-[0_0_50px_rgba(255,0,0,0.03)]"
      >
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            <XCircle className="h-10 w-10" />
          </motion.div>
        </div>

        {/* Text Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Payment Cancelled
          </h1>
          <p className="text-nodeslix-muted text-sm leading-relaxed">
            No charges were made.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3.5 pt-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/#pricing')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold bg-[#00D4FF] text-[#080808] hover:bg-[#7CEBFF] shadow-[0_10px_30px_rgba(0,212,255,0.25)] transition-all cursor-pointer"
          >
            <RefreshCw className="h-4.5 w-4.5 animate-spin-slow" />
            <span>Back To Pricing</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold bg-white/5 border border-white/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 text-white transition-all cursor-pointer"
          >
            <Home className="h-4.5 w-4.5" />
            <span>Back To Home</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
