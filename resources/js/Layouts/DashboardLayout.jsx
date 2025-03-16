import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import Header from "../Components/Header";

export default function DashboardLayout({ children, className }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash?.message) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: flash.message.includes("berhasil") ? "success" : "error",
        title: flash.message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: "swal2-noanimation swal2-slide-in-right",
        },
        hideClass: {
          popup: "swal2-noanimation swal2-slide-out-right",
        },
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }, [flash]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Header />
      <main className={`px-4 py-6 md:p-10 flex flex-col bg-[#F9FBFD] flex-auto gap-4 ${className || ''}`}>
        {children}
      </main>
    </div>
  );
}
