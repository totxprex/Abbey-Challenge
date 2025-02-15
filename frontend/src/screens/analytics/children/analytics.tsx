import React, { useState, useEffect, useContext } from "react";
import "../../../styles/index.css";
import "../course-analytics.css";
import AppContext from "../../../context/app-context";
import { popup } from "../../../vanilla-functions/model";
import { AnalyticsTable } from "../../../components/course-analytics-table/course-analytics-table";
import { BsPrinter } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { TAnalyticsScreen } from "../course-analytics";
import { IoMdArrowBack } from "react-icons/io";
import { ICourseRanker } from "../../../context/interface";

type Prop = {
  display: boolean;
  setScreen: React.Dispatch<React.SetStateAction<TAnalyticsScreen>>;
  screen: TAnalyticsScreen;
};

const AnalyticsAnalytics = function ({ display, setScreen, screen }: Prop) {
  const [page, setPage] = useState(0);
  const [csvData, setcsvData] = useState<any[]>([]);
  const [allCourseAnalyticsData, setallCourseAnalyticsData] = useState<ICourseRanker[]>(
    [] as ICourseRanker[]
  );

  const { backendServer, usersData, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    getData();

    return () => setallCourseAnalyticsData([]);
  }, [usersData, screen.data]);

  async function getData() {
    if (!screen?.data) return;
    setPage(0);
    try {
      setIsLoading(true);
      const returned = await (
        await fetch(`${backendServer}/courses/ranking/${screen.data}`, {
          method: "GET",
          credentials: "include",
          headers: {
            token: localStorage.getItem("abbeytoken") || "",
          },
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      setallCourseAnalyticsData([...returned?.data]);

      setIsLoading(false);

      workCSV(returned?.data);
    } catch (err: any) {
      setIsLoading(false);
      popup("Error fetching Data");
    }
  }

  function workCSV(data: ICourseRanker[]) {
    setcsvData([
      ["First Name", "Last Name", "Email", "Joined", "Progress (%)", "Topics Done"],
      ...data?.map(({ userData, progress, topics_resolved }) => {
        return [
          userData?.first_name,
          usersData?.last_name,
          usersData?.email,
          usersData?.createdAt,
          progress,
          topics_resolved.length,
        ];
      }),
    ]);
  }

  if (!display) return;

  return (
    <div className="screen-container">
      <div className="abbey-stat-container">
        <div className="flex-row space-between no-padding" style={{ margin: 20 }}>
          <p
            onClick={() =>
              setScreen({
                screen: "home",
                data: null,
              })
            }
            className="small cursor removemargin"
          >
            <IoMdArrowBack style={{ marginTop: -3 }} size={17} className="cursor" /> &nbsp; Go back
          </p>
        </div>
      </div>
      <div className="e-table-container">
        <div
          style={{
            marginBottom: 15,
            width: "100%",
            gap: "1rem",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <CSVLink className="cursor small csv-link" filename={`Analytics Data`} data={csvData}>
            <BsPrinter title="Print CSV" size={20} />
          </CSVLink>

          <FiRefreshCcw
            className="cursor"
            title="Refresh Data"
            size={20}
            onClick={() => getData()}
          />
        </div>
        <AnalyticsTable
          page={page}
          setPage={setPage}
          data={allCourseAnalyticsData}
          setScreen={setScreen}
        />
      </div>
    </div>
  );
};

export default AnalyticsAnalytics;
