import mongoose, { Document } from "mongoose";
import * as validator from "validator";

export type TUserRoles =
  "student" | "admin" | "teacher" | "other";

export class UsersType {
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
  payments: {
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
  courses: any[];
  classes: any[];
  createdAt: Date;
  is_active: boolean;
  courses_tracker: {
    course: any;
    progress?: number;
    current_topic?: string;
    topics_resolved?: string[];
  }[]
}

export interface IUsers extends UsersType, Document { }

export const UsersSchema = new mongoose.Schema<UsersType>({
  first_name: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, "A user must have a first name"],
  },
  last_name: {
    type: String,
    maxlength: 100,
    trim: true,
    required: [true, "A user must have a last name"],
  },
  login_token: {
    token_id: {
      type: String,
      maxlength: 5,
      default: "",
      select: false
    },
    token: {
      type: String,
      default: "",
      select: false
    },
  },
  role: {
    type: String,
    enum: {
      values: [
        "student", "admin", "teacher", "other"
      ],
      message: "Role type invalid",
    },
    required: true,
  },
  email: {
    type: String,
    validate: validator.isEmail,
    required: [true, "Email must be present"],
    lowercase: true,
  },
  student_number: {
    type: String,
    trim: true,
    maxlength: 200,
    required: [true, "A user must have a card number"],
  },
  profile_picture: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  about: {
    type: String,
    default: "",
    maxlength: 500,
  },
  mobile: {
    type: String,
    maxlength: 15,
    trim: true,
    required: [true, "A mobile number must have a name"],
  },
  address: {
    addressString: String,
    geoLocation: {
      type: {
        type: String,
        default: "point",
        enum: ["point"],
      },
      coordinates: [String],
    },
    postCode: String,
  },
  payments: [
    {
      payment_for: {
        type: String,
        enum: {
          values: [
            "learning", "tools", "admission", "course", "others"
          ],
          message: "payment type invalid",
        },
        required: true,
      },
      initiated_on: {
        type: Date,
        default: Date.now(),
      },
      status: {
        type: String,
        enum: {
          values: ["pending", "completed", "cancelled"],
          message: "Transaction type invalid",
        },
        required: [true, "All transactions must have a status"],
      },
      paymentRef: Object,
    },
  ],
  courses: [{
    type: mongoose.Schema.ObjectId,
    ref: "courses",
  }],
  classes: [{
    type: mongoose.Schema.ObjectId,
    ref: "classes",
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true
  },
  courses_tracker: [{
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "courses",
    },
    progress: {
      type: Number,
      default: 0
    },
    current_topic: {
      type: String,
      default: ""
    },
    topics_resolved: [{
      type: String,
    }]
  }]
});

UsersSchema.index({ email: 1 }, { unique: true });
UsersSchema.index({ student_number: 1 }, { unique: true });
