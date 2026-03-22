<template>
  <BForm>
    <BFormGroup label="아이디" label-for="user-name">
      <BFormInput id="user-name" placeholder="아이디를 입력해주세요" />
    </BFormGroup>
    <BFormGroup label="비밀번호" label-for="password">
      <BFormInput id="password" placeholder="비밀번호를 입력해주세요" />
    </BFormGroup>
    <BButton type="submit" variant="primary">로그인</BButton>
  </BForm>
</template>
