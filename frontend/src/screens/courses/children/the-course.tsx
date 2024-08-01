import "../../../styles/index.css";
import { TCoursesScreenNav } from "../courses";
import "../courses.css";
import { IoMdArrowBack } from "react-icons/io";
import YouTube from "react-youtube";
import { ReactNode, useContext, useEffect, useState } from "react";
import { StudyCard } from "../components/studycard/studycard";
import AppContext from "../../../context/app-context";
import { popup } from "../../../vanilla-functions/model";
import { ICourse, ICourseTopic } from "../../../context/interface";

type Prop = {
  display: boolean;
  setScreen: React.Dispatch<React.SetStateAction<TCoursesScreenNav>>;
  screen: TCoursesScreenNav;
};

const StudyPageCourseDetails = function ({ display, setScreen, screen }: Prop) {
  const { backendServer, setIsLoading, usersData, updateUsersData } = useContext(AppContext);

  const [topicComps, setTopicComps] = useState<ReactNode[]>();

  const [theCourse, setTheCourse] = useState<ICourse>({} as ICourse);

  const [activeTopic, setActiveTopic] = useState<ICourseTopic>({} as ICourseTopic);

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  useEffect(() => {
    if (screen?.screen !== "study") return;
    getCourseDetails();
  }, [screen?.screen, screen?.data]);

  async function fetchCourse() {
    if (screen?.screen !== "study") return;
    try {
      const returned = await (
        await fetch(`${backendServer}/courses/get?id=${screen?.data?._id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            token: localStorage.getItem("etaptoken") || "",
          },
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      return returned;
    } catch (err) {
      popup("Something went wrong");
    }
  }

  useEffect(() => {
    theCourse?.resources?.forEach((e: any, i: number) => {
      if (e?._id === activeTopic?._id) {
        setActiveTopicIndex(i);
        setTopicComps(
          theCourse?.resources?.map((e: ICourseTopic, inn: number) => (
            <StudyCard
              key={i + inn}
              data={e}
              courseID={screen?.data?._id}
              setActiveTopic={setActiveTopic}
              topics={theCourse?.resources}
              activeTopicIndex={i}
            />
          ))
        );
      }
    });
  }, [activeTopic, theCourse?.resources]);

  async function getCourseDetails() {
    try {
      setIsLoading(true);

      const returned = await fetchCourse();

      setTheCourse(returned?.data);

      setTopicComps(
        returned?.data?.resources?.map((e: ICourseTopic, i: number) => (
          <StudyCard
            key={i}
            data={e}
            courseID={screen?.data?._id}
            setActiveTopic={setActiveTopic}
            topics={returned?.data?.resources}
            activeTopicIndex={activeTopicIndex}
          />
        ))
      );

      setActiveTopic(returned?.data?.resources[0]);
      setActiveTopicIndex(0);

      await updateUsersData();

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      popup("Error fetching course, try again later...");
    }
  }

  async function markATopicAsResolved(topicID: string) {
    try {
      if (
        usersData?.courses_tracker
          ?.find((e: any) => e.course === screen?.data?._id)
          ?.topics_resolved?.includes(activeTopic?._id)
      ) {
        setActiveTopic(theCourse?.resources[activeTopicIndex + 1]);
        return;
      }

      setIsLoading(true);
      await (
        await fetch(`${backendServer}/courses/progress`, {
          method: "PUT",
          credentials: "include",
          headers: {
            token: localStorage.getItem("etaptoken") || "",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            studentID: usersData?._id,
            courseID: screen?.data?._id,
            topicIn: topicID,
          }),
        })
      ).json();

      await updateUsersData();

      if (activeTopicIndex !== theCourse?.resources?.length - 1)
        setActiveTopic(theCourse?.resources[activeTopicIndex + 1]);
      else getCourseDetails();

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      if (activeTopicIndex !== theCourse?.resources?.length - 1)
        setActiveTopic(theCourse?.resources[activeTopicIndex + 1]);
      else getCourseDetails();
    }
  }

  if (!display || !activeTopic) return <></>;

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

      <div className="flex-row study-grid ">
        <div className="study-grid-left">
          <div className="flex-row ytube-cont">
            <YouTube
              videoId={
                activeTopic?.videos &&
                activeTopic?.videos[0] + `?showinfo=0&enablejsapi=1&origin=http://localhost:3000`
              }
              title={screen?.data?.name}
              loading={"lazy"}
            />
          </div>

          <div className="s-course-details">
            <div className="flex-row" style={{ justifyContent: "space-between" }}>
              <h5 style={{ width: "50%" }} className="small blackText boldText">
                {activeTopic?.title}
              </h5>
              <div className="flex-row" style={{ width: "50%", justifyContent: "flex-end" }}>
                {activeTopicIndex !== 0 && (
                  <button
                    onClick={async () => {
                      await updateUsersData();
                      setActiveTopic(theCourse?.resources[activeTopicIndex - 1]);
                    }}
                    className="themeBtn whiteBg blackText"
                  >
                    Previous Topic
                  </button>
                )}

                {activeTopicIndex !== theCourse?.resources?.length - 1 && (
                  <button
                    onClick={() => markATopicAsResolved(activeTopic?._id)}
                    className="themeBtn"
                  >
                    Next Topic
                  </button>
                )}

                {activeTopicIndex === theCourse?.resources?.length - 1 &&
                  !usersData?.courses_tracker
                    ?.find((e: any) => e.course === screen?.data?._id)
                    ?.topics_resolved?.includes(activeTopic?._id) && (
                    <button
                      onClick={() => markATopicAsResolved(activeTopic?._id)}
                      className="themeBtn"
                    >
                      Complete Topic
                    </button>
                  )}
              </div>
            </div>
          </div>

          <div className="s-course-details">
            <p className="small">{activeTopic?.content}</p>
            <p className="small">
              External Links:{" "}
              {activeTopic?.external_links?.map((e: string, i: number) => (
                <a key={i} href={e}>
                  {e}
                </a>
              ))}
            </p>
          </div>
        </div>

        <div className="study-grid-right">
          <div className="flex-row d-time-table-title">
            <p className="small boldText">Topics/Resources</p>
          </div>

          <div className="flex-column">{topicComps}</div>
        </div>
      </div>
    </div>
  );
};

export default StudyPageCourseDetails;
