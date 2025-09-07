import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { RiGroupFill, RiPagesFill, RiShoppingBag3Fill, RiShoppingCartFill } from "react-icons/ri";

export default function Home() {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-white p-4 sm:p-6 shadow-md">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            {getGreeting()}, {user?.name.split(" ")[0] ?? "Guest"} 👋
          </h1>
          <p className="text-sm md:text-base font-[500] opacity-90">Welcome back to your dashboard</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
          <Link
            to="/products"
            className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden"
          >
            <div className="size-full flex items-center justify-center flex-grow bg-white">
              <RiShoppingCartFill size={20} className="text-[#1cb5e0]" />
            </div>
            <p className="w-full px-2 pt-1 pb-1.5 text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
              Add<br />Product
            </p>
          </Link>
          <Link
            to="/customers"
            className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden"
          >
            <div className="size-full flex items-center justify-center flex-grow bg-white">
              <RiGroupFill size={20} className="text-[#1cb5e0]" />
            </div>
            <p className="w-full px-2 pt-1 pb-1.5 text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
              Add<br />Customer
            </p>
          </Link>
          <Link
            to="/sales"
            className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden"
          >
            <div className="size-full flex items-center justify-center flex-grow bg-white">
              <RiShoppingBag3Fill size={20} className="text-[#1cb5e0]" />
            </div>
            <p className="w-full px-2 pt-1 pb-1.5 text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
              Create<br />Sale
            </p>
          </Link>
          <Link
            to="/reports"
            className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden"
          >
            <div className="size-full flex items-center justify-center flex-grow bg-white">
              <RiPagesFill size={20} className="text-[#1cb5e0]" />
            </div>
            <p className="w-full px-2 pt-1 pb-1.5 text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
              View<br />Reports
            </p>
          </Link>
        </div>


      </div>
    </>
  )
}