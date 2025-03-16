export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-t-[1.5rem] overflow-hidden">
        {children}
      </table>
    </div>
  );
}
