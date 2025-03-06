import Header from "../Components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Header />
      <main className="p-10 flex flex-col bg-[#F9FBFD] flex-auto gap-4">{children}</main>
    </div>
  );
}
