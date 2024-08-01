import "./TabStatsCard.css";

type ITabStatsCard = {
  title: string;
  count: number | string;
  imageSrc: string;
  onClick?: (title?: string, count?: number | string) => void;
  width?: any;
  customBottonAction?: any;
  customBottonText?: string;
};

function TabStatsCard(props: ITabStatsCard) {
  const { title, count, imageSrc, onClick, width, customBottonText, customBottonAction } = props;
  return (
    <div
      className="tab-stats-container"
      style={{ width, cursor: onClick ? "pointer" : "default" }}
      onClick={() => onClick && onClick(title, count)}
    >
      <div className="tab-stats-frame">
        <img
          className="tab-stats-icon"
          alt="Icon"
          src={imageSrc || "/dashboard-icons/onboarded.png"}
        />
        <div className="tab-stats-contents">
          <div className="tab-stats-title">{title}</div>
          <div className="tab-stats-count">{count}</div>
        </div>
        <p
          onClick={() => customBottonAction && customBottonAction()}
          style={{ color: "#006cff" }}
          className="small cursor"
        >
          {customBottonText}
        </p>
      </div>
    </div>
  );
}

export default TabStatsCard;
