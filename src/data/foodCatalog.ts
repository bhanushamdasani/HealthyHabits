export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  servingSize: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  category: 'grain' | 'dal_legume' | 'dairy' | 'vegetable' | 'nut_seed' | 'soy' | 'fruit';
  isVegetarian: true;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  preparationTimeMins: number;
}

export const INDIAN_FOOD_DATABASE: FoodItem[] = [
  // Protein Power Bases
  { id: 'f_paneer', name: 'Low-Fat Paneer', hindiName: 'पनीर', servingSize: '100g', calories: 180, proteinGrams: 18, carbsGrams: 3, fatGrams: 11, fiberGrams: 0, category: 'dairy', isVegetarian: true, isGlutenFree: true, isDairyFree: false, preparationTimeMins: 5 },
  { id: 'f_tofu', name: 'Firm Tofu', hindiName: 'सोया पनीर', servingSize: '100g', calories: 140, proteinGrams: 15, carbsGrams: 2, fatGrams: 8, fiberGrams: 1, category: 'soy', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 5 },
  { id: 'f_soya_chunks', name: 'Soya Chunks (Dry)', hindiName: 'सोया चंक्स', servingSize: '50g', calories: 172, proteinGrams: 26, carbsGrams: 16, fatGrams: 0.5, fiberGrams: 6, category: 'soy', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 10 },
  { id: 'f_moong_dal', name: 'Yellow Moong Dal (Cooked)', hindiName: 'मूंग दाल', servingSize: '1 bowl (150g)', calories: 150, proteinGrams: 9, carbsGrams: 24, fatGrams: 1.5, fiberGrams: 5, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 20 },
  { id: 'f_sprouts', name: 'Green Moong Sprouts', hindiName: 'अंकुरित मूंग', servingSize: '1 cup (100g)', calories: 105, proteinGrams: 8, carbsGrams: 19, fatGrams: 0.5, fiberGrams: 4, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 5 },
  { id: 'f_rajma', name: 'Rajma / Kidney Beans (Cooked)', hindiName: 'राजमा', servingSize: '1 bowl (150g)', calories: 190, proteinGrams: 11, carbsGrams: 33, fatGrams: 1, fiberGrams: 9, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 30 },
  { id: 'f_chole', name: 'Chole / Chickpeas (Cooked)', hindiName: 'छोले', servingSize: '1 bowl (150g)', calories: 210, proteinGrams: 11, carbsGrams: 35, fatGrams: 3, fiberGrams: 8, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 30 },
  { id: 'f_besan', name: 'Besan / Gram Flour', hindiName: 'बेसन', servingSize: '60g (2 Chillas)', calories: 230, proteinGrams: 13, carbsGrams: 35, fatGrams: 3.5, fiberGrams: 6, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 15 },
  { id: 'f_curd', name: 'Fresh Curd / Dahi', hindiName: 'दही', servingSize: '1 bowl (150g)', calories: 95, proteinGrams: 5, carbsGrams: 7, fatGrams: 4.5, fiberGrams: 0, category: 'dairy', isVegetarian: true, isGlutenFree: true, isDairyFree: false, preparationTimeMins: 0 },
  { id: 'f_sattu', name: 'Chana Sattu Powder', hindiName: 'चना सत्तू', servingSize: '40g', calories: 160, proteinGrams: 10, carbsGrams: 26, fatGrams: 2, fiberGrams: 6, category: 'dal_legume', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 3 },
  { id: 'f_whey', name: 'Whey Protein Isolate', hindiName: 'वे प्रोटीन', servingSize: '1 scoop (30g)', calories: 120, proteinGrams: 25, carbsGrams: 2, fatGrams: 1, fiberGrams: 0, category: 'dairy', isVegetarian: true, isGlutenFree: true, isDairyFree: false, preparationTimeMins: 1 },

  // Grains & Carbs
  { id: 'f_roti', name: 'Whole Wheat Roti', hindiName: 'रोटी / चपाती', servingSize: '1 piece (35g)', calories: 85, proteinGrams: 3, carbsGrams: 17, fatGrams: 0.5, fiberGrams: 2.5, category: 'grain', isVegetarian: true, isGlutenFree: false, isDairyFree: true, preparationTimeMins: 10 },
  { id: 'f_rice', name: 'Steamed Rice', hindiName: 'चावल', servingSize: '1 bowl (150g cooked)', calories: 195, proteinGrams: 4, carbsGrams: 43, fatGrams: 0.5, fiberGrams: 1, category: 'grain', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 15 },
  { id: 'f_oats', name: 'Rolled Oats', hindiName: 'ओट्स', servingSize: '50g', calories: 190, proteinGrams: 7, carbsGrams: 33, fatGrams: 3.5, fiberGrams: 5, category: 'grain', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 8 },
  { id: 'f_poha', name: 'Flattened Rice / Poha', hindiName: 'पोहा', servingSize: '60g', calories: 215, proteinGrams: 4, carbsGrams: 46, fatGrams: 1, fiberGrams: 2, category: 'grain', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 10 },
  { id: 'f_dalia', name: 'Broken Wheat / Dalia', hindiName: 'दलिया', servingSize: '60g', calories: 205, proteinGrams: 7, carbsGrams: 43, fatGrams: 1, fiberGrams: 7, category: 'grain', isVegetarian: true, isGlutenFree: false, isDairyFree: true, preparationTimeMins: 15 },
  { id: 'f_idli', name: 'Steamed Idli', hindiName: 'इडली', servingSize: '2 pieces', calories: 130, proteinGrams: 4, carbsGrams: 26, fatGrams: 0.5, fiberGrams: 1.5, category: 'grain', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 15 },

  // Nuts, Seeds & Healthy Fats
  { id: 'f_almonds', name: 'Soaked Almonds', hindiName: 'बादाम', servingSize: '5 pieces (7g)', calories: 42, proteinGrams: 1.5, carbsGrams: 1.5, fatGrams: 3.5, fiberGrams: 1, category: 'nut_seed', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 0 },
  { id: 'f_walnut', name: 'Walnut Halves', hindiName: 'अखरोट', servingSize: '2 halves (6g)', calories: 40, proteinGrams: 1, carbsGrams: 1, fatGrams: 4, fiberGrams: 0.5, category: 'nut_seed', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 0 },
  { id: 'f_peanuts', name: 'Roasted Peanuts', hindiName: 'मूंगफली', servingSize: '25g', calories: 145, proteinGrams: 6.5, carbsGrams: 4, fatGrams: 12, fiberGrams: 2, category: 'nut_seed', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 0 },
  { id: 'f_flaxseeds', name: 'Roasted Flaxseeds', hindiName: 'अलसी', servingSize: '1 tbsp (10g)', calories: 55, proteinGrams: 2, carbsGrams: 3, fatGrams: 4, fiberGrams: 2.8, category: 'nut_seed', isVegetarian: true, isGlutenFree: true, isDairyFree: true, preparationTimeMins: 0 }
];
