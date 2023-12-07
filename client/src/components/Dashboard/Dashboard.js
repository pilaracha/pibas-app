import * as React from "react";
import Orders from "./Orders";

const DashboardContent = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Orders />
        <Orders />
        <Orders />
      </div>
    </React.Fragment>
  );
};

export default DashboardContent;
