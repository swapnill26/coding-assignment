import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./_components/Login/Login";
import AdminDashboard from "./_components/Admin/AdminDashboard";
import UserDashBoard from "./_components/UserDashBoard/UserDashBoard";
import { useSelector } from "react-redux";
import CartCheckout from "./_components/CartCheckout/CartCheckout";

const PrivateWrapper = () => {
  const rootState = useSelector((state) => state);
  const loginState = rootState.AuthReducer.isLoginSuccess;
  return loginState ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateWrapper />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Cart" element={<CartCheckout />} />
        </Route>
        <Route path="/" element={<UserDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
