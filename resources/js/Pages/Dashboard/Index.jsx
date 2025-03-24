import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import { Head } from "@inertiajs/react";
import InvoiceChart from "../../Components/InvoiceChart";
import { FaUserGroup } from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import formatToRupiah from "../../utils/formatToRupiah";

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

export default function Index({ overviewData, initialChartData }) {
  const [chartData, setChartData] = useState(initialChartData);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const overviewItems = [
    { title: "Total Konsumen", number: overviewData.totalCustomers, icon: FaUserGroup, color: "#8280FF" },
    { title: "Total Order", number: overviewData.totalOrders, icon: IoCubeSharp, color: "#FEC53D" },
    { title: "Total Invoice", number: formatToRupiah(overviewData.totalInvoices), icon: FaChartLine, color: "#4AD991" },
    { title: "Total Receipt", number: overviewData.totalReceipts, icon: HiMiniReceiptRefund, color: "#FF9066" },
  ];

  const loadChartData = async (month) => {
    try {
      const response = await fetch(`/api/chart-data?month=${month}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };

  useEffect(() => {
    loadChartData(selectedMonth);
  }, [selectedMonth]);

  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <Heading title="SELAMAT DATANG DI DASHBOARD ADMIN" subTitle="Dashboard"/>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        {overviewItems.map(({ title, number, icon, color }, index) => (
          <DashboardOverview key={index} title={title} number={number} icon={icon} color={color} />
        ))}
      </div>
      <div className="bg-white rounded-xl shadow shadow-[6px_6px_54px_rgba(0,0,0,0.05)] mt-6">
        <div className="flex justify-between p-[25px] items-center">
          <h2 className="text-[#202224] text-2xl font-semibold leading-9">Invoice Details</h2>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="border bg-[#FCFDFD] border-[#22272B66] rounded-md p-2 text-[#22272B66]"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <InvoiceChart data={chartData} />
      </div>
    </DashboardLayout>
  );
}
