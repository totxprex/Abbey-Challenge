import React, { useState, useContext, useEffect } from "react";
import "../styles/index.css";
import "./side-nav.css";
import AppContext from "../context/app-context";
import { BsLockFill } from "react-icons/bs";
import { popup } from "../vanilla-functions/model";

type Prop = {
  setSideNav: React.Dispatch<React.SetStateAction<any>>;
  loggedIn: boolean;
};

const SideNav = function ({ setSideNav, loggedIn }: Prop) {
  const [activeNav, setActiveNav] = useState(
    document?.location?.hash?.toLowerCase()?.replace("#", "")?.trim() || "dashboard"
  );

  const { changeScreen, setIsLoading, usersData, getCurrentHash } = useContext(AppContext);

  useEffect(() => {
    if (!usersData?.email) return;

    //force default route by access
    if (usersData?.role !== "admin" && getCurrentHash() === "course-analytics")
      setActiveNav("dashboard");
  }, [loggedIn, usersData, getCurrentHash]);

  useEffect(() => {
    setSideNav({ setActiveNav });
  }, [loggedIn, setSideNav]);

  return (
    <div className="side-nav-container">
      <div className="inner-conatiner">
        <div className="side-nav-intro flex-row">
          <img src="/logo.png" alt="Etap-Logo" className="etap-logo-side-nav" />
        </div>
        <div className="nav-items-container">
          <button
            onClick={() => {
              setActiveNav("dashboard");
              changeScreen("dashboard");
              document.location.hash = "dashboard";
            }}
            className={`each-nav media-nav ${activeNav === "dashboard" && "each-nav-active"}`}
          >
            <img src="/nav-icons/dashboard.png" alt="nav-icon" style={{ width: 20 }} />
            <p className="small whiteText removemargin media-nav-text">Dashboard</p>
          </button>

          <button
            onClick={() => {
              setActiveNav("courses");
              changeScreen("courses");
              document.location.hash = "courses";
            }}
            className={`each-nav media-nav ${activeNav === "courses" && "each-nav-active"}`}
          >
            <img src="/nav-icons/courses.png" alt="nav-icon" style={{ width: 20 }} />
            <p className="small whiteText removemargin media-nav-text">Courses</p>
          </button>

          <button
            onClick={() => {
              if (usersData?.role !== "admin")
                return popup("Please login as admin to access this page");

              setActiveNav("course-analytics");
              changeScreen("course-analytics");
              document.location.hash = "course-analytics";
            }}
            className={`each-nav media-nav ${activeNav === "course-analytics" && "each-nav-active"}`}
          >
            <img src="/nav-icons/course-analytics.png" alt="nav-icon" style={{ width: 20 }} />
            <p className="small whiteText removemargin media-nav-text">
              Course Analytics &nbsp;{" "}
              {usersData?.role !== "admin" ? <BsLockFill style={{ marginTop: -2 }} /> : ""}
            </p>
          </button>

          <button
            onClick={() => {
              setActiveNav("settings");
              changeScreen("settings");
              document.location.hash = "settings";
            }}
            className={`each-nav media-nav ${activeNav === "settings" && "each-nav-active"}`}
          >
            <img src="/nav-icons/settings.png" alt="nav-icon" style={{ width: 20 }} />
            <p className="small whiteText removemargin media-nav-text">Settings</p>
          </button>

          <button
            onClick={() => {
              setIsLoading(true);
              localStorage.removeItem("etapusername");
              localStorage.removeItem("etapemail");
              localStorage.removeItem("etaptoken");
              setTimeout(() => {
                document.location.reload();
              }, 1500);
            }}
            className={`each-nav`}
          >
            <img src="/nav-icons/log-out.png" alt="nav-icon" style={{ width: 20 }} />
            <p className="small whiteText removemargin media-nav-text">Log Out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
