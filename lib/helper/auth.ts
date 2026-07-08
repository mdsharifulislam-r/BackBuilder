import { getTokenFromBearer, verifyJwtToken } from "./generateJWT";

export const checkAuth = (token: string, is_auth_required: string,method:"GET"|"POST"|"PUT"|"DELETE"|"PATCH") => {
  if (is_auth_required) {
    const split = is_auth_required.split(",");
    
    if (!split.includes(method)) {
      return true;
    }
    const tokenk = getTokenFromBearer(token);
    if (!tokenk) {
      return false;
    }

    const verifyToken = verifyJwtToken(tokenk);
    if (!verifyToken) {
      return false;
    }
  }

  return true;

};
