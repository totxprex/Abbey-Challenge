import { useState, useEffect, useContext } from "react";
import "../styles/index.css";
import "./login.css";
import AppContext from "../context/app-context";
import { popup } from "../vanilla-functions/model";
import AddAUserModal from "../components/signup-user/signup-user";

const Login = function () {
  const [signupModal, setSignupModal] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn, backendServer, setIsLoading, setUsersData, loggedIn } =
    useContext(AppContext);

  useEffect(() => {
    if (email && password) setDisableBtn(false);
    else setDisableBtn(true);
  });

  async function login() {
    setIsLoading(true);

    try {
      const returned = await (
        await fetch(`${backendServer}/auth/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            pass: "pass-66966c874edc2a5271f1737f",
          },
          body: JSON.stringify({ email: email?.toLowerCase(), password: password }),
          credentials: "include",
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      localStorage.setItem("abbeyemail", returned.data.email);
      localStorage.setItem("abbeytoken", returned.data.token);

      const data = await (
        await fetch(`${backendServer}/users/get?email=${returned.data.email}`, {
          credentials: "include",
          headers: {
            token: localStorage.getItem("abbeytoken") || "",
          },
        })
      ).json();

      setUsersData(data.data);

      setIsLoading(false);

      setLoggedIn(true);

      popup(`Welcome back, ${data?.data?.first_name}`);

      document.location.hash = "dashboard";
    } catch (err: any) {
      popup(err.message || "Something went wrong");
      setIsLoading(false);
    }
  }

  async function runAutoLogin() {
    setIsLoading(true);
    try {
      const data = await (
        await fetch(`${backendServer}/users/get?email=${localStorage.getItem("abbeyemail")}`, {
          credentials: "include",
          headers: {
            token: localStorage.getItem("abbeytoken") || "",
          },
        })
      ).json();

      setUsersData(data.data);

      setLoggedIn(true);
      setIsLoading(false);
    } catch (err: any) {
      popup("Login Failed. Please login again...");
      setIsLoading(false);
      setLoggedIn(false);
      localStorage.removeItem("abbeyemail");
      localStorage.removeItem("abbeytoken");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("abbeyemail") && localStorage.getItem("abbeytoken")) runAutoLogin();
    else {
      setLoggedIn(false);
      document.location.hash = "auth";
    }
  }, []);

  if (loggedIn === "none") return;

  return (
    <>
      <div className="login-container">
        <div className="login-container-one">
          <div className="wavy-container">
            <img className="wavy-img" src="/wavy.png" alt="Abbey" />
            <div className="wavy-content">
              <div className="flex-row align-row-left" style={{ gap: 20, width: "50%" }}>
                <img className="wavy-logo" src="/logo.png" alt="Abbey" />
                <p className="big whiteText removemargin" style={{ fontSize: "25px" }}></p>
              </div>
            </div>
          </div>

          <div className="login-cont">
            <p className="vbig boldText removemargin">Abbey Learning System</p>
            <span className="small removemargin">
              Elevate Learning with Our Learning Management System
            </span>

            <input
              className="in login-in"
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value?.toLowerCase())}
              value={email}
            />
            <input
              className="in login-in"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button disabled={disableBtn} onClick={login} className="themeBtn login-btn">
              Sign In
            </button>

            <p className="small">
              Don't have an account?{" "}
              <span onClick={() => setSignupModal(true)} className="cursor small themeText">
                Signup
              </span>
            </p>
          </div>
        </div>
        <div className="login-container-two">
          <img className="login-banner-img" src="/images/v-1.png" alt="Abbey" />
        </div>

        <AddAUserModal display={signupModal} setSignUpUserModal={setSignupModal} />
      </div>
    </>
  );
};

export default Login;
