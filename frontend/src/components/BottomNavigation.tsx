import { useLocation, Link } from "react-router-dom";
import {
    RiHomeLine, RiHomeFill,
    RiShoppingCartLine, RiShoppingCartFill,
    RiGroupLine, RiGroupFill,
    RiShoppingBag3Line, RiShoppingBag3Fill,
    RiPagesLine, RiPagesFill,
    RiLogoutBoxRLine
} from "react-icons/ri"
import type { IconType } from "react-icons";
import useLogoutUser from "../hooks/useLogoutUser";

interface NavItem {
    href: string;
    inactiveIcon: IconType;
    activeIcon: IconType;
    label: string;
}

const BottomNavigation = () => {
    const location = useLocation();

    const { isLoading, logoutUser } = useLogoutUser();

    const navItems: NavItem[] = [
        { href: "/", inactiveIcon: RiHomeLine, activeIcon: RiHomeFill, label: "Dashboard" },
        { href: "/products", inactiveIcon: RiShoppingCartLine, activeIcon: RiShoppingCartFill, label: "Products" },
        { href: "/customers", inactiveIcon: RiGroupLine, activeIcon: RiGroupFill, label: "Customers" },
        { href: "/sales", inactiveIcon: RiShoppingBag3Line, activeIcon: RiShoppingBag3Fill, label: "Sales" },
        { href: "/reports", inactiveIcon: RiPagesLine, activeIcon: RiPagesFill, label: "Reports" },
    ];

    const disallowedRoutes = ["/auth"];
    const isDisallowed = disallowedRoutes.includes(location.pathname);

    if (isDisallowed) return null;

    return (
        <>
            <div className="fixed top-0 right-0 flex items-center justify-center bg-white border-l border-b border-gray-200 p-2 sm:p-3 z-40 rounded-bl-lg">
                <button
                    disabled={isLoading}
                    onClick={logoutUser}
                    className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
                >
                    {isLoading ? (
                        <div className="size-4.5 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                    ) : <RiLogoutBoxRLine className="text-lg" />}
                </button>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40">
                <div className="grid grid-cols-5 gap-2 sm:max-w-md w-full mx-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = isActive ? item.activeIcon : item.inactiveIcon;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`flex flex-col items-center justify-center gap-0.5 py-[3.5px] px-1 rounded-xl transition-colors ${isActive
                                    ? "text-gray-900 bg-gray-50"
                                    : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                <Icon className="text-lg" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BottomNavigation