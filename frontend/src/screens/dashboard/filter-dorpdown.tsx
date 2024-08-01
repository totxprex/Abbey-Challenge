import React from "react";
import { Dropdown, Space, Typography } from "antd";
import "./dashboard.css";
import { BsArrowDownShort } from "react-icons/bs";

type Prop = {
  activeCourseFilter: string;
  setActiveCourseFilter: React.Dispatch<React.SetStateAction<string>>;
};

const items = [
  {
    key: "All",
    label: "All Courses",
  },
  {
    key: "Pending",
    label: "Pending Courses",
  },
  {
    key: "Completed",
    label: "Completed Courses",
  },
];

const CoursesDropdown = ({ activeCourseFilter, setActiveCourseFilter }: Prop) => {
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["3"],
        onClick: ({ key }) => {
          setActiveCourseFilter(key);
        },
      }}
    >
      <Typography.Link>
        <Space>
          {activeCourseFilter}
          <BsArrowDownShort size={20} style={{ marginTop: -3 }} />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default CoursesDropdown;
