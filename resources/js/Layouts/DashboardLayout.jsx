import Header from "../Components/Header";

export default function DashboardLayout({ children, className }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Header />
      <main className={`px-4 py-6 md:p-10 flex flex-col bg-[#F9FBFD] flex-auto gap-4 ${className ? className : ''}`}>{children}</main>
    </div>
  );
}
