import {
    RiHomeLine, RiHomeFill,
    RiShoppingCartLine, RiShoppingCartFill,
    RiGroupLine, RiGroupFill,
    RiShoppingBag3Line, RiShoppingBag3Fill,
    RiPagesLine, RiPagesFill
} from "react-icons/ri"
import type { IconType } from "react-icons";

interface NavItem {
    href: string;
    inactiveIcon: IconType;
    activeIcon: IconType;
    label: string;
}

export const navigationData: NavItem[] = [
    { href: "/", inactiveIcon: RiHomeLine, activeIcon: RiHomeFill, label: "Dashboard" },
    { href: "/products", inactiveIcon: RiShoppingCartLine, activeIcon: RiShoppingCartFill, label: "Products" },
    { href: "/customers", inactiveIcon: RiGroupLine, activeIcon: RiGroupFill, label: "Customers" },
    { href: "/sales", inactiveIcon: RiShoppingBag3Line, activeIcon: RiShoppingBag3Fill, label: "Sales" },
    { href: "/reports", inactiveIcon: RiPagesLine, activeIcon: RiPagesFill, label: "Reports" },
];