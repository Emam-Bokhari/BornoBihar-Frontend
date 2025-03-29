import { Fragment } from "react";
import OverviewStatsCard from "./OverviewStatsCards";
import SalesOverviewChart from "./SalesOverviewChart";
import { getAllOrders } from "@/services/Order";

export default async function AdminDashboard() {
  const { data: orderData } = await getAllOrders();
  return (
    <Fragment>
      <OverviewStatsCard />
      <SalesOverviewChart orderData={orderData} />
    </Fragment>
  );
}
