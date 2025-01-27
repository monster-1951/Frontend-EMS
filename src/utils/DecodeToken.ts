import jwt from "jsonwebtoken";
import jwtDecode from 'jsonwebtoken';
export const getUserRoleFromToken = (accessToken:string):string | null=> {
    try {
      // Decode the token
      const decoded = jwtDecode.decode(accessToken);
      
      if (typeof decoded === "object" && decoded !== null && "role" in decoded) {
        return (decoded as jwt.JwtPayload).role as string;
      }
  
      return null; // Return null if the token is invalid or does not contain 'role'
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }