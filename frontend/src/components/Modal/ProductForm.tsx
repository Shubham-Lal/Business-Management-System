import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import useAddProduct from "../../hooks/product/useAddProduct";
import type { Product } from "../../store/productStore";

interface ProductFormProps {
    toggleModal: (state?: boolean) => void;
    mode: "add" | "update";
    initialData?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ toggleModal, mode, initialData }) => {
    const { isAdding, addProduct } = useAddProduct();

    const [formData, setFormData] = useState({
        name: (mode === "update" && initialData) ? initialData.name : "",
        description: (mode === "update" && initialData) ? initialData.description : "",
        price: (mode === "update" && initialData) ? initialData.price : 0,
        stock: (mode === "update" && initialData) ? initialData.stock : 0,
        category: (mode === "update" && initialData) ? initialData.category : "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, description, price, stock, category } = formData;

        if (!name) return toast.error("Name is required");
        if (price < 1) return toast.error("Price is required");
        if (stock < 0) return toast.error("Stock is required");
        if (!category) return toast.error("Category is required");

        console.log(formData)

        let ok = false;
        if (mode === "add") {
            ok = await addProduct(name, Number(price), stock, category, description);
        }
        else if (mode === "update" && initialData?._id) {

        }

        if (ok) toggleModal(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 grid place-items-center z-50"
            onClick={() => toggleModal(false)}
        >
            <form
                onSubmit={handleSubmit}
                className="relative bg-white rounded-xl shadow-lg w-[calc(100%-32px)] sm:max-w-lg max-h-[100svh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="px-6 pt-6 text-lg font-semibold text-gray-800 mb-4">
                    {mode === "add" ? "Add Product" : "Update Product"}
                </h2>

                <div className="mb-4 px-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock
                        </label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={formData.stock <= 0}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        stock: Math.max(0, prev.stock - 1),
                                    }))
                                }
                                className="size-[38px] shrink-0 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-md text-lg font-bold cursor-pointer disabled:cursor-not-allowed"
                            >
                                <RiSubtractLine />
                            </button>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full text-center px-2 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        stock: prev.stock + 1,
                                    }))
                                }
                                className="size-[38px] shrink-0 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold hover:bg-gray-300 cursor-pointer"
                            >
                                <RiAddLine />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            list="categories"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <datalist id="categories">
                            {predefinedCategories.map((cat) => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="py-4 px-6 grid grid-cols-2 gap-3 bg-gray-50">
                    <button
                        type="button"
                        onClick={() => toggleModal(false)}
                        className="w-full py-2 px-4 font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        disabled={mode === "add" ? isAdding : false}
                        className={`
                            relative w-full flex items-center justify-center py-2 px-4 font-semibold text-white rounded-md transition 
                            ${mode === "add"
                                ? isAdding
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                : false
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                            }
                        `}
                    >
                        {(mode === "add" && isAdding) || (mode === "update" && false) ? (
                            <div className="absolute right-2 size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                        ) : null}
                        {mode === "add" ? "Save" : "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}

const predefinedCategories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty",
    "Toys",
    "Groceries",
];

export default ProductForm