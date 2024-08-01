import { IClass, ICourse } from "../../context/interface";
import { popup } from "../../vanilla-functions/model";
import "./coursecard.css";

type Props = {
  title: string;
  description: string;
  isLocked?: boolean;
  available?: boolean;
  onClick?: (title: string, description: string) => void;
  cardWidth?: string;
  type: "course" | "class";
  raw?: IClass & ICourse;
};
function CourseCard(props: Props) {
  const { title, description, isLocked, available, onClick, cardWidth, type, raw } = props;

  const disableLock = false;

  return (
    <div
      className={`service-card ${!available ? "service-card-disable" : ""} `}
      onClick={() => {
        if (type === "class") return popup("Classes Feature Not Currently Available!");
        !isLocked && onClick && onClick(title, description);
      }}
      style={{ width: cardWidth }}
    >
      <div className="service-card-icon-wrapper">
        <img
          className="service-card-icon"
          alt="Icon"
          src={type === "course" ? "/images/office.png" : "/images/classroom.png"}
        />
      </div>

      <div className="service-card-content-wrapper">
        <div className="service-card-title-wrapper">
          <p className="small boldText blackText">
            {title?.length > 40 ? `${title?.slice(0, 40) + "..."}` : title}
          </p>
          <p className="small">
            {description?.length > 50 ? `${description?.slice(0, 50) + "..."}` : description}
          </p>

          {type === "course" ? (
            <p className="small greyText">{raw?.resources?.length} Topics</p>
          ) : (
            <p className="small greyText">{raw?.courses?.length} Courses</p>
          )}
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

export default CourseCard;
