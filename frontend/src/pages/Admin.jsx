import { useEffect, useState } from "react";
import api from "../api";

function Admin() {


    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [editingId, setEditingId] = useState(null);



    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
    });

    const loadProducts = () => {
        api
            .get("/api/products/page?page=0&size=20")
            .then((response) => {
                setProducts(response.data.content);
            });
    };

    const loadStats = () => {
        api
            .get("/api/admin/stats")
            .then((response) => {
                setStats(response.data);
            });
    };

    const loadRecentOrders = () => {
        api
            .get("/api/orders/recent")
            .then((response) => {
                setRecentOrders(response.data);
            });
    };

    useEffect(() => {
        loadProducts();
        loadStats();
        loadRecentOrders();
    }, []);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setProduct({
            name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
            imageUrl: ""
        });

        setEditingId(null);
    };

    const editProduct = (item) => {
        setEditingId(item.id);

        setProduct({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
            stock: item.stock,
            imageUrl: item.imageUrl
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };



    const addProduct = async () => {
        try {

            await api.post("/api/products/add", product);

            alert("Product added successfully");

            resetForm();
            loadProducts();

        } catch (error) {

            console.log(error);
            alert("Failed to add product");
        }
    };

    const updateProduct = async () => {
        try {

            await api.put(
                `/api/products/update/${editingId}`,
                product
            );

            alert("Product updated successfully");

            resetForm();
            loadProducts();

        } catch (error) {

            console.log(error);
            alert("Update failed");
        }
    };

    const deleteProduct = async (id) => {
        try {

            await api.delete(`/api/products/delete/${id}`);

            alert("Product deleted");

            loadProducts();

        } catch (error) {

            console.log(error);
            alert("Delete failed");
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {

            await api.put(
                `/api/orders/status/${id}?status=${status}`
            );

            alert("Order status updated");

            loadRecentOrders();
            loadStats();

        } catch (error) {

            console.log(error);
            alert("Status update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#f8f9ff] p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-[#00236f] mb-8">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <p className="text-gray-500">Total Users</p>

                        <h2 className="text-4xl font-bold text-[#00236f]">
                            {stats.totalUsers}
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <p className="text-gray-500">Total Products</p>

                        <h2 className="text-4xl font-bold text-[#00236f]">
                            {stats.totalProducts}
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-6">
                        <p className="text-gray-500">Total Orders</p>

                        <h2 className="text-4xl font-bold text-[#00236f]">
                            {stats.totalOrders}
                        </h2>
                    </div>

                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Recent Orders
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                            <tr className="border-b">
                                <th className="py-3">Order ID</th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                            </thead>

                            <tbody>

                            {recentOrders.map((order) => (

                                <tr key={order.id} className="border-b">

                                    <td className="py-3">
                                        #{order.id}
                                    </td>

                                    <td>
                                        {order.userEmail || "Unknown"}
                                    </td>

                                    <td>
                                        {order.productName || "No Product"}
                                    </td>

                                    <td>
                                        ₹ {order.price || 0}
                                    </td>

                                    <td>
                                        <select
                                            value={order.status || "PLACED"}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="border rounded-xl px-3 py-2 font-semibold"
                                        >
                                            <option value="PLACED">PLACED</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                        {editingId ? "Update Product" : "Add New Product"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            placeholder="Product Name"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            placeholder="Category"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            placeholder="Description"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            placeholder="Price"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            placeholder="Stock"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                        <input
                            type="text"
                            name="imageUrl"
                            value={product.imageUrl}
                            placeholder="Image URL"
                            onChange={handleChange}
                            className="h-14 px-5 border rounded-2xl outline-none"
                        />

                    </div>

                    <div className="flex gap-4 mt-6">
                        {editingId ? (
                            <>
                                <button
                                    onClick={updateProduct}
                                    className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold"
                                >
                                    Update Product
                                </button>

                                <button
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white px-8 py-4 rounded-2xl font-bold"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={addProduct}
                                className="bg-[#00236f] text-white px-8 py-4 rounded-2xl font-bold"
                            >
                                Add Product
                            </button>
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {products.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl"
                        >

                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="text-2xl font-bold text-[#00236f]">
                                    {item.name}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {item.description}
                                </p>

                                <div className="flex justify-between items-center mt-5">
                                    <span className="text-2xl font-bold">
                                        ₹ {item.price}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        Stock {item.stock}
                                    </span>
                                </div>

                                <button
                                    onClick={() => editProduct(item)}
                                    className="w-full mt-5 bg-yellow-500 text-white py-3 rounded-2xl font-bold"
                                >
                                    Edit Product
                                </button>

                                <button
                                    onClick={() => deleteProduct(item.id)}
                                    className="w-full mt-3 bg-red-600 text-white py-3 rounded-2xl font-bold"
                                >
                                    Delete Product
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Admin;