import { SignInfo } from "../types/signs";
import api from "./axiosinstace";

export const PostSignUp = async (data: SignInfo) => {
  try {
    await api.post("/auth/signup", {
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
    const res = await api.post("/auth/signin", {
      email: data.email,
      password: data.password,
    });
    const AccessToken = res.data.access_token;
    await localStorage.setItem("AccessToken", AccessToken);
    // alert("로그인이 완료되었습니다. todo 페이지로 이동합니다.");
    return true;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
