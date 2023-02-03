export const validate = (values: any) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!values.email.includes("@")) {
    errors.email = "이메일에는 @ 가 들어가야 합니다.  ";
  }
  if (values.password.length < 8) {
    errors.password = "비밀번호는 8글자 이상입니다.";
  }

  return errors;
};
