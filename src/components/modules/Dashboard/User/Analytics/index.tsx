import { Fragment } from "react";
import UserOrderAnalytics from "./UserOrderAnalytics";
import UserStatsCard from "./UserStatsCard";
import { getOrderHistory } from "@/services/Order";

export default async function UserDashboard() {
  const response = await getOrderHistory();
  const orderData = response?.data || [];

  return (
    <Fragment>
      <UserStatsCard />
      <UserOrderAnalytics orderData={orderData} />
    </Fragment>
  );
}
