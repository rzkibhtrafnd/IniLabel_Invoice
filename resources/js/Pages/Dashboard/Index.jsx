import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import { Head } from "@inertiajs/react";
import InvoiceChart from "../../Components/InvoiceChart";
import { FaUserGroup } from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { HiMiniReceiptRefund } from "react-icons/hi2";

function DashboardOverview({ title, number, icon: Icon, color }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-white shadow shadow-[6px_6px_54px_rgba(0,0,0,0.05)] rounded-2xl">
      <div className="flex flex-col gap-1">
        <p className="text-[#20222470] font-semibold text-base">{title}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
      <div style={{ backgroundColor: `${color}21` }} className="p-3 rounded-xl">
        <Icon color={color} size={32} />
      </div>
    </div>
  );
}

export default function Index() {
  
  const overviewItems = [
    { title: "Total Konsumen", number: "40.000", icon: FaUserGroup, color: "#8280FF", },
    { title: "Total Order", number: "10293", icon: IoCubeSharp, color: "#FEC53D", },
    { title: "Total Invoice", number: "$89,000", icon: FaChartLine, color: "#4AD991", },
    { title: "Total Receipt", number: "2040", icon: HiMiniReceiptRefund, color: "#FF9066", },
  ];

  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <Heading title="SELAMAT DATANG DI DASHBOARD ADMIN" subTitle="Dashboard"/>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        {overviewItems.map(({ title, number, icon, color }, index) => (
          <DashboardOverview key={index} title={title} number={number} icon={icon} color={color} />
        ))}
      </div>
      <div className="bg-white rounded-xl shadow shadow-[6px_6px_54px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between p-[25px] align-center">
          <h2 className="text-[#202224] text-2xl font-semibold leading-9">Invoice Details</h2>
          <select name="month" id="month" className="border bg-[#FCFDFD] border-[#22272B66] rounded-md p-2 text-[#22272B66]">
            <option value="january" className="text-[#22272B66]">January</option>
            <option value="february" className="text-[#22272B66]">February</option>
            <option value="march" className="text-[#22272B66]">March</option>
          </select>
        </div>
        <InvoiceChart />
      </div>
    </DashboardLayout>
  );
}
