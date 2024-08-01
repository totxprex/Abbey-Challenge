import { ICourseRanker } from "../../context/interface";

const columns: any = [
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
  },
  {
    id: "joined",
    label: "Joined",
    minWidth: 100,
    align: "left",
  },
  {
    id: "progress",
    label: "Progress (%)",
    minWidth: 100,
    align: "center",
  },
  {
    id: "number_of_topics",
    label: "Topics Done",
    minWidth: 100,
    align: "center",
  },
];

function sortData(data?: ICourseRanker[]) {
  if (!data) return [];
  const finalArray = data?.map((e: ICourseRanker) => {
    return {
      first_name: e?.userData?.first_name,
      last_name: e?.userData?.last_name,
      email: e?.userData?.email,
      joined: new Intl.DateTimeFormat("en-gb", {
        dateStyle: "long",
      }).format(new Date(e?.userData?.createdAt)),
      progress: e?.progress,
      number_of_topics: e?.topics_resolved?.length,
    };
  });

  return finalArray;
}

export { sortData, columns };
