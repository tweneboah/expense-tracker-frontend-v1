import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";

import { updateUserAction } from "../../../redux/slices/users/usersSlices";
import navigate from "../../../utils/navigate";

//Form validation
const formSchema = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().required("email is required"),
});

const UpdateProfile = ({ location: { state: data } }) => {
  //dispatch action
  const dispatch = useDispatch();

  //users
  const user = useSelector(state => state?.users);
  const { userLoading, userAppErr, userServerErr, isUpdated } = user;

  const history = useHistory();
  //initialize form
  const formik = useFormik({
    initialValues: {
      firstname: data?.data?.firstname,
      lastname: data?.data?.lastname,
      email: data?.data?.email,
    },
    onSubmit: values => {
      const user = {
        ...values,
        id: data?.data?.id,
      };
      dispatch(updateUserAction(user));
      // dispatch();
    },
    validationSchema: formSchema,
  });

  if (isUpdated) {
    navigate(history, "profile", undefined);
  }
  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Update Profile</span>
                  <h4 className="mb-4 fw-light">
                    Hi, {data?.data?.firstname} Do you want to update your
                    profile
                  </h4>

                  {/* Display income Err */}
                  {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button type="submit" class="btn btn-warning">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
