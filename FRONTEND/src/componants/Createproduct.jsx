import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

function CreateProduct() {
    const location = useLocation();
    const productData = location.state || {};
    const { _id, email, name, description, category, tags, price, stock, images, edit } = productData;

    let prevImg = [];
    if (images) {
        images.forEach((ele) => prevImg.push(`http://localhost:8080/products-photo/${ele}`));
    }

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        description: "",
        category: "",
        tags: [],
        price: "",
        stock: "",
        images: [],
        previewImg: []
    });

    useEffect(() => {
        if (productData && Object.keys(productData).length > 0) { 
            setFormData(prevState => ({
                ...prevState,
                email,
                name,
                description,
                category,
                tags,
                price,
                stock,
                images,
                previewImg: prevImg
            }));
        }
    }, [productData]); // ✅ Runs only when productData changes

    const handleDeletePrevImg = (index) => {
        let filteredImages = formData.images.filter((_, ind) => ind !== index);
        let filteredPreviewImg = formData.previewImg.filter((_, ind) => ind !== index);
        setFormData(prevState => ({
            ...prevState,
            images: filteredImages,
            previewImg: filteredPreviewImg
        }));
    };

    const handleChange = (e) => {
        if (e.target.name === "tags") {
            let trimmedTags = e.target.value.split(",").map(tag => tag.trim());
            setFormData(prevState => ({ ...prevState, tags: trimmedTags }));
        } else if (e.target.name === "images") {
            const files = Array.from(e.target.files);
            const imgUrls = files.map(file => URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                images: [...prevState.images, ...files],
                previewImg: [...prevState.previewImg, ...imgUrls]
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, description, category, tags, price, stock, images } = formData;

        if (!email || !name || !description || !category || !price || !stock) {
            alert("Please fill in all required fields");
            return;
        }

        const multiPartFormData = new FormData();
        multiPartFormData.append("name", name);
        multiPartFormData.append("description", description);
        multiPartFormData.append("category", category);
        multiPartFormData.append("tags", tags);
        multiPartFormData.append("price", price);
        multiPartFormData.append("stock", stock);
        multiPartFormData.append("email", email);

        if (Array.isArray(images)) {
            images.forEach(image => multiPartFormData.append("images", image));
        }

        try {
            const response = await axios.post("http://localhost:8080/product/create-product", multiPartFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                alert("Product Created Successfully");
                setFormData({
                    email: "",
                    name: "",
                    description: "",
                    category: "",
                    tags: [],
                    price: "",
                    stock: "",
                    images: [],
                    previewImg: []
                });
            }
        } catch (error) {
            console.error("Error", error);
            alert("Product is Not Created");
        }
    };

    const handleEdit = () => {
        console.log(formData);
    };

    let categoryArr = ["Electronic", "Groceries", "Fashion", "Dairy"];

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,technology')" }}>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Product</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-medium text-gray-700">Email</label>
                        <input className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <textarea className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" name="description" value={formData.description} onChange={handleChange} required></textarea>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Category</label>
                        <select className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Choose a category</option>
                            {categoryArr.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Tags (comma-separated)</label>
                        <input className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" type="text" name="tags" value={formData.tags.join(", ")} onChange={handleChange} />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block font-medium text-gray-700">Price</label>
                            <input className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium text-gray-700">Stock</label>
                            <input className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500" type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Upload Photo</label>
                        <input className="hidden" type="file" name="images" id="upload" multiple onChange={handleChange} />
                        <label htmlFor="upload" className="cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-700">
                            <IoIosAddCircleOutline size={24} />
                            <span>Add Images</span>
                        </label>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.previewImg.map((img, index) => (
                            <div key={index}>
                                <IoCloseCircleOutline onClick={() => handleDeletePrevImg(index)} className="relative left-15 cursor-pointer" />
                                <img src={img} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                        {edit ? "Edit" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
