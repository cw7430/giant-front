import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Giant 로그인 페이지',
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      {children}
    </main>
  );
}
