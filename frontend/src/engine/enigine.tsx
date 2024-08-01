import { useState, useImperativeHandle, forwardRef, useEffect, useContext } from "react";
import "../styles/index.css";
import "./engine.css";
import EngineTopBar from "../components/engine-top-bar/engine-top-bar";
import EngineBottomBar from "../components/engine-bottom-bar/engine-bottom-bar";
import Dashboard from "../screens/dashboard/dashboard";
import AppContext from "../context/app-context";
import Settings from "../screens/settings/settings";
import Courses from "../screens/courses/courses";
import CoursesAnalytics from "../screens/analytics/course-analytics";

const Engine = forwardRef(function (
  { sideNav, loggedIn: _loggerIn }: { sideNav: any; loggedIn: boolean | string },
  ref
) {
  const [onView, setOnView] = useState(
    document?.location?.hash?.toLowerCase()?.replace("#", "")?.trim() || "dashboard"
  );

  const { usersData, getCurrentHash, loggedIn } = useContext(AppContext);

  useEffect(() => {
    if (!usersData?.email) return;

    //force default route by access
    if (usersData?.role !== "admin" && getCurrentHash() === "course-analytics") {
      setOnView("dashboard");
      document.location.hash = "dashboard";
    }
  }, [loggedIn, usersData]);

  useImperativeHandle(ref, () => {
    return {
      changeScreen(screen: string) {
        setOnView(screen?.toLowerCase());
        sideNav?.setActiveNav(screen?.toLowerCase());
        document.location.hash = screen?.toLowerCase();
      },
    };
  });

  return (
    <div className="engine-container">
      <EngineTopBar />
      <Dashboard display={onView === "dashboard" && true} />
      <Courses display={onView === "courses" && true} />
      <CoursesAnalytics display={onView === "course-analytics" && true} />
      <Settings display={onView === "settings" && true} />
      <EngineBottomBar />
    </div>
  );
});

export default Engine;
