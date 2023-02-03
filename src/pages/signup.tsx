import { Link } from "react-router-dom";
import { PostSignUp } from "../apis/sign";
import { useEffect, useState } from "react";
import { validate } from "../utils/sign";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();

  // input 에 입력된 값
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // 각 input 에 대한 error 값
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: any) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  const handleErrors = (value: any) => setErrors(value);
  const onDisabled = () => setDisabled(true);
  const offDisabled = () => setDisabled(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await PostSignUp(values);
    // 회원가입이 완료되면 signin 으로 라우터 이동
    if (res) navigate("/signin");
  };

  // 로컬스토리지에 accesstoken 있으면
  useEffect(() => {
    if (localStorage.getItem("AccessToken")) navigate("/todo");
  }, [navigate]);

  useEffect(() => {
    const errors = validate(values);
    handleErrors(errors);

    if (!errors.email && !errors.password) offDisabled();
    else onDisabled();
  }, [values]);

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <button data-testid="signup-button" disabled={disabled}>
          회원가입
        </button>
      </form>

      <button>
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default SingUp;
