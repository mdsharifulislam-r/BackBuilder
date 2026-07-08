import { cookies } from "next/headers";
import { MyResponse } from "./MyResponse";
import jwt from "jwt-simple";
export const validateUser = () => {
try {
      const token = cookies().get("token")?.value;
  if (!token) {
    return false;
  }
  const user_id = jwt.decode(token, process.env.JWT_SECRET!);
  return user_id;
} catch (error) {
    return false
}
};
