import { IsNotEmpty, IsOptional, IsEmail, IsIn } from "class-validator";

export class SignupBodyDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsIn([
    "student", "admin", "teacher", "other"
  ])
  role: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  about: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  address: {
    addressString: string;
    geoLocation: any;
    postCode: string;
  };
}

export class LoginBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
