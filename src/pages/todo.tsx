import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GetToDos,
  PostCreateTodo,
  DeleteToDo,
  PutUpdateToDo,
} from "../apis/sign";
import { ToDos } from "../types/todos";

const Todo = () => {
  const navigate = useNavigate();
  const [toDos, setToDos] = useState<ToDos[]>([]);
  const [isModifying, setIsModifying] = useState<any>(null);
  const [refetch, setRefetch] = useState(false);

  const [newToDo, setNewToDo] = useState("");
  const [modifyInput, setModifyInput] = useState("");

  const handleToDos = (value: ToDos[]) => setToDos(value);

  const handleDoRefetch = () => setRefetch((cur) => !cur);

  const handleNewToDo = (e: any) => setNewToDo(e.target.value);

  const handleModifyInputChange = (e: any) => setModifyInput(e.target.value);

  // 새로운 리스트 추가
  const handleSubmit = async () => {
    if (!newToDo) {
      alert("빈칸은 추가할 수 없습니다.");
      return;
    }
    await PostCreateTodo({ todo: newToDo });

    setNewToDo("");
    handleDoRefetch();
  };

  // 수정 버튼 클릭시
  const handleModifyClick = (el: any) => {
    setIsModifying(el.id);
    setModifyInput(el.todo);
  };

  // 제출 버튼 클릭 시
  const handleUpdate = async (el: any) => {
    if (modifyInput.length === 0) {
      alert("할 일을 입력해 주세요.");
      return;
    }
    await PutUpdateToDo({ ...el, todo: modifyInput }, el.id);
    handleDoRefetch();
    setIsModifying(null);
  };

  // 체크박스 업데이트 (리스트 업데이트)
  const handleCheckBox = async (e: any, todo: ToDos) => {
    const id = Number(todo.id);
    const data = { ...todo, isCompleted: e.target.checked };
    await PutUpdateToDo(data, id);
    handleDoRefetch();
  };

  // 리스트 삭제
  const handleDelete = async (id: number) => {
    await DeleteToDo(id);
    handleDoRefetch();
  };

  // 로그아웃 버튼 클릭
  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if (!localStorage.getItem("AccessToken")) {
      navigate("/signin");
    } else GetToDos().then((res) => handleToDos(res));
  }, [refetch]);

  return (
    <div>
      <h1>Todo 리스트</h1>
      <div>
        <input
          data-testid="new-todo-input"
          onChange={handleNewToDo}
          value={newToDo}
        />
        <button data-testid="new-todo-add-button" onClick={handleSubmit}>
          추가
        </button>
      </div>
      <div>
        {toDos.map((el) => {
          const id = Number(el.id);
          return (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  name="isCompleted"
                  onChange={(e) => handleCheckBox(e, el)}
                  checked={el.isCompleted}
                />
              </label>
              {isModifying === id ? (
                <span>
                  <input
                    data-testid="modify-input"
                    value={modifyInput}
                    onChange={handleModifyInputChange}
                  />
                  <button
                    data-testid="submit-button"
                    onClick={() => handleUpdate(el)}
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={() => setIsModifying(null)}
                  >
                    취소
                  </button>
                </span>
              ) : (
                <span>
                  <span>{el.todo}</span>
                  <button
                    data-testid="modify-button"
                    onClick={() => handleModifyClick(el)}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => handleDelete(id)}
                  >
                    삭제
                  </button>
                </span>
              )}
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
