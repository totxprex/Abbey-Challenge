import React, { useContext } from "react";
import AppContext from "../../context/app-context";
import { ICourse } from "../../context/interface";
import "../../styles/index.css";
import "./dashboard.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { TCoursesScreenNav } from "../courses/courses";

export const AYourCourse = ({
  data,
  setCourseScreen,
}: {
  data: ICourse;
  setCourseScreen: React.Dispatch<React.SetStateAction<TCoursesScreenNav>>;
}) => {
  const { usersData, changeScreen } = useContext(AppContext);

  return (
    <div
      className="flex-row your-course-cont cursor no-hover"
      onClick={() => {
        console.log("in");
        changeScreen("courses");
        setCourseScreen({
          screen: "details",
          data: data,
        });
      }}
    >
      <FaRegCheckCircle color="#B4D5FF" />
      <div className="flex-column your-course-cont-right">
        <p className="small blackText removemargin">{data.name}</p>
        <div className="flex-row align-row-left your-course-cont-under">
          <p className="small removemargin">
            {Number(
              usersData?.courses_tracker?.find((e: any) => e.course === data?._id)?.progress
            ) < 100
              ? "In Progress"
              : "Completed"}
          </p>
          <p className="small removemargin">
            {new Intl.DateTimeFormat("en-gb", {
              dateStyle: "long",
            }).format(new Date(data.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};
