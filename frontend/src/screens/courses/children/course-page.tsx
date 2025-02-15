import { BsBookFill, BsPeopleFill } from "react-icons/bs";
import "../../../styles/index.css";
import { TCoursesScreenNav } from "../courses";
import "../courses.css";
import { IoMdArrowBack } from "react-icons/io";
import YouTube from "react-youtube";
import { ICourse } from "../../../context/interface";
import { useContext } from "react";
import AppContext from "../../../context/app-context";
import { popup } from "../../../vanilla-functions/model";

type Prop = {
  display: boolean;
  setScreen: React.Dispatch<React.SetStateAction<TCoursesScreenNav>>;
  screen: TCoursesScreenNav;
};

const CoursesDetails = function ({ display, setScreen, screen }: Prop) {
  const { usersData, backendServer, updateUsersData, setIsLoading } = useContext(AppContext);

  async function registerForACourse() {
    try {
      setIsLoading(true);
      const returned = await (
        await fetch(`${backendServer}/courses/register/${usersData?._id}/${screen?.data?._id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            token: localStorage.getItem("abbeytoken") || "",
          },
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      updateUsersData();

      setScreen && setScreen({ screen: "study", data: screen?.data });

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      popup("Course Registration Error");
    }
  }

  if (!display) return;

  return (
    <div className="screen-container">
      <div className="flex-row space-between no-padding" style={{ marginBottom: 15 }}>
        <p
          onClick={() =>
            setScreen({
              screen: "home",
              data: null,
            })
          }
          className="small removemargin cursor"
        >
          <IoMdArrowBack style={{ marginTop: -3 }} size={17} className="cursor" /> &nbsp; Go back
        </p>
      </div>

      <div className="flex-row">
        <div className="flex-row ytube-cont">
          <YouTube
            videoId={
              screen?.data?.resources[0]?.videos[0] +
              `?showinfo=0&enablejsapi=1&origin=http://localhost:3000`
            }
            title={screen?.data?.name}
            loading={"lazy"}
          />
        </div>

        <div className="course-details">
          <div className="flex-row" style={{ justifyContent: "space-between" }}>
            <h4 style={{ width: "50%" }} className="big blackText">
              {screen?.data?.name}
            </h4>
            <div className="flex-row" style={{ width: "40%", gap: 15 }}>
              <div className="a-course-stat">
                <BsPeopleFill /> &nbsp; &nbsp; {screen?.data?.students?.length}
              </div>
              <div className="a-course-stat">
                <BsBookFill /> &nbsp; &nbsp; {screen?.data?.resources?.length}
              </div>

              <button
                onClick={() => {
                  if (!usersData?.courses?.map((e: ICourse) => e?._id)?.includes(screen?.data?._id))
                    return registerForACourse();
                  else setScreen && setScreen({ screen: "study", data: screen?.data });
                }}
                className="themeBtn"
              >
                {usersData?.courses?.map((e: ICourse) => e?._id)?.includes(screen?.data?._id)
                  ? "Continue Course"
                  : "Get Course"}
              </button>
              <span className="small">
                {Number(
                  usersData?.courses_tracker?.find((e) => e.course === screen?.data?._id)?.progress
                ) || "0"}
                % Completion
              </span>
            </div>
          </div>
        </div>

        <div className="course-details">
          <p className="small">{screen?.data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;
