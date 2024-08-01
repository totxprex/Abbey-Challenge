import React from "react";
import { Dropdown, Space, Typography } from "antd";
import { BsArrowDownShort } from "react-icons/bs";

type Prop = {
  activeStudyFilter: string;
  setActiveStudyFilter: React.Dispatch<React.SetStateAction<string>>;
};

const items = [
  {
    key: "All",
    label: "All Topics",
  },
  {
    key: "Resolved",
    label: "Resolved Courses",
  },
  {
    key: "Unresolved",
    label: "Unresolved Courses",
  },
];

const StudyDropDown = ({ activeStudyFilter, setActiveStudyFilter }: Prop) => {
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ["3"],
        onClick: ({ key }) => {
          setActiveStudyFilter(key);
        },
      }}
    >
      <Typography.Link>
        <Space>
          {activeStudyFilter}
          <BsArrowDownShort size={20} style={{ marginTop: -3 }} />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default StudyDropDown;
