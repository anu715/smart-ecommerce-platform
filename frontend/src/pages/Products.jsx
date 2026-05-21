import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = () => {
        axios
            .get("http://localhost:8080/api/products/page?page=0&size=8")
            .then((response) => {
                setProducts(response.data.content);
            });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const searchProducts = () => {
        axios
            .get(`http://localhost:8080/api/products/search?name=${searchName}`)
            .then((response) => {
                setProducts(response.data);
            });
    };

    const filterByCategory = () => {
        axios
            .get(`http://localhost:8080/api/products/category?category=${category}`)
            .then((response) => {
                setProducts(response.data);
            });
    };

    const addToCart = async (product) => {
        try {
            await axios.post("http://localhost:8080/api/cart/add", {
                userEmail: localStorage.getItem("email"),
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl
            });

            alert("Product added to cart");
        } catch (error) {
            console.log(error);
            alert("Failed to add cart");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff] text-[#0b1c30] pb-24">

            <div className="max-w-7xl mx-auto px-4 pt-6">
                <div className="bg-gradient-to-r from-[#00236f] to-[#1e3a8a] text-white px-8 py-6 rounded-3xl shadow-2xl">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                Nexus Retail
                            </h1>
                            <p className="text-blue-100 mt-2">
                                Premium electronics marketplace
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link to="/cart" className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl font-semibold backdrop-blur-lg transition">
                                Cart
                            </Link>

                            <Link to="/orders" className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl font-semibold backdrop-blur-lg transition">
                                Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <section className="px-4 pt-8 pb-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#0b1c30]">
                            Explore Products
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Discover premium gadgets and electronics
                        </p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#d3d9e6] shadow-sm">
                        <span>⚡</span>
                        <span className="text-sm font-semibold text-[#00236f]">
                            Fast Search
                        </span>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            value={searchName}
                            placeholder="Search premium electronics..."
                            className="md:col-span-2 h-14 px-5 bg-white border border-[#dbe3f0] rounded-2xl outline-none focus:border-[#00236f] shadow-sm"
                            onChange={(e) => setSearchName(e.target.value)}
                        />

                        <button
                            onClick={searchProducts}
                            className="h-14 bg-[#00236f] hover:bg-[#1e3a8a] text-white rounded-2xl font-semibold shadow-lg transition"
                        >
                            Search
                        </button>

                        <input
                            value={category}
                            placeholder="Category"
                            className="h-14 px-5 bg-white border border-[#dbe3f0] rounded-2xl outline-none focus:border-[#00236f] shadow-sm"
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <button
                            onClick={filterByCategory}
                            className="h-14 bg-[#1e3a8a] hover:bg-[#264191] text-white rounded-2xl font-semibold shadow-lg transition"
                        >
                            Filter
                        </button>
                    </div>

                    <button
                        onClick={loadProducts}
                        className="mt-5 px-6 py-3 border border-[#00236f] text-[#00236f] rounded-2xl font-semibold hover:bg-[#00236f] hover:text-white transition"
                    >
                        Reset Products
                    </button>
                </div>
            </section>

            <section className="px-8 max-w-7xl mx-auto pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 hover:-translate-y-2"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800";
                                    }}
                                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                                />

                                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg w-10 h-10 rounded-full shadow-md hover:bg-red-100 transition">
                                    ❤️
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="bg-[#dce9ff] text-[#00236f] px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        {product.category}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        Stock {product.stock}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-[#0b1c30] truncate">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2 h-10 overflow-hidden">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-5 mb-5">
                                    <span className="text-2xl font-bold text-[#00236f]">
                                        ₹ {product.price}
                                    </span>
                                </div>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full bg-[#00236f] hover:bg-[#1e3a8a] text-white py-3 rounded-2xl font-semibold transition duration-300 shadow-lg"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#dbe3f0] shadow-lg">
                <div className="flex justify-around py-4">
                    <Link to="/products" className="text-[#00236f] font-bold text-sm">Products</Link>
                    <Link to="/cart" className="text-gray-500 text-sm">Cart</Link>
                    <Link to="/orders" className="text-gray-500 text-sm">Orders</Link>
                    <Link to="/admin" className="text-gray-500 text-sm">Admin</Link>
                </div>
            </nav>
        </div>
    );
}

export default Products;