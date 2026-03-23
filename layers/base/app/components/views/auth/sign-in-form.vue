<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAppConfigStore } from '~/stores/app';
import {
  signInRequestSchema,
  type SignInRequestDto,
} from '~~/shared/schema/auth/sign-in';

const appConfigStore = useAppConfigStore();

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

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));
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

    <BButton type="submit" variant="primary" class="w-100 mt-2">
      로그인
    </BButton>
  </BForm>
</template>
