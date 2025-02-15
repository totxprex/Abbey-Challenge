import React from "react";

export type TUserRoles =
  "student" | "admin" | "teacher" | "other";

export interface IUsers {
  _id: string;
  first_name: string;
  last_name: string;
  role: TUserRoles;
  email: string;
  student_number: string;
  profile_picture: string;
  password: string;
  about: string;
  mobile: string;
  address: {
    addressString: string;
    geoLocation: any;
    postCode: string;
  };
  payments?: {
    payment_for:
    | "learning"
    | "tools" | "admission" | "course" | "others";
    initiated_on: Date;
    status: "pending" | "completed" | "cancelled";
    paymentRef: object;
    refID: any;
  }[];
  login_token: {
    token_id: string;
    token: string;
  };
  courses: ICourse[];
  classes: IClass[];
  createdAt: Date;
  is_active: boolean;
  courses_tracker: {
    course: string;
    progress: number;
    current_topic: string;
    topics_resolved: string[];
  }[]
}

export interface ICourse {
  _id?: string;
  name: string;
  category: string;
  resources: ICourseTopic[];
  teachers: any[];
  students: any[];
  description: string;
  createdAt: Date;
  banner: string;
}

export interface IMeetings {
  date: Date;
  link: string;
  instructions: string;
  duration: {
    value: number,
    unit: "min" | "hour",
  };
  platform: string
}

export interface IClass {
  students: any[];
  teachers: any[];
  chats: {
    user: any;
    createdAt: Date;
    messsage: string;
    image: string
  }[];
  meetings: IMeetings[];
  createdAt: Date;
  description: string;
  courses: any[];
  title: string;
}

export interface IMainContext {
  changeScreen: (screen: "dashboard" | "courses" | "settings" | "course-analytics") => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean | string;
  usersData: IUsers;
  setUsersData: React.Dispatch<React.SetStateAction<IUsers>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | string>>;
  backendServer: string;
  getSignedAwsUrl: (filename: string, bucketname: string) => any;
  formatNumber: (amount: number) => number | string;
  validateEmail: (email: string) => any;
  updateUsersData: () => Promise<IUsers>
  patternMatching: (wordone: string, wordtwo: string) => boolean;
  validateMobile: (mobile: string) => any;
  getCurrentHash: () => string
  getAbbeyToken: () => string;
  setStoredContext: React.Dispatch<React.SetStateAction<any>>
  storedContext: any
}

export interface ICourseRanker {
  course: string;
  progress: number;
  current_topic: string;
  topics_resolved: string[];
  _id: string;
  userData: IUsers;
}

export interface ICourseTopic {
  content: string;
  external_links: string[];
  videos: string[];
  createdAt: Date;
  title: string;
  _id: string;
}

export interface ICourseTracker {
  course: string;
  progress: number;
  current_topic: string;
  topics_resolved: string[];
  _id: string;
}