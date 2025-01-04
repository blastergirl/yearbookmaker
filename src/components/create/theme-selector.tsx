'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themes = [
  { id: 'classic', name: 'Classic', color: 'bg-blue-600' },
  { id: 'modern', name: 'Modern', color: 'bg-purple-600' },
  { id: 'minimal', name: 'Minimal', color: 'bg-gray-900' },
  { id: 'vibrant', name: 'Vibrant', color: 'bg-gradient-to-r from-pink-500 to-orange-500' },
];

export function ThemeSelector() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Theme</h2>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={cn(
              'group relative h-24 rounded-lg border-2 border-transparent hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
              theme.color
            )}
          >
            <span className="absolute inset-x-0 bottom-2 text-center text-sm font-medium text-white">
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}