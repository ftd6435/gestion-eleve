import React from 'react';
import { Card } from './Card';

interface StatBoxProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'orange' | 'red' | 'gray';
}

export const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'green'
}) => {
  const colorClasses = {
    green: 'text-green-600 bg-green-50 border-green-200',
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    orange: 'text-orange-600 bg-orange-50 border-orange-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  return (
    <Card className={`${colorClasses[color]} border-2`} hover>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center mt-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span>{trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{trend.value}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};