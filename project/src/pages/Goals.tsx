import React from 'react';
import { Target, Trophy, TrendingUp } from 'lucide-react';

function Goals() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Nutrition Goals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Daily Calories</h3>
            <Target className="text-coral-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">2,400</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Target kcal/day</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Weight Goal</h3>
            <Trophy className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">75 kg</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Target weight</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Weekly Progress</h3>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">-0.5 kg</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Weight change</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-6 dark:text-white">Macro Goals Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium dark:text-white">Protein (30%)</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-coral-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">180g daily</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium dark:text-white">Carbs (50%)</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">300g daily</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium dark:text-white">Fats (20%)</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">70g daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals;