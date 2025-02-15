import React from "react";
import "../../styles/index.css";
import "./engine-bottom-bar.css";

function EngineBottomBar() {
  return (
    <div className="bottom-bar-container">
      <p className="xsmall removemargin">
        Powered by{"  "}
        <span>
          <img alt="abbey" src="/logo.png" className="bottom-bar-img" />
        </span>
      </p>
    </div>
  );
}

export default EngineBottomBar;
