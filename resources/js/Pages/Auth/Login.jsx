import { Head, useForm } from "@inertiajs/react";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import Button from "../../Components/Buttons";
import Input from "../../Components/Input";
import { useEffect } from "react";

export default function Login({ flash }) {
  const { data, setData, post, processing } = useForm({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData(e.target.id, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    post('/login', data);
  }

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
    <div className="flex min-h-screen items-center justify-center">
      <Head title="Login" />
      <div className="w-full gap-4 flex flex-col bg-[#F6F6F6] border border-[#5882C1] max-w-md p-10 rounded-lg">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto"
          width={180} height={180}
        />
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-base font-medium mb-1">
              Email
            </label>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              value={data.email}
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium mb-1">
              Password
            </label>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Password"
            />
          </div>

          <Button
            type="submit"
            disabled={processing}
            className={`w-full flex justify-center text-center rounded-lg transition duration-300 
            ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-[#003465] hover:bg-[#00234a]"}`}
          >
            {processing ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}
