export default function YearbookDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
  ];
} 