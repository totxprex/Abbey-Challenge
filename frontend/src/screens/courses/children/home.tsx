import { useContext, useEffect, useState } from "react";
import CourseCard from "../../../components/coursecard/coursecard";
import "../../../styles/index.css";
import { TCoursesScreenNav } from "../courses";
import "../courses.css";
import AppContext from "../../../context/app-context";
import { IClass, ICourse } from "../../../context/interface";
import { popup } from "../../../vanilla-functions/model";

type Prop = {
  display: boolean;
  setScreen: React.Dispatch<React.SetStateAction<TCoursesScreenNav>>;
};

type IViewContext = "class" | "course";

const CoursesHome = function ({ display, setScreen }: Prop) {
  const [_allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [allCoursesComp, setAllCoursesComp] = useState([]);
  const [onView, setOnView] = useState<IViewContext>("course");

  const { backendServer, usersData, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    getData();
  }, [usersData, onView]);

  async function getData() {
    try {
      setIsLoading(true);
      const returned = await (
        await fetch(`${backendServer}/${onView === "course" ? "courses" : "classes"}/get`, {
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
        returned?.data?.map((e: ICourse & IClass, i: number) => (
          <CourseCard
            key={i}
            title={e.name || e.title}
            description={e.description}
            isLocked={false}
            available={true}
            onClick={() =>
              setScreen &&
              setScreen({
                screen: "details",
                data: e,
              })
            }
            type={onView}
            raw={e}
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
      <div className="c-blue-intro">
        <div className="c-blue-text">
          <h3 className="big blackText removemargin">What do you want to learn today? 👋</h3>
          <p className="small blackText removemargin">
            Discover courses, track progress, and achieve your learning goals seemlessly!
          </p>
          <p className="small redText boldText advert">Alert: Get 50% Off all courses today!</p>

          <button
            onClick={() => (onView === "class" ? setOnView("course") : setOnView("class"))}
            className="themeBtn whiteBg blackText"
          >
            View {onView === "course" ? "classes" : "courses"} Instead
          </button>
        </div>

        <img className="intro-image" src="/images/dev.png" alt="etap"></img>
      </div>

      <div className="flex-row explore-courses-cont">{allCoursesComp}</div>
    </div>
  );
};

export default CoursesHome;
