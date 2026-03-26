<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { useAppConfigStore } from '~~/layers/base/app/stores/app';
import { useAuthStore } from '~~/layers/auth/app/stores/auth';
import {
  signInRequestSchema,
  type SignInRequestDto,
} from '~~/layers/auth/contract/schema/sign-in';

const appConfigStore = useAppConfigStore();
const authStore = useAuthStore();

const isLoading = ref<boolean>(false);
const rootError = ref<string | null>(null);

const { handleSubmit, errors, defineField } = useForm<SignInRequestDto>({
  validationSchema: toTypedSchema(signInRequestSchema),
  initialValues: {
    userName: '',
    password: '',
    isAuto: appConfigStore.isAutoSignIn,
  },
});

const [userName, userNameProps] = defineField('userName');
const [password, passwordProps] = defineField('password');
const [isAuto, isAutoProps] = defineField('isAuto');

watch(isAuto, (newVal) => {
  appConfigStore.setAutoSignIn(newVal);
});

const onSubmit = handleSubmit(async (values) => {
  rootError.value = null;
  isLoading.value = true;

  const response = await $fetch('/api/auth/sign-in', {
    method: 'POST',
    body: values,
  });

  if (response.code !== 'SU') {
    switch (response.code) {
      case 'LGE':
      case 'VE':
        rootError.value = '아이디 또는 비밀번호가 올바르지 않습니다.';
        break;

      default:
        rootError.value =
          '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }

    isLoading.value = false;
    return;
  }

  authStore.signIn(response.result);

  isLoading.value = false;
  return await navigateTo('/', { replace: true });
});
</script>

<template>
  <BForm @submit="onSubmit">
    <BFormGroup
      label="아이디"
      label-for="user-name"
      class="mb-2"
      :invalid-feedback="errors.userName"
      :state="!errors.userName"
    >
      <BFormInput
        id="user-name"
        v-model="userName"
        v-bind="userNameProps"
        :state="errors.userName ? false : null"
        placeholder="아이디를 입력해주세요"
      />
    </BFormGroup>

    <BFormGroup
      label="비밀번호"
      label-for="password"
      class="mb-2"
      :invalid-feedback="errors.password"
      :state="!errors.password"
    >
      <BFormInput
        id="password"
        v-model="password"
        type="password"
        v-bind="passwordProps"
        :state="errors.password ? false : null"
        placeholder="비밀번호를 입력해주세요"
      />
    </BFormGroup>

    <BFormCheckbox
      id="is-auto"
      v-model="isAuto"
      v-bind="isAutoProps"
      class="mb-3"
    >
      자동 로그인
    </BFormCheckbox>

    <div class="d-block invalid-feedback mb-2">{{ rootError }}</div>

    <BButton
      type="submit"
      variant="primary"
      class="w-100 mt-2"
      :disabled="isLoading"
    >
      <BSpinner v-if="isLoading" small />
      로그인
    </BButton>
  </BForm>
</template>
