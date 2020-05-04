export interface Order{
    id: number;
    userID: number;
    status: StatusEnum;
    creation_date: Date;
    update_date: Date;
    total: number;
}

export enum StatusEnum {
    DELIVERED = "Delivered",
    UNDELIVERED = "Undelivered",
    INCART = "In_cart"
}