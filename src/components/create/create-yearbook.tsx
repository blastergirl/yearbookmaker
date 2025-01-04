'use client';

import { useState } from 'react';
import { GraduationCap, Book, Camera, Users, Palette, Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { yearbookStorage } from '@/lib/yearbook-storage';

export function CreateYearbook() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [yearbookData, setYearbookData] = useState({
    title: '',
    description: '',
    theme: 'modern',
    coverStyle: 'classic',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedYearbook = yearbookStorage.saveYearbook(yearbookData);
    router.push(`/yearbook/${savedYearbook.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center mb-8 space-x-2">
          <GraduationCap className="h-10 w-10 text-purple-500" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Create Your Yearbook
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { icon: Book, label: 'Basics' },
              { icon: Palette, label: 'Theme' },
              { icon: Layout, label: 'Layout' },
              { icon: Camera, label: 'Photos' },
              { icon: Users, label: 'Friends' }
            ].map((item, index) => (
              <div key={item.label} className="flex items-center">
                <div className={`flex flex-col items-center ${step > index + 1 ? 'text-green-500' : step === index + 1 ? 'text-purple-500' : 'text-gray-400'}`}>
                  <div className={`p-2 rounded-full ${step >= index + 1 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-1">{item.label}</span>
                </div>
                {index < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Yearbook Title
              </label>
              <input
                type="text"
                id="title"
                value={yearbookData.title}
                onChange={(e) => setYearbookData({...yearbookData, title: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                placeholder="My Awesome Yearbook"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={yearbookData.description}
                onChange={(e) => setYearbookData({...yearbookData, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                placeholder="Write a fun description for your yearbook!"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all hover:scale-105"
            >
              Start Creating Your Yearbook ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}