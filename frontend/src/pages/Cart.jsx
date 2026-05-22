import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const userEmail = localStorage.getItem("email");

    const loadCart = () => {

        axios
            .get(`https://smart-ecommerce-platform-zj7d.onrender.com/api/cart/${userEmail}`)
            .then((response) => {
                setCartItems(response.data);
            });
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = (id) => {
        axios
            .delete(`https://smart-ecommerce-platform-zj7d.onrender.com/api/cart/delete/${id}`)
            .then(() => {
                loadCart();
            });
    };

    const placeOrder = () => {

        axios
            .post(
                `https://smart-ecommerce-platform-zj7d.onrender.com/api/payment/pay?email=${userEmail}&amount=${totalAmount}`
            )
            .then((paymentResponse) => {

                alert(
                    "Payment successful. Transaction ID: " +
                    paymentResponse.data.transactionId
                );

                return axios.post(
                    `https://smart-ecommerce-platform-zj7d.onrender.com/api/orders/place?email=${userEmail}`
                );
            })
            .then(() => {

                alert("Order placed successfully");

                loadCart();

                window.location.href = "/orders";
            })
            .catch((error) => {

                console.log(error);

                alert("Payment or order failed");
            });
    };

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff] p-8 pb-24">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-[#00236f] mb-8">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
                        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
                        <Link to="/products" className="text-[#00236f] font-bold">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-5">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl p-5 shadow-lg flex gap-5 items-center"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-28 h-28 object-cover rounded-2xl"
                                    />

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold">
                                            {item.productName}
                                        </h2>

                                        <p className="text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="text-[#00236f] font-bold text-xl mt-2">
                                            ₹ {item.price}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-xl mt-8 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                Total: ₹ {totalAmount}
                            </h2>

                            <button
                                onClick={placeOrder}
                                className="bg-[#00236f] text-white px-8 py-4 rounded-2xl font-bold"
                            >
                                Place Order
                            </button>
                        </div>
                    </>
                )}

                <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#dbe3f0] shadow-lg">
                    <div className="flex justify-around py-4">
                        <Link to="/products" className="text-gray-500 text-sm">Products</Link>
                        <Link to="/cart" className="text-[#00236f] font-bold text-sm">Cart</Link>
                        <Link to="/orders" className="text-gray-500 text-sm">Orders</Link>
                        <Link to="/admin" className="text-gray-500 text-sm">Admin</Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Cart;