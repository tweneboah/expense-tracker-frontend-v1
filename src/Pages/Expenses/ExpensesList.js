import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentDetails from "../../components/ContentDetails/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading/Loading";

import AppPagination from "../../components/Pagination/AppPagination";
import { fetchExpensesAction } from "../../redux/slices/expenses/expenseAction";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import calTransaction from "../../utils/accStatistics";

const ExpensesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpensesAction(page));
  }, [page]);
  //expenses
  const expenses = useSelector(state => state.expenses);
  const { expLoading, expenseList, expAppErr, expServerErr } = expenses;
  console.log({ expLoading, expenseList, expAppErr, expServerErr });
  const totalExp = calTransaction(expenseList?.docs ? expenseList?.docs : []);

  //user Expenses
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);
  const user = useSelector(state => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;

  return (
    <>
      {expLoading ? (
        <LoadingComponent />
      ) : expAppErr || expServerErr ? (
        <ErrorDisplayMessage>
          {" "}
          {expServerErr}
          {expAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <hr />
                <h6 className="mb-0">
                  Total Records: {expenseList?.docs?.length}
                </h6>
                <h6 className="mb-0">Sum: {totalExp?.sumTotal}</h6>
                <h6 className="mb-0">Average: {totalExp?.avg}</h6>
                <h6 className="mb-0">Maximum: {totalExp?.max}</h6>

                <h6 className="mb-0">Minimum: {totalExp?.min}</h6>
                <hr />
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Withdrawed By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {expenseList?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) : (
                      expenseList?.docs?.map(exp => (
                        <ContentDetails item={exp} key={exp?._id} />
                      ))
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {expenseList?.docs?.length > 1 && (
              <AppPagination
                setPage={setPage}
                items={expenseList?.totalPages}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ExpensesList;
