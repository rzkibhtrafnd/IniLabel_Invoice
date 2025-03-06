import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import { Head } from "@inertiajs/react";
import InvoiceChart from "../../Components/InvoiceChart";
import { RxDashboard } from "react-icons/rx";

function DashboardOverview({ title, number, icon: Icon, color }) {
  return (
    <div className="flex flex-1 flex-shrink-0 basis-24 items-center gap-4 p-4 bg-white shadow rounded-lg">
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
      <div style={{ backgroundColor: `${color}21` }} className="p-3 rounded-full">
        <Icon color={color} size={32} />
      </div>
    </div>
  );
}

export default function Index() {
  
  const overviewItems = [
    { title: "Total Konsumen", number: "40.000", icon: RxDashboard, color: "#8280FF", },
    { title: "Total Konsumen", number: "40.000", icon: RxDashboard, color: "#8280FF", },
    { title: "Total Konsumen", number: "40.000", icon: RxDashboard, color: "#8280FF", },
    { title: "Total Konsumen", number: "40.000", icon: RxDashboard, color: "#8280FF", },
  ];

  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <Heading title="SELAMAT DATANG DI DASHBOARD ADMIN" subTitle="Dashboard"/>
      <div className="flex flex-wrap gap-4">
        {overviewItems.map(({ title, number, icon, color }, index) => (
          <DashboardOverview key={index} title={title} number={number} icon={icon} color={color} />
        ))}
      </div>
      <div className="bg-white">
      <InvoiceChart />
      </div>
    </DashboardLayout>
  );
}
