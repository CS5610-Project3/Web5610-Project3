import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Nav from "./components/Nav";
import Post from "./components/Post";
import { Route, Routes} from "react-router-dom";
import { useState } from "react";
import UserHeader from "./components/UserInformation"

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Nav open={open} setOpen={setOpen} />
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/test" element={<UserHeader />} />
    </Routes> 
    </>
  );
}

export default App;
