import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingIn from "./pages/signin";
import SingUp from "./pages/signup";
import Home from "./pages/home";
import Todo from "./pages/todo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SingIn />}></Route>
          <Route path="/signup" element={<SingUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
