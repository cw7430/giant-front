import Link from 'next/link';

import { SignOutButton } from '@/features/auth/sign-out/ui';
import { MyProfileButton } from '@/features/auth/my-profile/ui';

export default function Header() {
  return (
    <div className="bg-black text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <nav
        data-bs-theme="dark"
        className="navbar navbar-expand navbar-light bg-black"
      >
        <Link href="/" className="fs-4 navbar-brand">
          {'Giant'}
        </Link>
        <div className="me-auto navbar-nav">
          <Link href="/" className="nav-link">
            {'재고관리'}
          </Link>
          <Link href="/" className="nav-link">
            {'매출관리'}
          </Link>
          <Link href="/" className="nav-link">
            {'인사관리'}
          </Link>
        </div>
      </nav>
      <div className="d-flex gap-2">
        <MyProfileButton />
        <SignOutButton />
      </div>
    </div>
  );
}
