'use client';

import { useEffect, useState } from 'react';
import { yearbookStorage, Yearbook } from '@/lib/yearbook-storage';
import { ArrowLeft, Book, BookOpen, Heart, Star, Camera, Users, Sparkles, Music, Palette, Crown } from 'lucide-react';
import Link from 'next/link';
import { ScrapbookEditor } from '@/components/yearbook/scrapbook-editor';

const TEMPLATES = [
  {
    id: 'besties',
    title: '👭 BFF Page',
    icon: Heart,
    description: 'Create a special page about you and your best friends!',
    preview: 'bg-gradient-to-r from-pink-200 to-purple-200',
    stickers: ['💖', '👭', '🌟', '✨', '🎀']
  },
  {
    id: 'funMemories',
    title: '🎉 Fun Times',
    icon: Camera,
    description: 'Share your favorite moments and adventures!',
    preview: 'bg-gradient-to-r from-blue-200 to-purple-200',
    stickers: ['🎉', '🎨', '🎭', '🎪', '🎡']
  },
  {
    id: 'myStyle',
    title: '👗 My Style',
    icon: Palette,
    description: 'Show off your awesome style and favorite things!',
    preview: 'bg-gradient-to-r from-purple-200 to-pink-200',
    stickers: ['👗', '👜', '👠', '🎀', '💄']
  },
  {
    id: 'hobbies',
    title: '⭐ My Hobbies',
    icon: Star,
    description: 'All about your favorite activities and sports!',
    preview: 'bg-gradient-to-r from-yellow-200 to-pink-200',
    stickers: ['⚽', '🎨', '🎵', '📚', '🎭']
  },
  {
    id: 'music',
    title: '🎵 Music & Dance',
    icon: Music,
    description: 'Your favorite songs, dances, and musical moments!',
    preview: 'bg-gradient-to-r from-indigo-200 to-purple-200',
    stickers: ['🎵', '🎤', '💃', '🎼', '🎸']
  },
  {
    id: 'dreams',
    title: '👑 Dreams & Goals',
    icon: Crown,
    description: 'Write about your dreams and what you want to be!',
    preview: 'bg-gradient-to-r from-purple-200 to-blue-200',
    stickers: ['✨', '🌈', '⭐', '🦋', '🌟']
  }
];

export default function YearbookViewer({ params }: { params: { id: string } }) {
  const [yearbook, setYearbook] = useState<Yearbook | null>(null);
  const [view, setView] = useState<'yearbook' | 'scrapbook'>('yearbook');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const loadedYearbook = yearbookStorage.getYearbookById(params.id);
    setYearbook(loadedYearbook);
  }, [params.id]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleStartCreating = () => {
    if (selectedTemplate) {
      setView('scrapbook');
    }
  };

  if (!yearbook) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="animate-bounce">
          <Sparkles className="h-12 w-12 text-purple-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <Link 
            href="/yearbook"
            className="inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Yearbooks
          </Link>

          <div className="flex space-x-4">
            <button
              onClick={() => setView('yearbook')}
              className={`flex items-center px-4 py-2 rounded-full ${
                view === 'yearbook' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-purple-500 hover:bg-purple-50'
              }`}
            >
              <Book className="h-4 w-4 mr-2" />
              Yearbook
            </button>
            <button
              onClick={() => setView('scrapbook')}
              className={`flex items-center px-4 py-2 rounded-full ${
                view === 'scrapbook' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-purple-500 hover:bg-purple-50'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Scrapbook
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {view === 'yearbook' ? (
            <>
              <div className="text-center mb-12">
                <div className="animate-bounce inline-block">
                  <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                </div>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                  {yearbook.title}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">{yearbook.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`p-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 ${
                      template.preview
                    } ${
                      selectedTemplate === template.id 
                        ? 'ring-4 ring-purple-500 ring-opacity-50 scale-105' 
                        : ''
                    }`}
                  >
                    <template.icon className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex gap-2 justify-center text-2xl">
                      {template.stickers.map((sticker, index) => (
                        <span key={index} className="animate-pulse">{sticker}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleStartCreating}
                  disabled={!selectedTemplate}
                  className={`px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium 
                    ${selectedTemplate 
                      ? 'hover:from-pink-600 hover:to-purple-600 transform hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-200`}
                >
                  {selectedTemplate ? 'Start Creating Your Page ✨' : 'Select a template to start ✨'}
                </button>
              </div>
            </>
          ) : (
            <ScrapbookEditor 
              yearbookId={yearbook.id} 
              selectedTemplate={selectedTemplate || undefined} 
            />
          )}
        </div>
      </div>
    </div>
  );
} 