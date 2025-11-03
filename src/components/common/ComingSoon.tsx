'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { 
  Construction, 
  ArrowLeft, 
  Sparkles,
  Rocket
} from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  backUrl?: string;
  backLabel?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon!',
  description = 'We\'re working hard to bring you this exciting new feature. Stay tuned!',
  backUrl = '/dashboard',
  backLabel = 'Back to Dashboard'
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/95 backdrop-blur-sm">
          <div className="p-8 text-center">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 0.6,
                rotate: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Construction className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              {description}
            </motion.p>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-purple-600">
                <Sparkles className="w-6 h-6" />
                <span className="font-medium">Exciting</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Rocket className="w-6 h-6" />
                <span className="font-medium">Fun</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Construction className="w-6 h-6" />
                <span className="font-medium">In Progress</span>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
            >
              <p className="text-blue-800 text-sm">
                💡 <strong>Good news!</strong> Our team is building something amazing for you. 
                Check back soon to discover this new feature!
              </p>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => router.push(backUrl)}
                className="flex items-center gap-2 mx-auto"
                size="lg"
              >
                <ArrowLeft className="w-5 h-5" />
                {backLabel}
              </Button>
            </motion.div>
          </div>
        </Card>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 text-6xl"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-20 right-10 text-6xl"
          >
            🚀
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-20 text-5xl"
          >
            ✨
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
