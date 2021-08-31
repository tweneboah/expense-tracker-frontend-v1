import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";

import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
import DataGrap from "./DataGrap";

const DashboardData = ({
  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransExp,
  avgInc,
  totalInc,
  minInc,
  maxInc,
  numOfTransInc,
}) => {
  const dispatch = useDispatch();
  //format curr
  const formattedAmt = useCurrencyFormatter("USD", totalExp);
  //format date
  return (
    <section class="py-6">
      <div class="container">
        {/* Grpah */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <DataGrap income={totalInc} expenses={totalExp} />
        </div>
        <div class="row">
          <div class="col-12 col-md-6 mb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                {/* Expenses Start */}
                <span class="badge bg-light text-primary">Expenses</span>
              </div>
              <h1 class="mb-4">{formattedAmt}</h1>
              <p class="mb-0">
                <span>Number of Transactions</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{minExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{maxExp}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transactions</span>
                <span class="text-danger ms-1">
                  <span>{avgExp}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-6">
            <div class="p-8 border rounded-2">
              <div class="d-flex mb-6 align-items-start justify-content-between">
                <span
                  class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>

                {/* Income Start */}
                <span class="badge bg-primary-light text-primary">
                  Income Transactions
                </span>
              </div>
              <h1 class="mb-4">{totalInc}</h1>

              <p class="mb-0">
                <span>Number of Transactions</span>
                <span class="text-danger ms-1">
                  <span>{numOfTransInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Minimum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{minInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Maximum Transactions</span>
                <span class="text-danger ms-1">
                  <span>{maxInc}</span>
                </span>
              </p>

              <p class="mb-0">
                <span>Average Transactions</span>
                <span class="text-danger ms-1">
                  <span>{avgInc}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardData;
