import React, { useContext, useState, useEffect } from "react";
import "../../styles/index.css";
import "./engine-top-bar.css";
import AppContext from "../../context/app-context";

function EngineTopBar() {
  const [userImage, setUserImage] = useState<string>("");

  const { usersData, getSignedAwsUrl } = useContext(AppContext);

  useEffect(() => {
    (async function () {
      setUserImage(await getSignedAwsUrl(usersData?.profile_picture, "profile-pictures"));
    })();
  }, [usersData]);

  return (
    <div className="top-bar-container">
      <p className="big removemargin media-engine-intro">
        Welcome back, {usersData?.last_name} 👋
        <br></br>{" "}
        <span className="small removemargin">Here's what is happening in school today...</span>
      </p>

      <div className="flex-row" style={{ width: "fit-content", gap: 15 }}>
        <img
          src={userImage || "/user_placeholder.png"}
          alt="abbey admin"
          className="top-bar-profile-pic"
        />
        <div className="flex-column align-column-left" style={{ width: "fit-content" }}>
          <p className="small removemargin">{usersData?.last_name}</p>
          <p className="top-bar-status small removemargin">{usersData?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default EngineTopBar;
