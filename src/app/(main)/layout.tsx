import { Metadata } from 'next';

import { Footer, Header } from '@/widgets';

export const metadata: Metadata = {
  title: 'Giant',
  description: 'Giant 사내 관리 시스템',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-light text-dark">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
