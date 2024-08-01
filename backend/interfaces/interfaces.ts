import { TUserRoles } from "../database/schemas/user.schema";

export interface ITokenObj {
  email: string;
  role: TUserRoles;
}
