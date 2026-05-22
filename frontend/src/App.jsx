import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

function App() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/login");
    };

    if (!token) {

        return (

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>
        );
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff]">

            <div className="fixed top-4 right-4 z-50 flex items-center gap-3">

                <div className="bg-white shadow-lg px-4 py-2 rounded-xl font-semibold">
                    {email}
                </div>

                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold"
                >
                    Logout
                </button>

            </div>

            <Routes>

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/admin"
                    element={
                        role === "ADMIN"
                            ? <Admin />
                            : <Navigate to="/products" />
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/products" />}
                />

            </Routes>

        </div>
    );
}

export default App;
