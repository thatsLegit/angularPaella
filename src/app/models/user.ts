export interface User{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    privilege: PrivilegeEnum;
    password: string;
}

export enum PrivilegeEnum {
    BASIC = "Basic",
    ADMIN = "Admin"
}