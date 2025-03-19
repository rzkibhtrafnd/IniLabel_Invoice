import { useState, useEffect } from "react";
import HeaderPopup from "./HeaderPopup";

export default function Popup({ children, title, closePopup }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(closePopup, 300);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100 bg-[#B5BDFF50]" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white w-full max-w-[500px] p-6 flex flex-col gap-4 rounded-[1.2rem] shadow-lg transition-all duration-300 ease-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <HeaderPopup closePopup={handleClose}>{title}</HeaderPopup>
        {typeof children === "function" ? children({ handleClose }) : children}
      </div>
    </div>
  );
}
