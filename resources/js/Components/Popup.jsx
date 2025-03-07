export default function Popup({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        {children}
      </div>
    </div>
  );
}
