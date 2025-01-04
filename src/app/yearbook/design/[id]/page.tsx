'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverEditor } from "@/components/yearbook/cover-editor";
import { PagesEditor } from "@/components/yearbook/pages-editor";
import { ThemeEditor } from "@/components/yearbook/theme-editor";
import { PhotosUploader } from "@/components/yearbook/photos-uploader";
import { FriendsSection } from "@/components/yearbook/friends-section";

export default function YearbookDesigner({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Design Your Yearbook
        </h1>

        <Tabs defaultValue="cover" className="bg-white rounded-2xl shadow-lg p-6">
          <TabsList className="grid grid-cols-5 gap-4 mb-8">
            <TabsTrigger value="cover">Cover</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="cover">
            <CoverEditor />
          </TabsContent>
          
          <TabsContent value="theme">
            <ThemeEditor />
          </TabsContent>
          
          <TabsContent value="pages">
            <PagesEditor />
          </TabsContent>
          
          <TabsContent value="photos">
            <PhotosUploader />
          </TabsContent>
          
          <TabsContent value="friends">
            <FriendsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 