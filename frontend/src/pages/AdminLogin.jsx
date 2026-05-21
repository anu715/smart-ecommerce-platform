import { useState } from "react";
import axios from "axios";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = () => {

        axios
            .post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password
                }
            )
            .then((response) => {

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "email",
                    email
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                if (response.data.role === "ADMIN") {

                    window.location.href = "/admin";

                } else {

                    alert("Only admin can login here");
                }
            })
            .catch(() => {

                alert("Invalid admin credentials");
            });
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe5e5] to-[#fff5f5]">

            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Admin Email"
                    className="w-full h-14 border rounded-2xl px-5 mb-5 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-14 border rounded-2xl px-5 mb-5 outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleAdminLogin}
                    className="w-full bg-red-600 text-white h-14 rounded-2xl font-bold"
                >
                    Login as Admin
                </button>

            </div>

        </div>
    );
}

export default AdminLogin;