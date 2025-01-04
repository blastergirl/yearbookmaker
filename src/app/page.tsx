import { Camera, MessageCircle, Users, Heart, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Test from './test';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <div className="animate-bounce inline-block mb-6">
            <Sparkles className="h-12 w-12 text-purple-500" />
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Your Digital Yearbook Adventure!
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Create amazing memories with your friends! Share photos, write cool messages, and make your yearbook super special! ✨
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link 
              href="/create"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Create Your Yearbook! 🌟
            </Link>
            
            <Link 
              href="/yearbook"
              className="px-8 py-4 bg-white text-purple-500 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border-2 border-purple-500"
            >
              View Yearbooks! 📚
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-200">
            <div className="bg-pink-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Share Photos!</h3>
            <p className="text-gray-600">Upload your favorite pictures and create amazing photo collections with your friends!</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-200">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Write Messages!</h3>
            <p className="text-gray-600">Leave fun notes for your friends and share your favorite memories together!</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-200">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Connect!</h3>
            <p className="text-gray-600">Stay connected with all your friends and create amazing memories together!</p>
          </div>
        </div>

        <div className="text-center pb-12">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-pink-500" /> for amazing friends
          </p>
        </div>
      </div>
      <Test />
    </div>
  );
}