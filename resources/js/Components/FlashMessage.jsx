import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function FlashMessage() {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash?.message) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: flash.message.includes("Success") ? "success" : "error",
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

  return null;
}
