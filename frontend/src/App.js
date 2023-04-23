import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Nav from "./components/Nav";
import { Route, Routes} from "react-router-dom";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Nav open={open} setOpen={setOpen} />
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes> 
    </>
  );
}

export default App;
