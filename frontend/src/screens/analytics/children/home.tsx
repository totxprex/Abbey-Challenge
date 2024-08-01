import { useContext, useEffect, useState } from "react";
import "../../../styles/index.css";
import AnalyticsCourseCard from "../components/coursecard/coursecard";
import { TAnalyticsScreen } from "../course-analytics";
import "../course-analytics.css";
import AppContext from "../../../context/app-context";
import { popup } from "../../../vanilla-functions/model";
import { ICourse } from "../../../context/interface";

type Prop = {
  display: boolean;
  setScreen: React.Dispatch<React.SetStateAction<TAnalyticsScreen>>;
};

const AnalyticsHome = function ({ display, setScreen }: Prop) {
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [allCoursesComp, setAllCoursesComp] = useState([]);

  const { backendServer, usersData, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, [usersData]);

  async function getData() {
    try {
      setIsLoading(true);
      const returned = await (
        await fetch(`${backendServer}/courses/get`, {
          method: "GET",
          credentials: "include",
          headers: {
            token: localStorage.getItem("etaptoken") || "",
          },
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      setAllCourses(returned?.data);

      setAllCoursesComp(
        returned?.data?.map((e: ICourse, i: number) => (
          <AnalyticsCourseCard
            key={i}
            imageSrc="/images/course-placeholder.png"
            title={e.name}
            description={e.description}
            length={e.resources.length}
            isLocked={false}
            available={true}
            onClick={() =>
              setScreen &&
              setScreen({
                screen: "analytics",
                data: e?._id,
              })
            }
          />
        ))
      );

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      popup("Error fetching Etap Data");
    }
  }

  if (!display) return;

  return (
    <div className="screen-container">
      <h4 className="big" style={{ margin: 30 }}>
        Browse Courses (Select any to view rankings of learners for the course/subject)
      </h4>
      <div className="flex-row anylitics-courses-cont">{allCoursesComp}</div>
    </div>
  );
};

export default AnalyticsHome;
