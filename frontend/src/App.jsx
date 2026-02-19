import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./components/Pages/Home"
import {Toaster} from "sonner"
import Login from "./components/Pages/Login"
import Register from "./components/Pages/Register"
import Profile from "./components/Pages/Profile"
const App = () => {
  return (
    <BrowserRouter >
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout />} >
        {/* User layout */}
        <Route index element={<Home />} />  
        {/* index means if parent route loaded then load this othewise not */}
        <Route path="login" element= {<Login />} />
        <Route path="register" element= {<Register />} />
        <Route path="profile" element= {<Profile />} />
      </Route>
      <Route>
        {/* Admin layout */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App