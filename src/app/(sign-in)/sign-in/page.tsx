import { SignInForm } from '@/features/sign-in/ui';
import style from './page.module.css';

export default function SignIn() {
  return (
    <div
      className={`w-100 mx-auto border shadow-lg ${style['custom-box']} card`}
    >
      <div className="card-header">
        <h2>{'로그인'}</h2>
      </div>
      <div className={`${style['p-custom']} card-body`}>
        <SignInForm />
      </div>
    </div>
  );
}
