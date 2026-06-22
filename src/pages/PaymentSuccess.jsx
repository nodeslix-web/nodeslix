import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, LayoutDashboard, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full rounded-3xl border border-white/10 bg-[#121212]/60 backdrop-blur-md p-8 md:p-10 text-center space-y-8 shadow-[0_0_50px_rgba(0,212,255,0.05)]"
      >
        {/* Success Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.15)]"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
        </div>

        {/* Text Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Payment Successful
          </h1>
          <p className="text-nodeslix-muted text-sm leading-relaxed">
            Your subscription has been activated successfully.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-left space-y-3.5">
          <div className="flex items-center gap-3 text-sm text-nodeslix-muted">
            <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
            <span>Subscription Active</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-nodeslix-muted">
            <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
            <span>Stripe Sandbox Payment Completed</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-nodeslix-muted">
            <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
            <span>Ready To Access Dashboard</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3.5 pt-2">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold bg-[#00D4FF] text-[#080808] hover:bg-[#7CEBFF] shadow-[0_10px_30px_rgba(0,212,255,0.25)] transition-all cursor-pointer"
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>Open Dashboard</span>
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
