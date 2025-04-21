import Home from "./components/Home";
import NavigationBar from "./components/NavBar";
import ProductsMenu from "./components/ProductsMenu";
import OrderProcessing from "./components/OrderProcessing";
import OrderHistory from "./components/OrderHistory";
import CustomerForm from "./components/CreateCustomerForm";
import UpdateCustomerForm from "./components/UpdateCustomerForm";
import ListAllCustomers from "./components/ListAllCustomers";
import ProductForm from "./components/CreateProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import ListAllProducts from "./components/ListAllProducts";
import NotFound from "./components/NotFound";
import CustomerDetails from "./components/CustomerDetails";
import { Route, Routes } from "react-router-dom";
import CustomersAndAccountsMenu from "./components/CustomersAndAccountsMenu";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Auth/Login";
import UserProfile from "./components/UserProfile"; // Import UserProfile

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ProductsMenu/" element={<ProductsMenu />}/>
        <Route path="/OrderProcessing" element={<OrderProcessing />}/>
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/CustomersAndAccountsMenu/" element={<CustomersAndAccountsMenu />}/>
        <Route path="/CreateCustomerForm" element={<CustomerForm />}/>
        <Route path="/UpdateCustomerForm/:id" element={<UpdateCustomerForm />}/>
        <Route path="/ListAllCustomers" element={<ListAllCustomers />}/>
        <Route path="/CreateProductForm" element={<ProductForm />}/>
        <Route path="/UpdateProductForm/:id" element={<UpdateProductForm />}/>
        <Route path="/ListAllProducts" element={<ListAllProducts/>}/>
        <Route path="/CustomerDetails/:id" element={<CustomerDetails />}/>
        <Route path="/cart" element={<ShoppingCart />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App;
