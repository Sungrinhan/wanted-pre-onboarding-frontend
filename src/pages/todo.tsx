import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GetToDos,
  PostCreateTodo,
  DeleteToDo,
  PutUpdateToDo,
} from "../apis/sign";
import { ToDos } from "../types/todos";

const Todo = () => {
  const [toDos, setToDos] = useState<ToDos[]>([]);
  const [IsModifying, setIsModifying] = useState(false);

  const handleToDos = (value: ToDos[]) => setToDos(value);

  const handleSubmit = () => {
    PostCreateTodo({ todo: "과제하기" });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleUpdate = () => {};

  const handleDelete = (id: number) => {
    DeleteToDo(id);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    GetToDos().then((res) => handleToDos(res));
  }, []);

  return (
    <div>
      <h1>Todo 리스트</h1>
      <div>
        <form onSubmit={onSubmit}>
          <input data-testid="new-todo-input" />
          <button data-testid="new-todo-add-button" onClick={handleSubmit}>
            추가
          </button>
        </form>
      </div>
      <div>
        {toDos.map((el) => {
          console.log(el);
          return (
            <li key={el.id}>
              <label>
                <input type="checkbox" checked={el.isCompleted} />
                <span>{el.todo}</span>
              </label>
              <button data-testid="modify-button">수정</button>
              <button
                data-testid="delete-button"
                onClick={() => handleDelete(Number(el.id))}
              >
                삭제
              </button>
            </li>
          );
        })}
      </div>
      <button onClick={handleLogout}>
        <Link to="/signin">로그아웃하기</Link>
      </button>
    </div>
  );
};

export default Todo;
