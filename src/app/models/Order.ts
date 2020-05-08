export interface Order{
    id?: number;
    userID: number;
    status: StatusEnum;
    creation_date: Date;
    update_date: Date;
    total: number;
}

export enum StatusEnum {
    DELIVERED = "DELIVERED",
    UNDELIVERED = "UNDELIVERED",
    INCART = "INCART"
}