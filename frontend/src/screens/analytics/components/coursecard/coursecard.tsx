import "./coursecard.css";

type Props = {
  imageSrc: string;
  title: string;
  description: string;
  isLocked?: boolean;
  available?: boolean;
  onClick?: (title: string, description: string) => void;
  cardWidth?: string;
  length: number;
};
function AnalyticsCourseCard(props: Props) {
  const { imageSrc, title, description, isLocked, available, onClick, cardWidth, length } = props;

  const disableLock = false;

  return (
    <div
      className={`service-card ${!available ? "service-card-disable" : ""} `}
      onClick={() => {
        !isLocked && onClick && onClick(title, description);
      }}
      style={{ width: cardWidth }}
    >
      <div className="service-card-icon-wrapper">
        <img
          className="service-card-icon"
          alt="Icon"
          src={imageSrc || "/service-icons/briefcase.png"}
        />
      </div>

      <div className="service-card-content-wrapper">
        <div className="service-card-title-wrapper">
          <p className="small boldText blackText">
            {title.length > 40 ? `${title.slice(0, 40) + "..."}` : title}
          </p>
          <p className="small">
            {description.length > 60 ? `${description.slice(0, 60) + "..."}` : description}
          </p>

          <p className="small greyText">{length} Topic(s)</p>
        </div>
        {!disableLock && (
          <div className="service-card-menu-wrapper">
            <div></div>
            {isLocked ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                  fill="black"
                  fill-opacity="0.54"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsCourseCard;
