'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';

export function CoverDesigner() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Cover Design</h2>
      <div className="aspect-[4/3] relative mb-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ImagePlus className="h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Upload cover image</p>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Preview</Button>
        <Button>Save & Continue</Button>
      </div>
    </div>
  );
}