import React from 'react';
import { Activity } from 'lucide-react';

function Macros() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Macro Nutrients Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Protein</h3>
            <Activity className="text-coral-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">156g</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Daily Goal: 180g</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div className="bg-coral-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Carbs</h3>
            <Activity className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">245g</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Daily Goal: 300g</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Fats</h3>
            <Activity className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold dark:text-white">65g</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Daily Goal: 70g</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '93%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Macros;