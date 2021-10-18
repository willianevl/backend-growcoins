import { Program } from "../../../programs/domain";

export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    programName: string;
    edition: string;
    userImage: string;
    programUid: string;
    admin: boolean;
    pending: boolean;
    createdAt: Date;
    //program: Program;
    //movements: Movements[];
};