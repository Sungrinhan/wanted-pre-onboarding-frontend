import api from "./axiosinstace";

export const PostCreateTodo = async (data: any) => {
  try {
    const res = await api.post("/todos", data);
    return res;
  } catch (error: any) {
    alert(error.response.data.message);
    return error;
  }
};

export const GetToDos = async () => {
  try {
    const res = await api.get("/todos");

    return res.data;
  } catch (error: any) {
    // alert(error.response.data.message);
    return error;
  }
};

export const PutUpdateToDo = async (data: any, id: number) => {
  try {
    const res = await api.put(`/todos/${id}`, data);
    return res;
  } catch (error: any) {
    alert(error.response.data.message);
    return error;
  }
};

export const DeleteToDo = async (id: number) => {
  try {
    const res = await api.delete(`/todos/${id}`);
    return res;
  } catch (error: any) {
    alert(error.response.data.message);
    return error;
  }
};
