import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

function Tracking() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Meal Tracking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold dark:text-white">Today's Progress</h3>
            <TrendingUp className="text-coral-500" size={24} />
          </div>
          <div className="space-y-4">
            {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((meal) => (
              <div key={meal} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium dark:text-white">{meal}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">9:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="font-medium dark:text-white">450 kcal</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Logged</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold dark:text-white">Weekly Overview</h3>
            <Calendar className="text-coral-500" size={24} />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">{day}</p>
                <div className="w-full h-32 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2 flex items-center justify-center">
                  <p className="text-sm font-medium dark:text-white">1,850<br/>kcal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;