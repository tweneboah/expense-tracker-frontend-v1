import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardData from "../../components/Dashboard/DashboardData";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, []);
  const statistics = useSelector(state => state.statistics);
  const { loading, appErr, serverErr, stats } = statistics;
  console.log(stats);
  const exp = stats?.expensesStats[0];
  const inc = stats?.incomeStats[0];
  console.log(stats);
  return (
    <>
      <h1>NET: {stats?.profit}</h1>
      <DashboardData
        numOfTransExp={exp?.totalRecords}
        avgExp={exp?.averageExp}
        totalExp={exp?.totalExp}
        minExp={exp?.minExp}
        maxExp={exp?.maxExp}
        numOfTransInc={inc?.totalRecords}
        avgInc={inc?.averageInc}
        totalInc={inc?.totalInc}
        minInc={inc?.minInc}
        maxInc={inc?.maxInc}
      />
    </>
  );
};

export default Dashboard;
