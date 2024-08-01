import { IMeetings } from "../../context/interface";
import "../../styles/index.css";
import "./dashboard.css";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

export const ATimeTable = ({ data }: { data: IMeetings }) => {
  return (
    <div className="flex-row a-time-table-cont">
      <div className="flex-column a-time-table-cont-left">
        <p className="small">
          {data?.instructions?.length > 50
            ? `${data?.instructions?.slice(0, 50) + "..."}`
            : data?.instructions}
        </p>
        <p className="small">
          <IoEllipsisVerticalOutline color="#006cff" />
          {new Intl.DateTimeFormat("en-gb", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(data?.date || Date.now()))}{" "}
          <br></br>- {data?.platform}
        </p>
      </div>

      <div className="flex-column a-time-table-cont-right">
        <img src={"/notification.png"} alt="etap teacher" className="top-bar-profile-pic" />
        <button onClick={() => window.open(data?.link, "_blank")} className="themeBtn">
          Meeting Link
        </button>
      </div>
    </div>
  );
};
