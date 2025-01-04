'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YearbookMetadata() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Yearbook Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
            School Name
          </label>
          <Input id="school" placeholder="Enter your school name" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <Input id="year" placeholder="2024" />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade/Class
            </label>
            <Input id="grade" placeholder="Class of 2024" />
          </div>
        </div>
      </div>
    </div>
  );
}