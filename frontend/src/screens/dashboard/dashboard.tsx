import { useContext, useState } from "react";
import "../../styles/index.css";
import "./dashboard.css";
import AppContext from "../../context/app-context.ts";
import TabStatsCard from "../../components/card/tabStatCard/TabStatsCard.tsx";
import { AiOutlineCalendar } from "react-icons/ai";
import { ATimeTable } from "./a-timetable.tsx";
import { AYourCourse } from "./a-your-course.tsx";
import CoursesDropdown from "./filter-dorpdown.tsx";
import { averagePercentageRate } from "../../utils/index.ts";
import { IClass, ICourse } from "../../context/interface.ts";

const Dashboard = function ({ display }: { display?: boolean }) {
  const [activeCoursesFilter, setActiveCoursesFilter] = useState<string>("All");
  const { changeScreen, usersData, storedContext } = useContext(AppContext);

  const goToExploreCourses = () => changeScreen("courses");

  const generateCourses = (filter: string, courses: ICourse[]) => {
    if (filter === "Pending") {
      return courses
        ?.filter((e: ICourse) => {
          return (
            Number(usersData?.courses_tracker?.find((el: any) => el.course === e._id)?.progress) <
            100
          );
        })
        ?.map((e: ICourse, i: number) => (
          <AYourCourse setCourseScreen={storedContext?.setCourseScreen} data={e} key={i} />
        ));
    } else if (filter === "Completed") {
      return courses
        ?.filter((e: ICourse) => {
          return (
            Number(usersData?.courses_tracker?.find((el: any) => el.course === e._id)?.progress) ===
            100
          );
        })
        ?.map((e: ICourse, i: number) => (
          <AYourCourse setCourseScreen={storedContext?.setCourseScreen} data={e} key={i} />
        ));
    } else
      return [...courses]?.map((e: ICourse, i: number) => (
        <AYourCourse setCourseScreen={storedContext?.setCourseScreen} data={e} key={i} />
      ));
  };

  if (!display) return <></>;

  return (
    <div className="screen-container">
      <div className="dashboard-grid flex-row">
        <div className="dashboard-grid-left">
          <div className="d-blue-intro">
            <div className="d-blue-text">
              <h3 className="big blackText boldText removemargin">
                Welcome Back, {usersData?.first_name}!
              </h3>
              <p className="small blackText removemargin">
                You've learnt{" "}
                <span className="boldText">
                  {averagePercentageRate(
                    usersData?.courses_tracker?.map((e: any) => e.progress) || []
                  )}
                  %
                </span>{" "}
                of all your courses so far.
              </p>
              <p className="small blackText removemargin">
                {averagePercentageRate(
                  usersData?.courses_tracker?.map((e: any) => e.progress) || []
                ) > 50 && "Keep it up and"}{" "}
                Improve your progress.
              </p>
            </div>

            <img className="intro-image" src="/images/office.png" alt="etap"></img>
          </div>

          <div className="flex-row">
            <TabStatsCard
              key={0}
              title={"Courses"}
              count={usersData.courses.length}
              imageSrc={"/images/courses.png"}
              customBottonAction={goToExploreCourses}
              customBottonText={"Explore Courses"}
            />
            <TabStatsCard
              key={1}
              title={"Classes"}
              count={usersData.classes.length}
              imageSrc={"/images/classes.png"}
            />
          </div>

          <div className="d-time-table">
            <div className="flex-row d-time-table-title">
              <p className="small boldText">
                Timetable (Classes){" "}
                <span>
                  <AiOutlineCalendar color="#006cff" />
                </span>
              </p>
              <p className="small boldText">
                {new Intl.DateTimeFormat("en-gb", {
                  dateStyle: "long",
                }).format(new Date(Date.now()))}
              </p>
            </div>

            <div className="flex-column">
              {usersData?.classes?.length === 0 && <p className="small">No Classes Yet</p>}
              {usersData?.classes
                ?.map((e: IClass) => e.meetings)
                ?.flatMap((e: any) => e)
                ?.map((e: any, i: number) => <ATimeTable data={e} key={i} />)}
            </div>
          </div>
        </div>

        <div className="dashboard-grid-right">
          <div className="flex-row d-time-table-title">
            <p className="small boldText">Your Courses</p>
            <div className="small cursor boldText">
              <CoursesDropdown
                activeCourseFilter={activeCoursesFilter}
                setActiveCourseFilter={setActiveCoursesFilter}
              />
            </div>
          </div>

          <div className="flex-column">
            {usersData?.courses?.length === 0 && <p className="small">No Courses Yet</p>}
            {generateCourses(activeCoursesFilter, usersData?.courses)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
