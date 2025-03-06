import { usePage, Link } from "@inertiajs/react";
import { FaBars } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { IoBagRemoveOutline, IoLogOutOutline } from "react-icons/io5";
import { PiInvoice } from "react-icons/pi";
import { TfiReceipt } from "react-icons/tfi";
import logo from "../../assets/logo.png";

function MenuItem({ href, icon: Icon, label, isActive }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex text-xl gap-3 py-2 px-4 rounded-md items-center hover:bg-primary hover:text-white ${
          isActive ? "bg-primary text-white" : ""
        }`}
      >
      <Icon size={30} />
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
    <header className="relative flex justify-between p-4 pt-10 bg-white shadow-md">
      <h1 className="md:hidden text-lg font-bold">IniLabel</h1>
      <button className="md:hidden text-2xl">
        <FaBars />
      </button>

      <nav className="hidden md:flex flex-col gap-6 absolute md:static">
        <img
          src={logo}
          alt="Logo"
          className="px-4"
          width={180} height={180}
        />
        <ul className="flex flex-col gap-2">
          {menuItems.map(({ href, icon, label, isShow }) =>
            isShow !== false ? (
              <MenuItem key={href} href={href} icon={icon} label={label} isActive={component.includes(label)} />
            ) : null
          )}
          <li>
            <Link
              href="/logout"
              method="post"
              className="flex w-full text-xl cursor-pointer gap-3 py-2 px-4 rounded-md items-center hover:bg-primary hover:text-white"
            >
              <IoLogOutOutline size={30} />
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
