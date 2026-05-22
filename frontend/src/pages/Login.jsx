import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios
            .post("https://smart-ecommerce-platform-zj7d.onrender.com/api/auth/login", {
                email,
                password
            })
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

                    window.location.href = "/products";
                }
            })
            .catch(() => {
                alert("Invalid credentials");
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[radial-gradient(circle_at_top_right,#e5eeff_0%,#f8f9ff_100%)] text-[#0b1c30]">

            <div className="w-full max-w-md text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a8a] rounded-xl mb-6 shadow-sm">
                    <span className="text-white text-3xl">🛍️</span>
                </div>

                <h1 className="text-3xl font-bold text-[#00236f] mb-2">
                    Nexus Retail
                </h1>

                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    Elevated commerce experiences powered by high-performance architecture.
                </p>
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-xl shadow-sm">

                    <div className="space-y-6">

                        <div>
                            <label className="block font-bold mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-[#00236f] outline-none"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="font-bold">
                                    Password
                                </label>

                                <button className="text-xs text-[#00236f] font-semibold">
                                    Forgot password?
                                </button>
                            </div>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-[#00236f] outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-[#1e3a8a] text-white py-4 rounded-lg font-semibold shadow-lg active:scale-95 transition"
                        >
                            Sign In →
                        </button>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] rounded-full border border-gray-300">
                            <span className="text-sm text-[#4648d4]">🛡️</span>
                            <span className="text-xs font-semibold text-gray-600">
                                Secure JWT Authentication
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don&apos;t have an account?
                        <button
                            onClick={() => window.location.href = "/register"}
                            className="text-[#00236f] font-bold ml-1 hover:underline"
                        >
                            Create an Account
                        </button>
                    </p>
                </div>
                <div className="text-center mt-4">

                    <button
                        onClick={() => window.location.href = "/admin-login"}
                        className="text-red-600 font-bold hover:underline"
                    >
                        Admin Login
                    </button>

                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00236f] via-[#4648d4] to-[#222a3e] opacity-30"></div>
        </div>
    );
}

export default Login;