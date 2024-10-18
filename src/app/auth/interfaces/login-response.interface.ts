import { User } from "./user.interface";

export interface LoginResponse {
    data:  User;
    token: string;
}

