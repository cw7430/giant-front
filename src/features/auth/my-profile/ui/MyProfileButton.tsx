'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function MyProfileButton() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onClick = () => {
    setLoading(true);
    try {
      console.log('미구현 버튼');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline-light"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {'내프로필'}
    </Button>
  );
}
