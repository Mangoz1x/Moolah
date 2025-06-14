'use client';

import { motion } from 'framer-motion';
import Card, { CardContent } from '@/components/ui/Card';

const timeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const waveVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 20, -10, 20, 0],
    transition: {
      duration: 1.5,
      delay: 0.5,
      ease: 'easeInOut',
    },
  },
};

export default function WelcomeCard({ user }) {
  const firstName = user?.name?.split(' ')[0] || 'there';
  const userImage = user?.image;
  
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100" delay={0.1}>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {userImage ? (
              <img
                src={userImage}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-semibold text-lg">
                  {firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {timeOfDayGreeting()}, {firstName}!
              </h2>
              <motion.span
                variants={waveVariants}
                initial="initial"
                animate="animate"
                className="text-xl"
              >
                👋
              </motion.span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back to your financial dashboard
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}