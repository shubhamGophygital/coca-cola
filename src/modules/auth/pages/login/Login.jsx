import { useNavigate } from "react-router-dom";
import CustomButton from "../../../common/components/customButton/CustomButton";
import Layout from "../../../common/components/layout/Layout";
import navigationConstants from "../../../../routes/navigationConstants";
import "./Login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTH_META } from "../../redux/authSlice";

const Login = () => {
  const { authToken } = useSelector((state) => state.auth);
  const [userMeta, setUserMeta] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // let TOKEN = getCookie("token");
  //
  useEffect(() => {
    if (authToken) {
      return navigate(navigationConstants.HOME);
    }
  }, [authToken]);

  function handleChange(event) {
    errorMsg && setErrorMsg(null);
    setUserMeta((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function onLogin() {
    // const user = {
    //   username: userMeta.email,
    //   password: userMeta.password,
    // };
    // login({
    //   userMeta: user,
    //   onSuccess: (response) => {
    //     setCookie("token", response?.data?.jwtToken, 74 * 60 * 60 * 1000);
    //     dispatch(
    //       SET_AUTH_META({
    //         authMeta: { username: userMeta.email, id: 0, status: true },
    //         authToken: `${response?.data?.jwtToken}`,
    //       })
    //     );
    //     navigate(navigationConstants.HOME);
    //   },
    //   onError: () => {
    //     // setErrorMsg("Bad credentials");
    //     setErrorMsg("Something went wrong. Please try again.");
    //   },
    // });
    dispatch(
      SET_AUTH_META({
        authMeta: { username: userMeta.email, id: 0, status: true },
        authToken: `abcd1234`,
      })
    );
    navigate(navigationConstants.HOME);
  }

  return (
    <Layout>
      <div className="login_container">
        <div className="header">
          <p className="sub_header">Welcome to</p>
          <h1 className="main_header">Coca-Cola - MUSIC COMPOSER</h1>
          <div className="login_wrapper">
            <div className="login_content">
              <h2>Login</h2>
              <div className="input_container">
                <p className="input_label">Email Address*:</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address here"
                  value={userMeta.email}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_container">
                <p className="input_label">Password*:</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password here"
                  value={userMeta.password}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMsg && <p className="error_msg">{errorMsg}</p>}
              <div className="btn_container">
                <CustomButton
                  type="filled"
                  disabled={!userMeta.email || !userMeta.password}
                  style={{ width: "250px" }}
                  onClick={onLogin}
                >
                  login
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
