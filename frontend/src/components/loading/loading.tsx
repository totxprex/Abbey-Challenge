import React from "react";
import "../../styles/index.css";
import { MDBSpinner } from "mdb-react-ui-kit";

const Loading = function ({ show }: { show: boolean }) {
  return (
    <>
      {show && (
        <div className="loading-container">
          <MDBSpinner role='status' size="lg" className="mx-2">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      )}
    </>
  );
};

export default Loading;
