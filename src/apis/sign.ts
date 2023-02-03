import axios from "axios";
import { ToDos } from "../types/todos";
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

export const PostCreateTodo = async (data: any) => {
  try {
    const res = await axios
      .create({
        timeout: 1000,
      })
      .post("https://pre-onboarding-selection-task.shop/todos", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      });
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const GetToDos = async () => {
  try {
    const res = await axios.get(
      "https://pre-onboarding-selection-task.shop/todos",

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const PutUpdateToDo = async (data: any, id: number) => {
  try {
    const res = await axios.put(
      `https://pre-onboarding-selection-task.shop/todos/:${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const DeleteToDo = async (id: number) => {
  try {
    const res = await axios.delete(
      `https://pre-onboarding-selection-task.shop/todos/:${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }
    );
    return res;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
