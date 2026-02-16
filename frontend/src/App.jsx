import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./components/Pages/Home"
const App = () => {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<UserLayout />} >
        {/* User layout */}
        <Route index element={<Home />} />  
        {/* index means if parent route loaded then load this othewise not */}
      </Route>
      <Route>
        {/* Admin layout */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App