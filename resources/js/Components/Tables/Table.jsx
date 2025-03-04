export default function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-t-[2rem] overflow-hidden">
        {children}
      </table>
    </div>
  );
}
