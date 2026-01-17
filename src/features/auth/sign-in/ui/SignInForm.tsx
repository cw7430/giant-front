'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  signInRequestSchema,
  type SignInRequestDto,
} from '@/features/auth/sign-in/schema';
import { useAppConfigStore } from '@/shared/stores';
import { signInAction } from '@/features/auth/sign-in/action';
import { useAuthStore } from '@/entities/auth/store';

export default function SignInForm() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { isAutoSignIn, setAutoSignIn } = useAppConfigStore();
  const { signIn } = useAuthStore();

  const { control, handleSubmit } = useForm<SignInRequestDto>({
    resolver: zodResolver(signInRequestSchema),
    defaultValues: { userName: '', password: '', isAuto: isAutoSignIn },
  });

  const onSubmit: SubmitHandler<SignInRequestDto> = async (data) => {
    setLoading(true);
    setError(false);
    setErrorMessage('');

    const response = await signInAction(data);

    if (response.code !== 'SU') {
      setError(true);

      switch (response.code) {
        case 'LGE':
          setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
          break;

        case 'VE':
          setErrorMessage('아이디와 비밀번호를 입력해주세요.');
          break;

        default:
          setErrorMessage(
            '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          );
      }

      setLoading(false);

      return;
    }

    const responseData = response.result;

    signIn(
      responseData.accessTokenExpiresAt,
      responseData.employeeCode,
      responseData.employeeName,
      responseData.accountRole,
      responseData.employeeRole,
      responseData.department,
      responseData.team,
      responseData.position,
    );

    router.replace('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="signin-userId">
        <Form.Label>{'아이디'}</Form.Label>
        <InputGroup hasValidation>
          <Controller
            name="userName"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="아이디를 입력하세요"
                  isInvalid={!!fieldState.error}
                />
                <Form.Control.Feedback type="invalid">
                  {fieldState.error?.message}
                </Form.Control.Feedback>
              </>
            )}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signin-password">
        <Form.Label>{'비밀번호'}</Form.Label>
        <InputGroup hasValidation>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  isInvalid={!!fieldState.error}
                />
                <Form.Control.Feedback type="invalid">
                  {fieldState.error?.message}
                </Form.Control.Feedback>
              </>
            )}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signin-auto">
        <Controller
          name="isAuto"
          control={control}
          render={({ field: { value, onChange, onBlur, name, ref } }) => (
            <Form.Check
              type="checkbox"
              label="자동 로그인"
              id="signin-auto-check"
              name={name}
              ref={ref}
              onBlur={onBlur}
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                setAutoSignIn(e.target.checked);
              }}
            />
          )}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {isError && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            {errorMessage}
          </div>
        )}
      </Form.Group>

      <div className="d-grid gap-2 mb-3">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {isLoading ? '로그인중...' : '로그인'}
        </Button>
      </div>
    </Form>
  );
}
