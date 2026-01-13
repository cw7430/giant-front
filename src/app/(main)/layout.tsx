import { Footer, Header } from '@/widgets';

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
