export default function Status({ children }) {
  const statusStyles = {
    Draft: "bg-gray-100 text-gray-500",
    "Dibayar sebagian": "bg-yellow-100 text-yellow-600",
    Lunas: "bg-green-100 text-green-500",
    Dibatalkan: "bg-red-100 text-red-500",
  };

  return (
    <div
      className={`m-auto px-4 py-1 rounded-full text-xs w-fit ${
        statusStyles[children] || "bg-gray-200 text-gray-600"
      }`}
    >
      {children}
    </div>
  );
}
