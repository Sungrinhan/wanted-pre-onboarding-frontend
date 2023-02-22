import axios from "axios";
import { SignInfo } from "../types/signs";

export const PostSignUp = async (data: SignInfo) => {
  try {
    await axios.post("https://pre-onboarding-selection-task.shop/auth/signup", {
      email: data.email,
      password: data.password,
    });
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    return true;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const GetSignIn = async (data: SignInfo) => {
  try {
    const res = await axios.post(
      "https://pre-onboarding-selection-task.shop/auth/signin",
      {
        email: data.email,
        password: data.password,
      }
    );
    alert("로그인이 완료되었습니다. todo 페이지로 이동합니다.");
    const AccessToken = res.data.access_token;
    localStorage.setItem("AccessToken", AccessToken);
    return true;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
