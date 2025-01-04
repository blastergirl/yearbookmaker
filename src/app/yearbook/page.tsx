'use client';

import { useEffect, useState } from 'react';
import { Book, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { yearbookStorage, Yearbook } from '@/lib/yearbook-storage';

export default function ViewYearbooks() {
  const [yearbooks, setYearbooks] = useState<Yearbook[]>([]);

  useEffect(() => {
    setYearbooks(yearbookStorage.getAllYearbooks());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Your Yearbooks
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yearbooks.length === 0 ? (
            <div className="col-span-full text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <Book className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">No Yearbooks Yet</h2>
                <p className="text-gray-600 mb-4">Start creating your first yearbook!</p>
                <Link 
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                >
                  Create Yearbook
                </Link>
              </div>
            </div>
          ) : (
            yearbooks.map((yearbook) => (
              <Link 
                key={yearbook.id}
                href={`/yearbook/${yearbook.id}`}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{yearbook.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{yearbook.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        Last edited: {new Date(yearbook.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 