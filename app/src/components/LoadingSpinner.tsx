import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullscreen?: boolean;
}

const sizeConfig = {
  sm: {
    container: 'w-16 h-16',
    outer: 'w-16 h-16',
    middle: 'w-10 h-10',
    inner: 'w-4 h-4',
    icon: 14,
  },
  md: {
    container: 'w-24 h-24',
    outer: 'w-24 h-24',
    middle: 'w-16 h-16',
    inner: 'w-6 h-6',
    icon: 20,
  },
  lg: {
    container: 'w-32 h-32',
    outer: 'w-32 h-32',
    middle: 'w-20 h-20',
    inner: 'w-8 h-8',
    icon: 28,
  },
};

export function LoadingSpinner({ size = 'md', text, fullscreen = false }: LoadingSpinnerProps) {
  const config = sizeConfig[size];
  
  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center gap-4 ${fullscreen ? '' : ''}`}>
      <div className={`relative ${config.container}`}>
        {/* Outer rotating ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 border-r-sky-400/50 ${config.outer}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Middle counter-rotating ring */}
        <motion.div
          className={`absolute inset-0 m-auto rounded-full border-2 border-transparent border-b-indigo-400 border-l-indigo-400/50 ${config.middle}`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className={`absolute inset-0 m-auto rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 ${config.inner}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Droplets className="text-white" size={config.icon} />
        </motion.div>
      </div>
      
      {text && (
        <motion.p
          className="text-slate-400 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
  
  if (fullscreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinnerContent}
      </motion.div>
    );
  }
  
  return spinnerContent;
}

// Compact loading indicator for map markers
export function MapLoadingIndicator() {
  return (
    <div className="relative w-10 h-10">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-sky-400/30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Skeleton loader for data cards
export function DataCardSkeleton() {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-700/50 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-20 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-5 w-16 bg-slate-700/50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
