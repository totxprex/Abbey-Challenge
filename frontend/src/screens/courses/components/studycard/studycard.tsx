import React, { useContext, useEffect, useState } from "react";
import { ICourseTopic, IUsers } from "../../../../context/interface";
import "../../../../styles/index.css";
import "./studycard.css";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import AppContext from "../../../../context/app-context";

type Prop = {
  setActiveTopic: React.Dispatch<React.SetStateAction<ICourseTopic>>;
  data: ICourseTopic;
  courseID: string;
  topics: ICourseTopic[];
  activeTopicIndex: number;
};

export const StudyCard = ({ data, courseID, setActiveTopic, topics, activeTopicIndex }: Prop) => {
  const [status, setStatus] = useState<undefined | string>();
  const { usersData } = useContext(AppContext);

  useEffect(() => {
    getStatus();
  }, [activeTopicIndex, usersData]);

  async function getStatus() {
    setStatus(
      Boolean(
        usersData?.courses_tracker
          ?.find((e: any) => e.course === courseID)
          ?.topics_resolved?.includes(data?._id)
      )
        ? "yes"
        : "no"
    );
  }

  function findIndex() {
    let index;

    topics?.forEach((e: any, i: number) => {
      if (e?._id === data?._id) index = i;
    });

    return index;
  }

  return (
    <div
      onClick={() => setActiveTopic(data)}
      className={`flex-row your-study-cont cursor no-hover ${activeTopicIndex === findIndex() && "active-topic"}`}
    >
      {status === "yes" ? (
        <FaRegCheckCircle color="#B4D5FF" />
      ) : status === "no" ? (
        <FaRegCircle color="#B4D5FF" />
      ) : (
        ""
      )}
      <div className="flex-column your-study-cont-right">
        <p className="small blackText removemargin">
          {data?.title?.length > 70 ? `${data?.title?.slice(0, 70) + "..."}` : data?.title}
        </p>
        <div className="flex-row align-row-left your-study-cont-under">
          <p className="small removemargin">
            {status === "yes" ? "Completed" : status === "no" ? "Pending" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
