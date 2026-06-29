import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-navy-900 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <img src="/logo-dark.png" alt="EDU MASTER" className="h-14 w-auto animate-pulse" />
        <span className="text-white font-display font-bold text-xl tracking-widest">EDUMASTER</span>
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-royal-400 to-royal-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}
