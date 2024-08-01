import { useContext, useEffect, useState } from "react";
import "../../styles/index.css";
import "./courses.css";
import CoursesHome from "./children/home";
import CoursesDetails from "./children/course-page";
import StudyPageCourseDetails from "./children/the-course";
import AppContext from "../../context/app-context";

export type CoursesScreenOptions = "home" | "details" | "study";
export type TCoursesScreenNav = {
  screen: CoursesScreenOptions;
  data: any;
};

const Courses = function ({ display }: { display: boolean }) {
  const { setStoredContext, storedContext } = useContext(AppContext);

  const [screen, setScreen] = useState<TCoursesScreenNav>({
    screen: "home",
    data: null,
  });

  useEffect(() => {
    setStoredContext({ ...storedContext, setCourseScreen: setScreen });
  }, [setScreen]);

  if (!display) return;

  return (
    <div>
      <CoursesHome setScreen={setScreen} display={screen.screen === "home" && true} />
      <CoursesDetails
        screen={screen}
        setScreen={setScreen}
        display={screen.screen === "details" && true}
      />
      <StudyPageCourseDetails
        screen={screen}
        setScreen={setScreen}
        display={screen.screen === "study" && true}
      />
    </div>
  );
};

export default Courses;
