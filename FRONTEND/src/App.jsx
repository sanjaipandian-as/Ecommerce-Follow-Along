import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";
import SellerProcutPage from "./pages/SellerProductPage";
import CreateProduct from "./componants/Createproduct";
import IndividualProduct from "./pages/IndividualProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Progile";
import Order from "./pages/Order";


function app() {
  return (
     <BrowserRouter>
        <Navbar/>
       <Routes>
            <Route  path="/"  element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="/Create" element={<CreateProduct/>}/>
            <Route path="/Modify" element={<SellerProcutPage/>}/>
            <Route path="/Pro" element={<IndividualProduct/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/order" element={<Order/>}/>
            
            

       </Routes>
     </BrowserRouter>
  );
}

export default app;