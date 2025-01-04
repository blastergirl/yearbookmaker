import { Camera, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Capture Your School Memories
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Create your digital yearbook, share photos, and connect with classmates.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/yearbook">View Yearbook</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div className="rounded-lg border p-6 text-center">
          <Users className="mx-auto h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Create Your Profile</h3>
          <p className="mt-2 text-gray-600">
            Personalize your yearbook page with photos, interests, and memories.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <Camera className="mx-auto h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Share Photos</h3>
          <p className="mt-2 text-gray-600">
            Upload and share your favorite moments from the school year.
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Leave Messages</h3>
          <p className="mt-2 text-gray-600">
            Write notes and share memories with your classmates.
          </p>
        </div>
      </div>
    </div>
  );
}