import clsx from 'clsx';

import { SignInForm } from '@/features/auth/sign-in/ui';
import style from './page.module.css';

export default function SignIn() {
  return (
    <div
      className={clsx(
        'w-100 mx-auto border shadow-lg',
        style['custom-box'],
        'card',
      )}
    >
      <div className="card-header">
        <h2>{'로그인'}</h2>
      </div>
      <div className={clsx(style['p-custom'], 'card-body')}>
        <SignInForm />
      </div>
    </div>
  );
}
