import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div
        className="text-center shadow-lg card"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <div className="card-body">
          <div className="alert alert-secondary" role="alert">
            <div className="alert-heading">{'404 Not Found'}</div>
            <p>{'페이지를 찾을 수 없습니다.'}</p>
          </div>
          <Link href="/" className="btn btn-primary">
            {'홈으로'}
          </Link>
        </div>
      </div>
    </div>
  );
}
