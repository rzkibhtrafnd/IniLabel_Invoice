export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex font-semibold items-center cursor-pointer gap-1 px-4 py-2 ${className ? className : 'bg-primary'} text-white rounded`}
    >
      {children}
    </button>
  );
}