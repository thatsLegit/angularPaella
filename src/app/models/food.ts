export interface Food{
    foodId: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    active: boolean;
    isDishOfDay: boolean;
}