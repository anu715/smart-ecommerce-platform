import { useState } from "react";
import axios from "axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {

        axios
            .post("http://localhost:8080/api/auth/register", {
                name,
                email,
                password
            })
            .then(() => {
                alert("Registration successful. Please login.");
            })
            .catch(() => {
                alert("Registration failed");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-xl w-96">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <input
                    placeholder="Name"
                    className="w-full border p-3 rounded-lg mb-4"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    Register
                </button>

            </div>
        </div>
    );
}

export default Register;