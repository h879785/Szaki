import { User } from "./User";

export interface Groups{
    id: string;
    members?: Array<User>;
    creator?: string;
    name: string;
    //posts?: string[];
    security: string;
    createdate?: number;
}