import { useState } from "react";
import api from "../api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {

        api
            .post("/api/auth/register", {
                name,
                email,
                password,
                role: "USER"
            })
            .then(() => {

                return api.post("/api/auth/login", {
                    email,
                    password
                });
            })
            .then((response) => {

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", email);
                localStorage.setItem("role", response.data.role);

                alert("Account created successfully");

                window.location.href = "/products";
            })
            .catch((error) => {

                console.log(error);

                alert("Registration failed");
            });
    };
    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff]">

            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-[#00236f] mb-8">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-14 border rounded-2xl px-5 mb-5 outline-none"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
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
                    onClick={handleRegister}
                    className="w-full bg-[#00236f] text-white h-14 rounded-2xl font-bold"
                >
                    Register
                </button>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?

                    <button
                        onClick={() => window.location.href = "/login"}
                        className="text-[#00236f] font-bold ml-1 hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Register;