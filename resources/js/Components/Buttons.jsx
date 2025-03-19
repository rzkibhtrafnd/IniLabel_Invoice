export default function Button({ children, onClick, className, disabled, type }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type ? type : 'button'}
      className={`flex font-semibold items-center cursor-pointer gap-1 px-4 py-2 rounded ${className ? className : 'bg-primary text-white'}`}
    >
      {children}
    </button>
  );
}