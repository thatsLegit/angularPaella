import { Food } from './food';
import { IngredientFood } from './IngredientFood';

export interface FoodAndIngredients {
    food: Food;
    ingredientFoods: Array<IngredientFood>;
}