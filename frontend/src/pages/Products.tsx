import { useState, useEffect } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import useGetProducts from "../hooks/product/useGetProducts";
import useProductStore from "../store/productStore";
import ProductForm from "../components/Modal/ProductForm";

export default function Products() {
    const { isLoading, getProducts } = useGetProducts();

    const { products } = useProductStore();

    const [isFormOpen, setAddOpen] = useState(false);
    const [editProductId, setEditProductId] = useState<string | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const toggleFormModal = (state?: boolean) => {
        const newState = state ?? !isFormOpen;
        setAddOpen(newState);
        if (!newState) setEditProductId(null);
        document.body.style.overflow = newState ? "hidden" : "";
    };

    const handleSelect = (_id: string) => {
        setSelected((prev) =>
            prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
        );
    };

    const filteredProducts = products.filter((p) =>
        [p._id, p.name, p.description, p.price, p.stock, p.category]
            .some((field) =>
                String(field ?? "").toLowerCase().includes(search.toLowerCase())
            )
    );

    useEffect(() => {
        if (!products.length) getProducts();
    }, [products.length, getProducts]);

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-white p-4 sm:p-6 shadow-md">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold line-clamp-1">Products 👥</h1>
                    <p className="text-sm md:text-base font-[500] opacity-90">
                        All your Products will be listed here
                    </p>
                </div>
            </div>

            <div className="p-4 sm:p-6 pb-[76px] space-y-4 sm:space-y-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
                    <button
                        onClick={() => toggleFormModal(true)}
                        className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-xs transition rounded-xl overflow-hidden cursor-pointer"
                    >
                        <div className="size-full flex items-center justify-center flex-grow bg-white">
                            <RiAddBoxLine size={20} className="text-[#1cb5e0]" />
                        </div>
                        <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                            Add<br />Product
                        </p>
                    </button>
                    {selected.length > 0 && (
                        <>

                        </>
                    )}
                </div>

                {isLoading ? (
                    <div className="mx-auto size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                ) : (
                    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-xs">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by ID, name, price, stock, category, or description"
                            className="w-full bg-white px-3 py-2 text-sm shadow-xs outline-none"
                        />
                        <div className="overflow-hidden overflow-x-auto overscroll-x-none">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {filteredProducts.length > 0 && (
                                            <th className="p-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.length === filteredProducts.length && filteredProducts.length > 0}
                                                    onChange={(e) => setSelected(e.target.checked ? filteredProducts.map(p => p._id) : [])}
                                                />
                                            </th>
                                        )}
                                        <th className="text-start font-semibold p-2">Name</th>
                                        <th className="text-start font-semibold p-2">Price</th>
                                        <th className="text-start font-semibold p-2">Stock</th>
                                        <th className="text-start font-semibold p-2">Category</th>
                                        <th className={`${filteredProducts.length > 0 ? "min-w-[200px]" : ""} text-start font-semibold p-2`}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product, index) => (
                                            <tr
                                                key={index}
                                                className={`text-gray-700 text-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                            >
                                                <td className="py-1 px-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(product._id)}
                                                        onChange={() => handleSelect(product._id)}
                                                    />
                                                </td>
                                                <td className="py-1 px-2 text-start whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                                <td className="py-1 px-2 text-start">{product.price}</td>
                                                <td className="py-1 px-2 text-start">{product.stock}</td>
                                                <td className="py-1 px-2 text-start">{product.category}</td>
                                                <td className="py-1 px-2 text-start line-clamp-1">
                                                    {product.description}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="text-gray-700 text-center bg-white">
                                            <td colSpan={5} className="py-4 text-center font-medium">
                                                {products.length === 0 ? (
                                                    "No products added yet..."
                                                ) : filteredProducts.length === 0 ? (
                                                    "Product not found"
                                                ) : ""}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <ProductForm
                    toggleModal={toggleFormModal}
                    mode={editProductId ? "update" : "add"}
                    initialData={editProductId ? products.find(p => p._id === editProductId) : undefined}
                />
            )}
        </>
    )
}