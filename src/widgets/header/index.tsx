'use client';
import Link from 'next/link';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <div className="bg-black text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <Navbar bg="black" data-bs-theme="dark">
        <Navbar.Brand as={Link} href="/" className="fs-4">
          {'Giant'}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">{'재고관리'}</Nav.Link>
          <Nav.Link href="#">{'매출관리'}</Nav.Link>
          <Nav.Link href="#">{'인사관리'}</Nav.Link>
        </Nav>
      </Navbar>
      <div className="d-flex gap-2">
        <Button variant="outline-light" type="button">
          {'내프로필'}
        </Button>
        <Button variant="outline-light" type="button">
          {'로그아웃'}
        </Button>
      </div>
    </div>
  );
}
