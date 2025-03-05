import DashboardLayout from "@/Layouts/DashboardLayout";
import Heading from "../../Components/Heading";
import { Head } from "@inertiajs/react";

export default function Index() {
  return (
    <DashboardLayout>
      <Head title="Dashboard" />
      <Heading title="SELAMAT DATANG DI DASHBOARD ADMIN" subTitle="Dashboard"/>
    </DashboardLayout>
  );
}
