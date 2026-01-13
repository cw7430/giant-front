'use client';

import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  signInRequestSchema,
  type SignInRequestDto,
} from '@/features/sign-in/schema';
import { useAppConfigStore } from '@/shared/stores';

export default function SignInForm() {
  const { isAutoSignIn, setAutoSignIn } = useAppConfigStore();

  const { control, handleSubmit } = useForm<SignInRequestDto>({
    resolver: zodResolver(signInRequestSchema),
    defaultValues: { userName: '', password: '', isAuto: isAutoSignIn },
  });

  const onSubmit: SubmitHandler<SignInRequestDto> = (data) => {
    console.log(data);
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

      <div className="d-grid gap-2 mb-3">
        <Button variant="primary" type="submit">
          {'로그인'}
        </Button>
      </div>
    </Form>
  );
}
