import { Fragment } from "react";
import UserOrderAnalytics from "./UserOrderAnalytics";
import UserStatsCard from "./UserStatsCard";

export default async function UserDashboard() {
  return (
    <Fragment>
      <UserStatsCard />
      <UserOrderAnalytics />
    </Fragment>
  );
}
