export interface FoodOrder {
    id?: number;
    foodId: number;
    orderId: number;
    quantity: number;
    comments: string;
    subTotal: number;
}