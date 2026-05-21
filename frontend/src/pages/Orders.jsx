import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);

    const userEmail = localStorage.getItem("email");

    useEffect(() => {

        axios
            .get(`http://localhost:8080/api/orders/${userEmail}`)
            .then((response) => {
                setOrders(response.data);
            });

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff] p-8 pb-24">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-10">

                    <div>
                        <h1 className="text-4xl font-bold text-[#00236f]">
                            My Orders
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track your recent purchases
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="bg-[#00236f] text-white px-6 py-3 rounded-2xl font-semibold"
                    >
                        Continue Shopping
                    </Link>

                </div>

                {orders.length === 0 ? (

                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">

                        <h2 className="text-3xl font-bold text-gray-700 mb-3">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500">
                            Your placed orders appear here
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                            >

                                <img
                                    src={order.imageUrl}
                                    alt={order.productName}
                                    className="w-full h-64 object-cover"
                                />

                                <div className="p-6">

                                    <div className="flex justify-between items-center mb-4">

                                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                                            Order Placed
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            Order #{order.id}
                                        </span>

                                    </div>

                                    <h2 className="text-2xl font-bold text-[#00236f]">
                                        {order.productName}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Quantity: {order.quantity}
                                    </p>

                                    <div className="flex justify-between items-center mt-6">

                                        <span className="text-3xl font-bold text-[#00236f]">
                                            ₹ {order.price}
                                        </span>

                                        <button className="bg-[#00236f] text-white px-5 py-3 rounded-2xl font-semibold">
                                            Track Order
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

                <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#dbe3f0] shadow-lg">

                    <div className="flex justify-around py-4">

                        <Link
                            to="/products"
                            className="text-gray-500 text-sm"
                        >
                            Products
                        </Link>

                        <Link
                            to="/cart"
                            className="text-gray-500 text-sm"
                        >
                            Cart
                        </Link>

                        <Link
                            to="/orders"
                            className="text-[#00236f] font-bold text-sm"
                        >
                            Orders
                        </Link>

                        <Link
                            to="/admin"
                            className="text-gray-500 text-sm"
                        >
                            Admin
                        </Link>

                    </div>

                </nav>

            </div>

        </div>
    );
}

export default Orders;