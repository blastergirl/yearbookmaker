import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Yearbook Creator',
  description: 'Create and share your digital yearbook memories with friends!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}