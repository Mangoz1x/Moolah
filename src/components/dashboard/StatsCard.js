'use client';

import { motion } from 'framer-motion';
import Card, { CardContent } from '@/components/ui/Card';

const numberVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'emerald',
  delay = 0 
}) {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      border: 'border-emerald-100',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      border: 'border-blue-100',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      border: 'border-purple-100',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      border: 'border-orange-100',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
    },
  };

  const classes = colorClasses[color];

  return (
    <Card className={`${classes.bg} ${classes.border}`} delay={delay}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <motion.div
              variants={numberVariants}
              initial="initial"
              animate="animate"
            >
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </motion.div>
            {trend && trendValue && (
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${classes.trend}`}>
                  {trend === 'up' ? '↗' : '↘'} {trendValue}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`flex-shrink-0 w-8 h-8 ${classes.bg} rounded-lg flex items-center justify-center`}>
            <span className={`text-lg ${classes.icon}`}>{icon}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}