import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1> 홈입니다.</h1>
      <Link to="/signin">로그인 하러가기</Link>
    </div>
  );
};

export default Home;
