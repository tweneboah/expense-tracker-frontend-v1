import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import DisabledButton from "../../../components/DisabledButton";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import SuccessMessage from "../../../components/SuccessMessage";

//Form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ history }) => {
  //dispatch action
  const dispatch = useDispatch();

  //store state

  const users = useSelector(state => state?.users);

  const { userAuth, userLoading, userAppErr, userServerErr, isLogin } = users;
  //initialize form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  //Redirect
  setTimeout(() => {
    if (isLogin) history.push("/profile");
  }, 3000);
  return (
    <section className="position-relative py-5 overflow-hidden">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-primary w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Lorem ipsum dolor sit amet consectutar domor at elis
              </h2>
              <p className="mb-0 text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan
                aliquet orci.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <span className="text-muted">Sign In</span>
              <h3 className="fw-bold mb-5">Login to your account</h3>
              {/* Display Err */}
              {userAppErr || userServerErr ? (
                <div class="alert alert-danger" role="alert">
                  {userAppErr || userServerErr}
                </div>
              ) : null}
              <form onSubmit={formik.handleSubmit} _lpchecked="1">
                <input
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                  onChange={formik.handleChange("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail address"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onBlur={formik.handleBlur("password")}
                  onChange={formik.handleChange("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>

                {userLoading ? (
                  <DisabledButton />
                ) : (
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary py-2 w-100 mb-4"
                    >
                      Login
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
