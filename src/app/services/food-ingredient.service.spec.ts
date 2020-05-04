import { TestBed } from '@angular/core/testing';

import { FoodIngredientService } from './food-ingredient.service';

describe('FoodIngredientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodIngredientService = TestBed.get(FoodIngredientService);
    expect(service).toBeTruthy();
  });
});
