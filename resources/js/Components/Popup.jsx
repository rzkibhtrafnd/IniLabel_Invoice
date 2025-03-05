export default function Popup({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      {children}
    </div>
  );
}
