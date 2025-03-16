import Pagination from "./Pagination";

export default function Table({ children, data }) {
  return (
    <div className="flex flex-col items-center overflow-x-auto">
      <table className="min-w-full rounded-t-[1.5rem] overflow-hidden">
        {children}
      </table>
      <Pagination data={data}/>
    </div>
  );
}
