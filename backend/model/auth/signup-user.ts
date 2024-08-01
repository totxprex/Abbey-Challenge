import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers } from "../../database/db-models";
import { capitalizeEachWord } from "../../utils/config";

export const signupAUser = function () {
  return async (req: Request, res: Response) => {
    try {
      req.body.student_number =
        String(req.body.first_name)[0].toUpperCase() +
        String(req.body.last_name)[0].toUpperCase() +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1)
        +
        String(Math.trunc(Math.random() * 9) + 1);

      req.body.first_name = capitalizeEachWord(req.body.first_name);
      req.body.last_name = capitalizeEachWord(req.body.last_name);

      const returned = await dbUsers.create(req.body);

      response(res, `${req.body.role} created`, returned);
    } catch (err) {
      console.log(err);
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
