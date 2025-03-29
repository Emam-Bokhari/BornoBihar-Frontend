import { Fragment } from "react";
import OverviewStatsCard from "./OverviewStatsCards";
import SalesOverviewChart from "./SalesOverviewChart";

export default function AdminDashboard() {
  return (
    <Fragment>
      <OverviewStatsCard />
      <SalesOverviewChart />
    </Fragment>
  );
}
