export default function YearbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '1736023575913' }, // Add your actual yearbook ID
  ];
} 