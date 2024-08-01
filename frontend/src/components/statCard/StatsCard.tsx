import React from "react";
import "./StatsCard.css";
import { MdFolderOpen } from "react-icons/md";

type Props = {
  label: string;
  icon?: (defaultClassName?: string) => JSX.Element;
  count: string | number;
  styleStr: "all" | "active" | "low" | "sold";
  onClick?: () => void;
};

const StatsCard = ({ label, count, icon, styleStr = "all", onClick }: Props) => {
  return (
    <div className="stat-card-container cursor" onClick={(e) => {
      e.stopPropagation();
      onClick && onClick()
    }}>
      <div className="stat-card-child">
        {styleStr === "all" &&
          ((icon && icon("stat-card-icon-all")) || <MdFolderOpen className="stat-card-icon-all" />)}
        {styleStr === "active" &&
          ((icon && icon("stat-card-icon-active")) || (
            <MdFolderOpen className="stat-card-icon-active" />
          ))}
        {styleStr === "low" &&
          ((icon && icon("stat-card-icon-low")) || <MdFolderOpen className="stat-card-icon-low" />)}
        {styleStr === "sold" &&
          ((icon && icon("stat-card-icon-sold")) || (
            <MdFolderOpen className="stat-card-icon-sold" />
          ))}
      </div>
      <div className="stat-card-label-wrapper">
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-label-value">{count}</div>
      </div>
      <div>
        {/* <select>
                <option>Today</option>
            </select> */}
      </div>
    </div>
  );
};

export default StatsCard;
