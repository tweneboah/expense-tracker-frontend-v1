import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";

import ErrorDisplayMessage from "../ErrorDisplayMessage";
import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
import NewRecordWelcomePage from "./NewRecordWelcomePage";
import { addNewIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../DisabledButton";
import redirectUser from "../../utils/redirect";

//Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const NewRecord = ({ history }) => {
  const [isExp, setIsExp] = useState(false);
  const [isInc, setIsInc] = useState(false);

  const isExpHandler = () => {
    setIsExp(true);
    setIsInc(false);
    alert.show("Are you sure you want to add Expense?");
  };
  const alert = useAlert();
  const isIncHandler = () => {
    setIsExp(false);
    setIsInc(true);
    alert.show("Want to add income?");
  };
  //dispatch action
  const dispatch = useDispatch();

  //expense
  const expenses = useSelector(state => state?.expenses);
  const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;
  //income
  const income = useSelector(state => state?.income);
  const { incLoading, incAppErr, incServerErr, isIncCreated } = income;
  //initialize form
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: values => {
      return isExp
        ? dispatch(addNewExpAction(values))
        : isInc
        ? dispatch(addNewIncomeAction(values))
        : null;
    },
    validationSchema: formSchema,
  });

  //Redirect
  useEffect(() => {
    if (isExpCreated) {
      redirectUser(history, "expenses");
    }
    if (isIncCreated) {
      redirectUser(history, "incomes");
    }
  }, [isExpCreated, isIncCreated]);
  return (
    <>
      {isInc ? (
        <section className="py-5 bg-success vh-100">
          <div className="container text-center">
            <a className="d-inline-block mb-5">
              <img
                className="img-fluid"
                src={moneySVG}
                alt="SVGeXPENSES"
                width="200"
              />
            </a>
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Expense</span>
                    <h2 className="mb-4 fw-light">Record New Expense</h2>
                    {/* Display income Err */}
                    {expServerErr || expAppErr || incServerErr || incAppErr ? (
                      <div className="alert alert-danger" role="alert">
                        {expServerErr} {expAppErr} {incServerErr} {incAppErr}
                      </div>
                    ) : null}
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.title}
                        onBlur={formik.handleBlur("title")}
                        onChange={formik.handleChange("title")}
                        className="form-control"
                        type="text"
                        placeholder="Enter Title"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.description}
                        onBlur={formik.handleBlur("description")}
                        onChange={formik.handleChange("description")}
                        className="form-control"
                        type="text"
                        placeholder="Enter Description"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.amount}
                        onBlur={formik.handleBlur("amount")}
                        onChange={formik.handleChange("amount")}
                        className="form-control"
                        type="number"
                        placeholder="Enter Amount"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.amount && formik.errors.amount}
                    </div>
                    {/* Switch */}
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        onClick={isExpHandler}
                        type="button"
                        class="btn btn-warning"
                      >
                        Expense
                      </button>
                      <button
                        onClick={isIncHandler}
                        type="button"
                        class="btn btn-success"
                      >
                        Income
                      </button>
                    </div>
                    {isExp && (
                      <button
                        type="submit"
                        className="btn btn-danger mb-4 w-100"
                      >
                        Record Expense
                      </button>
                    )}

                    {isInc && (
                      <button
                        type="submit"
                        className="btn btn-primary mb-4 w-100"
                      >
                        Record Income
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : isExp ? (
        <section className="py-5 bg-success vh-100">
          <div className="container text-center">
            <a className="d-inline-block mb-5">
              <img
                className="img-fluid"
                src={moneySVG}
                alt="SVGeXPENSES"
                width="200"
              />
            </a>
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Expense</span>
                    <h2 className="mb-4 fw-light">Record New Expense</h2>

                    {/* Display Err */}
                    {expAppErr || expServerErr ? (
                      <ErrorDisplayMessage
                        error={{ appErr: expAppErr, serverErr: expServerErr }}
                      />
                    ) : null}
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.title}
                        onBlur={formik.handleBlur("title")}
                        onChange={formik.handleChange("title")}
                        className="form-control"
                        type="text"
                        placeholder="Enter Title"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.description}
                        onBlur={formik.handleBlur("description")}
                        onChange={formik.handleChange("description")}
                        className="form-control"
                        type="text"
                        placeholder="Enter Description"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.amount}
                        onBlur={formik.handleBlur("amount")}
                        onChange={formik.handleChange("amount")}
                        className="form-control"
                        type="number"
                        placeholder="Enter Amount"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.amount && formik.errors.amount}
                    </div>
                    {/* Switch */}
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        onClick={isExpHandler}
                        type="button"
                        class="btn btn-warning"
                      >
                        Expense
                      </button>
                      <button
                        onClick={isIncHandler}
                        type="button"
                        class="btn btn-success"
                      >
                        Income
                      </button>
                    </div>
                    {isExp && (
                      <>
                        {expLoading ? (
                          <DisabledButton />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-danger mb-4 w-100"
                          >
                            Record Expense
                          </button>
                        )}
                      </>
                    )}

                    {isInc && (
                      <>
                        {incLoading ? (
                          <DisabledButton />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary mb-4 w-100"
                          >
                            Record Income
                          </button>
                        )}
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NewRecordWelcomePage
          isExpHandler={isExpHandler}
          isIncHandler={isIncHandler}
        />
      )}
    </>
  );
};

export default NewRecord;
