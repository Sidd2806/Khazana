import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./components/Pages/Home"
import {Toaster} from "sonner"
import Login from "./components/Pages/Login"
import Register from "./components/Pages/Register"
import Profile from "./components/Pages/Profile"
import CollectionPage from "./components/Pages/CollectionPage"
import ProductDetails from "./components/Products/ProductDetails"
import CheckOut from "./components/Cart/CheckOut"
import OrderConfirmationPage from "./components/Pages/OrderConfirmationPage"
import OrderDetailsPage from "./components/Pages/OrderDetailsPage"
import MyOrderPage from "./components/Pages/MyOrderPage"
import AdminLayout from "./components/Admin/AdminLayout"
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
        <Route path="collections/:collection" element= {<CollectionPage />} />
        <Route path="product/:id" element= {<ProductDetails />} /> 
        <Route path="checkout" element= {<CheckOut />} /> 
        <Route path="order-confirmation" element= {<OrderConfirmationPage />} /> 
        <Route path="order/:id" element={<OrderDetailsPage />} />
        <Route path="my-orders" element={< MyOrderPage />} />
      </Route>
      <Route>
        <Route path="/admin" element={ <AdminLayout/> } />
        {/* Admin layout */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App