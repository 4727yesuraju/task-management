import { Header } from "./components/Header";
import { CreateTask } from "./pages/CreateTask";
import { Home } from "./pages/Home";
import { ResetPassword } from "./pages/ResetPassword";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { UpdateTask } from "./pages/UpdateTask";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
       <Header />
       <Routes>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/create-task" element={<CreateTask/>} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/" element={<Home />}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
