import { IoClose } from "react-icons/io5";

export default function HeaderPopup({ children, closePopup }) {
  return (
    <div className="flex align-center justify-between">
      <h2 className="font-bold text-2xl">{children}</h2>
      <button onClick={closePopup} className="p-1 cursor-pointer rounded bg-[#EB5757]">
        <IoClose size={24} color="#fff" />
      </button>
    </div>
  );
}