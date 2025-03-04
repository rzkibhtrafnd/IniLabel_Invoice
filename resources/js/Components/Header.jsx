import { useForm, usePage, Link } from "@inertiajs/react";
import { FaBars } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { IoBagRemoveOutline, IoLogOutOutline } from "react-icons/io5";
import { PiInvoice } from "react-icons/pi";
import { TfiReceipt } from "react-icons/tfi";

function MenuItem({ href, icon: Icon, label, isActive }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex gap-3 py-2 px-4 rounded-md items-center hover:bg-primary hover:text-white ${
          isActive ? "bg-primary text-white" : ""
        }`}
      >
        <Icon className="text-xl" />
        {label}
      </Link>
    </li>
  );
}

export default function Header() {
  const { canManageUser } = usePage().props;
  const { component } = usePage();

  const menuItems = [
    { href: "/dashboard", icon: RxDashboard, label: "Dashboard", isShow: true },
    { href: "/users", icon: FaRegCircleUser, label: "User", isShow: canManageUser },
    { href: "/customers", icon: GoPeople, label: "Customer", isShow: true },
    { href: "/products", icon: IoBagRemoveOutline, label: "Produk", isShow: true },
    { href: "/invoices", icon: PiInvoice, label: "Invoice", isShow: true },
    { href: "/receipts", icon: TfiReceipt, label: "Receipt", isShow: true },
  ];

  return (
    <header className="relative flex justify-between p-4 bg-white shadow-md">
      <h1 className="md:hidden text-lg font-bold">IniLabel</h1>
      <button className="md:hidden text-2xl">
        <FaBars />
      </button>

      <nav className="hidden md:flex flex-col absolute md:static">
        <ul className="flex flex-col gap-3">
          {menuItems.map(({ href, icon, label, isShow }) =>
            isShow !== false ? (
              <MenuItem key={href} href={href} icon={icon} label={label} isActive={component.includes(label)} />
            ) : null
          )}
          <li>
            <Link
              href="/logout"
              method="post"
              className="flex w-full cursor-pointer gap-3 py-2 px-4 rounded-md items-center hover:bg-primary hover:text-white"
            >
              <IoLogOutOutline className="text-xl" />
              Logout
            </Link>
          </li>
        </ul>
        <p className="text-center mt-auto text-sm">
          &copy;2025 IniLabel
        </p>
      </nav>
    </header>
  );
}
