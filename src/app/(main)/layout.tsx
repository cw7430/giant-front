import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { Footer, Header } from '@/widgets';

export const metadata: Metadata = {
  title: 'Giant',
  description: 'Giant 사내 관리 시스템',
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    redirect('/sign-in');
  }

  return (
    <div className="bg-light text-dark">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
