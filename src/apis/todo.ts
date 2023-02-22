import axios from "axios";

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
    return res;
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
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

export const DeleteToDo = async (id: number) => {
  try {
    const res = await axios.delete(
      `https://pre-onboarding-selection-task.shop/todos/${id}`,
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
