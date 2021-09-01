import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import ErrorDisplayMessage from "../ErrorDisplayMessage";
import SuccessMessage from "../SuccessMessage";
import { updateExpenseAction } from "../../redux/slices/expenses/expenseAction";
import { updateIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../DisabledButton";
import redirectUser from "../../utils/redirect";
import navigate from "../../utils/navigate";

//Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});
const EditContent = ({ location: { state } }) => {
  const { data } = state;
  //dispatch action
  //history
  const history = useHistory();
  const dispatch = useDispatch();

  //expense
  const expenses = useSelector(state => state?.expenses);
  const { isExpUpdated, expLoading, expAppErr, expServerErr, isExpCreated } =
    expenses;
  //income
  const income = useSelector(state => state?.income);
  const { isIncUpdated, incLoading, incAppErr, incServerErr } = income;
  //initialize form
  const formik = useFormik({
    initialValues: {
      title: data?.title,
      description: data?.description,
      amount: data?.amount,
    },
    onSubmit: values => {
      const transactionData = {
        id: data?._id,
        ...values,
      };

      if (data?.type === "income") {
        console.log(transactionData);
        return dispatch(updateIncomeAction(transactionData));
      }
      if (data?.type === "expense") {
        return dispatch(updateExpenseAction(transactionData));
      }
    },
    validationSchema: formSchema,
  });

  //redirect
  useEffect(() => {
    if (isExpUpdated) {
      navigate(history, "user-profile-expenses", undefined);
    }
    if (isIncUpdated) {
      navigate(history, "user-profile-income", undefined);
    }
  }, [isExpUpdated, isIncUpdated]);
  return (
    <section className="py-5 bg-secondary vh-100">
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
                <span className="text-muted">
                  {data?.type === "income" ? " Income" : " Expense"}
                </span>
                <h2 className="mb-4 fw-light">
                  {data?.type === "income"
                    ? " Update Income"
                    : " Update Expense"}
                </h2>
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
                {expLoading ? (
                  <DisabledButton />
                ) : (
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                    Add
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
