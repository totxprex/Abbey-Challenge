import { Response, Request } from "express";
import { dbUsers } from "../../database/db-models";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import jwt from "jsonwebtoken";

export function loginAUser() {
  return async (req: Request, res: Response) => {
    try {
      const theUser = await dbUsers.findOne({ email: req.body.email });

      if (!theUser?._id) throw new Error("This user does not exist");

      const token = jwt.sign(
        {
          email: theUser.email,
          role: theUser.role,
          student_number: theUser.student_number,
        },
        process.env.jwtkey,
        { expiresIn: "90d" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.prod === "yes" ? true : false,
        sameSite: "none",
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      })

      response(res, "User Logged In", {
        email: theUser.email,
        role: theUser.role,
        student_number: theUser.student_number,
        token,
      });
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
}
