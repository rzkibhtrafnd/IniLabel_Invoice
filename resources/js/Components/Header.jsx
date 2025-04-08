import { useState, useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { FaBars } from "react-icons/fa";
import {
  RxDashboard
} from "react-icons/rx";
import {
  IoBagRemoveOutline,
  IoLogOutOutline,
  IoSettingsOutline
} from "react-icons/io5";
import {
  HiOutlineUserGroup,
  HiOutlineUserCircle
} from "react-icons/hi2";
import { PiInvoice } from "react-icons/pi";
import { TfiReceipt } from "react-icons/tfi";

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
  const { canManageUser, setting } = usePage().props;
  const { component, url } = usePage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [url]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest("aside")) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const { post, processing } = useForm();

  function handleLogout(e) {
    e.preventDefault();
    post("/logout");
  }

  const menuItems = [
    { href: "/dashboard", icon: RxDashboard, label: "Dashboard", isShow: true, componentName: "Dashboard" },
    { href: "/users", icon: HiOutlineUserCircle, label: "User", isShow: canManageUser, componentName: "Users" },
    { href: "/customers", icon: HiOutlineUserGroup, label: "Customer", isShow: true, componentName: "Customers" },
    { href: "/products", icon: IoBagRemoveOutline, label: "Produk", isShow: canManageUser, componentName: "Products" },
    { href: "/invoices", icon: PiInvoice, label: "Invoice", isShow: true, componentName: "Invoices" },
    { href: "/receipts", icon: TfiReceipt, label: "Receipt", isShow: true, componentName: "Receipts" },
    { href: "/settings", icon: IoSettingsOutline, label: "Setting", isShow: canManageUser, componentName: "Settings" },
  ];

  const currentYear = new Date().getFullYear();
  const logoUrl = setting?.logo ? `/storage/${setting.logo}` : null;
  const companyName = setting?.company_name || "Perusahaan";

  return (
    <header className="sticky md:h-[calc(100vh-1rem)] p-4 top-0 left-0 flex bg-white">
      <button onClick={toggleMenu} className="md:hidden text-[#0569A0] cursor-pointer">
        <FaBars size={24} />
      </button>

      <aside
        className={`fixed md:static w-full bg-[#ffffff50] top-0 transition-all duration-300 ${
          isOpen ? "left-0" : "left-[-100%]"
        } md:left-0`}
      >
        <nav className="flex flex-col gap-8 w-fit bg-white h-[calc(100vh)] p-[1rem]">
          {logoUrl && <img src={logoUrl} alt="Logo" className="px-4" width={180} height={180} />}
          <ul className="flex flex-col gap-2">
            {menuItems.map(({ href, icon, label, isShow, componentName }) =>
              isShow ? (
                <MenuItem
                  key={href}
                  href={href}
                  icon={icon}
                  label={label}
                  isActive={component.includes(componentName)}
                />
              ) : null
            )}
            <li>
              <Link
                as="button"
                type="button"
                onClick={handleLogout}
                disabled={processing}
                className="flex w-full text-xl cursor-pointer gap-3 py-2 px-4 rounded-md items-center hover:bg-primary hover:text-white"
              >
                <IoLogOutOutline size={30} />
                Logout
              </Link>
            </li>
          </ul>
          <p className="text-center mt-auto text-sm pb-4">
            &copy;{currentYear} {companyName}
          </p>
        </nav>
      </aside>
    </header>
  );
}
