import { useState } from "react";
import "../../styles/index.css";
import "./course-analytics.css";
import AnalyticsAnalytics from "./children/analytics";
import AnalyticsHome from "./children/home";

export type AnalyticsScreenOptions = "home" | "analytics";
export type TAnalyticsScreen = {
  screen: AnalyticsScreenOptions;
  data: any;
};

const CoursesAnalytics = function ({ display }: { display: boolean }) {
  const [screen, setScreen] = useState<TAnalyticsScreen>({
    screen: "home",
    data: null,
  });

  if (!display) return;

  return (
    <div>
      <AnalyticsHome setScreen={setScreen} display={screen.screen === "home" && true} />
      <AnalyticsAnalytics
        screen={screen}
        setScreen={setScreen}
        display={screen.screen === "analytics" && true}
      />
    </div>
  );
};

export default CoursesAnalytics;
