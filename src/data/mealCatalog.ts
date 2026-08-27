import { CuratedMeal } from '../types';

export const CURATED_MEAL_DATABASE: CuratedMeal[] = [
  // ==========================================
  // 15 BREAKFAST MEALS (15 UNIQUE DAYS)
  // ==========================================
  {
    id: 'm_moong_chilla',
    name: 'Moong Dal Chilla (2) + Mint Chutney',
    hindiName: 'मूंग दाल चीला',
    mealType: 'breakfast',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Moong Dal Batter', quantity: '80g' },
      { name: 'Onions, Chillies, Ginger', quantity: '2 tbsp' },
      { name: 'Mint Coriander Chutney', quantity: '2 tbsp' },
      { name: 'Mustard/Olive Oil', quantity: '1 tsp' }
    ],
    servingSize: '2 Chillas (medium)',
    estimatedNutrition: { calories: 310, proteinGrams: 16, carbsGrams: 42, fatGrams: 7, fiberGrams: 8 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Blend soaked moong dal with ginger, green chilli, and a pinch of hing into a smooth batter.',
      'Heat a tawa on medium, grease lightly with 1/2 tsp oil.',
      'Pour a ladle of batter, spread in a circle, and top with finely chopped onions.',
      'Cook on medium heat until golden brown on both sides. Serve with fresh mint chutney.'
    ],
    wellnessBenefits: [
      'High in plant-based bioavailable protein',
      'Low Glycemic Index keeps energy stable through morning study/work blocks',
      'Rich in folate, magnesium, and dietary fiber'
    ],
    tags: ['high-protein', 'low-gi', 'pcos-friendly', 'iron-rich', 'quick-cook'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_besan_chilla', 'm_oats_chilla', 'm_ragi_dosa']
  },
  {
    id: 'm_besan_chilla',
    name: 'Besan Chilla (2) + Grated Paneer Top',
    hindiName: 'बेसन चीला',
    mealType: 'breakfast',
    primaryProteinSource: 'besan',
    ingredients: [
      { name: 'Gram Flour (Besan)', quantity: '60g' },
      { name: 'Low-Fat Paneer (Grated)', quantity: '30g' },
      { name: 'Ajwain & Turmeric', quantity: '1/2 tsp' },
      { name: 'Green Mint Chutney', quantity: '2 tbsp' }
    ],
    servingSize: '2 Chillas',
    estimatedNutrition: { calories: 340, proteinGrams: 19, carbsGrams: 36, fatGrams: 11, fiberGrams: 6 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Whisk besan with water, ajwain, turmeric, and salt to form a smooth batter.',
      'Pour onto hot tawa, spread thin.',
      'Sprinkle grated paneer and coriander on top before flipping.',
      'Cook till crisp and golden. Serve hot.'
    ],
    wellnessBenefits: [
      'Dual protein sources (Chickpea flour + Dairy caseinate)',
      'Ajwain aids easy stomach digestion and reduces bloating'
    ],
    tags: ['high-protein', 'vegetarian', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_moong_chilla', 'm_oats_chilla', 'm_sattu_paratha']
  },
  {
    id: 'm_oats_chilla',
    name: 'Oats Veggie Chilla (2) + Curd (100g)',
    hindiName: 'ओट्स चीला',
    mealType: 'breakfast',
    primaryProteinSource: 'curd_dairy',
    ingredients: [
      { name: 'Rolled Oats Powder', quantity: '50g' },
      { name: 'Besan (Binding)', quantity: '20g' },
      { name: 'Fresh Curd / Dahi', quantity: '100g' },
      { name: 'Grated Carrot & Capsicum', quantity: '3 tbsp' }
    ],
    servingSize: '2 Chillas + Curd',
    estimatedNutrition: { calories: 320, proteinGrams: 14, carbsGrams: 45, fatGrams: 8, fiberGrams: 7 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Mix powdered oats, besan, grated veggies, and water into a smooth batter.',
      'Cook on a greased pan on medium flame until edges lift cleanly.',
      'Pair with fresh cold curd.'
    ],
    wellnessBenefits: [
      'Beta-glucan soluble fiber supports steady glucose and heart health',
      'Probiotics from curd enhance gut microbiome'
    ],
    tags: ['heart-healthy', 'high-fiber', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_moong_chilla', 'm_poha_protein', 'm_dalia_porridge']
  },
  {
    id: 'm_poha_protein',
    name: 'Veg Poha (60g) + Roasted Peanuts + Sprouts',
    hindiName: 'प्रोटीन पोहा',
    mealType: 'breakfast',
    primaryProteinSource: 'sprouts',
    ingredients: [
      { name: 'Flattened Rice (Poha)', quantity: '50g' },
      { name: 'Boiled Green Moong Sprouts', quantity: '40g' },
      { name: 'Roasted Peanuts', quantity: '15g' },
      { name: 'Mustard seeds, Curry leaves, Lemon', quantity: 'to taste' }
    ],
    servingSize: '1 Large Bowl',
    estimatedNutrition: { calories: 350, proteinGrams: 13, carbsGrams: 52, fatGrams: 10, fiberGrams: 6 },
    preparationTimeMins: 10,
    recipeInstructions: [
      'Rinse poha in a colander and drain completely.',
      'Temper mustard seeds, curry leaves, and green chillies in 1 tsp oil.',
      'Add peanuts and boiled sprouts; sauté for 2 minutes.',
      'Fold in poha with turmeric and salt; finish with fresh lemon juice.'
    ],
    wellnessBenefits: [
      'Non-heme iron from flattened rice enhanced by Vitamin C from fresh lemon',
      'Quick and easy on early morning digestion'
    ],
    tags: ['iron-rich', 'quick-cook', 'comfort-food'],
    suitableForPCOS: false,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_moong_chilla', 'm_idli_sambar', 'm_dalia_porridge']
  },
  {
    id: 'm_idli_sambar',
    name: '2 Idlis + Thick Dal Sambhar + Coconut Chutney',
    hindiName: 'इडली सांभर',
    mealType: 'breakfast',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Steamed Rice & Urad Idlis', quantity: '2 pieces' },
      { name: 'Thick Toor Dal Sambhar with Veggies', quantity: '1 bowl (180ml)' },
      { name: 'Coconut Chutney', quantity: '1 tbsp' }
    ],
    servingSize: '2 Idlis + Sambhar',
    estimatedNutrition: { calories: 290, proteinGrams: 11, carbsGrams: 48, fatGrams: 5, fiberGrams: 6 },
    preparationTimeMins: 10,
    recipeInstructions: [
      'Steam idlis until fluffy and light.',
      'Heat sambhar packed with drumsticks and tomatoes.',
      'Serve hot with fresh coconut chutney.'
    ],
    wellnessBenefits: [
      'Fermented batter enhances bioavailable vitamins and gut enzymes'
    ],
    tags: ['fermented', 'gut-health', 'light-digest'],
    suitableForPCOS: false,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_ragi_dosa', 'm_poha_protein', 'm_oats_chilla']
  },
  {
    id: 'm_paneer_sandwich',
    name: 'Grilled Paneer Sandwich (Brown Bread)',
    hindiName: 'पनीर सैंडविच',
    mealType: 'breakfast',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Whole Wheat / Brown Bread', quantity: '2 slices' },
      { name: 'Low-Fat Paneer Slices / Bhurji', quantity: '75g' },
      { name: 'Tomato, Cucumber, Capsicum slices', quantity: '4 slices' },
      { name: 'Green Mint Chutney', quantity: '1 tbsp' }
    ],
    servingSize: '1 Grilled Sandwich',
    estimatedNutrition: { calories: 360, proteinGrams: 20, carbsGrams: 35, fatGrams: 14, fiberGrams: 5 },
    preparationTimeMins: 8,
    recipeInstructions: [
      'Spread mint chutney across both slices of brown bread.',
      'Layer with seasoned paneer slices, cucumber, and tomato.',
      'Toast or grill lightly without excess butter until crisp.'
    ],
    wellnessBenefits: [
      '20g complete vegetarian dairy protein',
      'Sustained satiety prevents mid-morning cravings'
    ],
    tags: ['high-protein', 'student-friendly', 'quick-cook'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_moong_chilla', 'm_besan_chilla', 'm_sattu_paratha']
  },
  {
    id: 'm_dalia_porridge',
    name: 'Vegetable Dalia Porridge + 1 Glass Chaas',
    hindiName: 'वेजिटेबल दलिया',
    mealType: 'breakfast',
    primaryProteinSource: 'curd_dairy',
    ingredients: [
      { name: 'Broken Wheat (Dalia)', quantity: '50g' },
      { name: 'Carrots, Peas, Beans', quantity: '1/2 cup' },
      { name: 'Spiced Buttermilk (Chaas)', quantity: '200ml' }
    ],
    servingSize: '1 Bowl Dalia + Chaas',
    estimatedNutrition: { calories: 295, proteinGrams: 11, carbsGrams: 50, fatGrams: 4, fiberGrams: 8 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Roast dalia dry in a pressure cooker until fragrant.',
      'Add chopped vegetables, water, cumin, and salt; pressure cook for 2 whistles.',
      'Serve with cold spiced chaas.'
    ],
    wellnessBenefits: [
      'High prebiotic fiber resets digestion and promotes regularity'
    ],
    tags: ['gut-reset', 'high-fiber', 'comfort-food'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_oats_chilla', 'm_poha_protein', 'm_quinoa_upma']
  },
  {
    id: 'm_ragi_dosa',
    name: 'Ragi (Finger Millet) Dosa (2) + Tomato Chutney',
    hindiName: 'रागी डोसा',
    mealType: 'breakfast',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Ragi Flour (Finger Millet)', quantity: '50g' },
      { name: 'Urad Dal / Rice Batter', quantity: '30g' },
      { name: 'Tomato Onion Garlic Chutney', quantity: '2 tbsp' }
    ],
    servingSize: '2 Crispy Ragi Dosas',
    estimatedNutrition: { calories: 280, proteinGrams: 9, carbsGrams: 52, fatGrams: 4, fiberGrams: 9 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Mix ragi flour with a little curd and water to a crepe consistency.',
      'Spread onto a hot tawa with 1/2 tsp oil until crisp and brown.',
      'Serve with spicy tomato-garlic chutney.'
    ],
    wellnessBenefits: [
      'Rich in plant calcium and non-heme iron',
      'Ultra low glycemic index supports PCOS insulin sensitivity'
    ],
    tags: ['pcos-friendly', 'iron-rich', 'calcium-rich', 'low-gi'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_moong_chilla', 'm_methi_thepla', 'm_oats_chilla']
  },
  {
    id: 'm_sprouts_salad_bowl',
    name: 'Steamed Moong Sprouts + Pomegranate + Walnuts',
    hindiName: 'अंकुरित मूंग सलाद',
    mealType: 'breakfast',
    primaryProteinSource: 'sprouts',
    ingredients: [
      { name: 'Steamed Green Moong Sprouts', quantity: '120g' },
      { name: 'Fresh Pomegranate Arils', quantity: '3 tbsp' },
      { name: 'Chopped Walnuts', quantity: '10g' },
      { name: 'Chaat Masala, Lemon Juice, Mint', quantity: 'to taste' }
    ],
    servingSize: '1 Large Nourish Bowl',
    estimatedNutrition: { calories: 290, proteinGrams: 16, carbsGrams: 38, fatGrams: 9, fiberGrams: 10 },
    preparationTimeMins: 8,
    recipeInstructions: [
      'Steam fresh green moong sprouts for 3 minutes to enhance digestibility.',
      'Toss with fresh pomegranate, chopped walnuts, rock salt, and lemon juice.'
    ],
    wellnessBenefits: [
      'Sprouting multiplies vitamin C, B-complex vitamins, and enzymatic activity',
      'High plant protein and omega-3s for brain focus'
    ],
    tags: ['raw-clean', 'high-fiber', 'high-protein', 'iron-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_moong_chilla', 'm_besan_chilla', 'm_sattu_drink']
  },
  {
    id: 'm_methi_thepla',
    name: 'Methi Thepla (2) + Fresh Curd (150g)',
    hindiName: 'मेथी थेपला + दही',
    mealType: 'breakfast',
    primaryProteinSource: 'curd_dairy',
    ingredients: [
      { name: 'Fresh Fenugreek (Methi) Leaves', quantity: '1/2 cup chopped' },
      { name: 'Whole Wheat & Besan Flour', quantity: '60g' },
      { name: 'Fresh Dahi / Curd', quantity: '150g' },
      { name: 'Ajwain, Turmeric, Cumin', quantity: '1/2 tsp' }
    ],
    servingSize: '2 Theplas + 1 Bowl Curd',
    estimatedNutrition: { calories: 330, proteinGrams: 15, carbsGrams: 44, fatGrams: 10, fiberGrams: 6 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Knead whole wheat flour, besan, finely chopped methi leaves, ajwain, and turmeric with a spoon of curd.',
      'Roll thin and cook on a hot tawa with minimal oil. Serve with cold curd.'
    ],
    wellnessBenefits: [
      'Fenugreek contains 4-hydroxyisoleucine which stimulates glucose-mediated insulin secretion',
      'Proven support for PCOS metabolic balance'
    ],
    tags: ['pcos-friendly', 'insulin-sensitizing', 'traditional'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_ragi_dosa', 'm_moong_chilla', 'm_palak_chilla']
  },
  {
    id: 'm_paneer_paratha',
    name: 'Multigrain Paneer Stuffed Paratha (1) + Curd',
    hindiName: 'पनीर पराठा + दही',
    mealType: 'breakfast',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Multigrain Dough', quantity: '45g' },
      { name: 'Grated Low-Fat Paneer with Coriander', quantity: '70g' },
      { name: 'Fresh Curd', quantity: '100g' }
    ],
    servingSize: '1 Stuffed Paratha + Curd',
    estimatedNutrition: { calories: 370, proteinGrams: 21, carbsGrams: 36, fatGrams: 14, fiberGrams: 5 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Stuff seasoned grated paneer inside rolled multigrain dough.',
      'Cook on tawa with 1 tsp ghee/oil until crisp. Pair with fresh curd.'
    ],
    wellnessBenefits: [
      '21g high satiety protein supports muscle recovery after morning workouts'
    ],
    tags: ['high-protein', 'comfort-food', 'muscle-fuel'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_paneer_sandwich', 'm_besan_chilla', 'm_sattu_paratha']
  },
  {
    id: 'm_sattu_paratha',
    name: 'Sattu Stuffed Paratha + Mint Chutney',
    hindiName: 'सत्तू पराठा',
    mealType: 'breakfast',
    primaryProteinSource: 'besan',
    ingredients: [
      { name: 'Roasted Bengal Gram Flour (Sattu)', quantity: '40g' },
      { name: 'Whole Wheat Dough', quantity: '40g' },
      { name: 'Kalonji, Ajwain, Lemon, Mustard Oil', quantity: '1 tsp' },
      { name: 'Mint Chutney', quantity: '2 tbsp' }
    ],
    servingSize: '1 Large Paratha + Chutney',
    estimatedNutrition: { calories: 340, proteinGrams: 17, carbsGrams: 48, fatGrams: 9, fiberGrams: 9 },
    preparationTimeMins: 14,
    recipeInstructions: [
      'Mix sattu with onions, green chillies, kalonji, lemon juice, and a drop of mustard oil.',
      'Stuff into dough, roll out, and cook till roasted brown.'
    ],
    wellnessBenefits: [
      'Ancient Indian superfood; cooling for the stomach with exceptionally high insoluble fiber'
    ],
    tags: ['high-fiber', 'high-protein', 'traditional-superfood'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_paneer_paratha', 'm_besan_chilla', 'm_moong_chilla']
  },
  {
    id: 'm_quinoa_upma',
    name: 'Vegetable Quinoa Upma + Roasted Peanuts',
    hindiName: 'किनोआ उपमा',
    mealType: 'breakfast',
    primaryProteinSource: 'sprouts',
    ingredients: [
      { name: 'Cooked Quinoa', quantity: '120g' },
      { name: 'Mixed Diced Veggies (Carrots, Beans, Peas)', quantity: '1/2 cup' },
      { name: 'Mustard seeds, Curry leaves, Peanuts', quantity: '15g' }
    ],
    servingSize: '1 Large Bowl',
    estimatedNutrition: { calories: 310, proteinGrams: 12, carbsGrams: 44, fatGrams: 9, fiberGrams: 7 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Temper mustard seeds, curry leaves, and peanuts.',
      'Sauté diced vegetables until tender.',
      'Fold in cooked fluffy quinoa with turmeric and lemon juice.'
    ],
    wellnessBenefits: [
      'Complete plant protein containing all 9 essential amino acids with low glycemic impact'
    ],
    tags: ['gluten-free', 'complete-protein', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_oats_chilla', 'm_dalia_porridge', 'm_ragi_dosa']
  },
  {
    id: 'm_palak_chilla',
    name: 'Spinach (Palak) Moong Chilla (2) + Curd',
    hindiName: 'पालक मूंग चीला',
    mealType: 'breakfast',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Moong Dal & Pureed Spinach Batter', quantity: '80g' },
      { name: 'Fresh Curd', quantity: '100g' },
      { name: 'Sesame & Flax Seeds Top', quantity: '1 tsp' }
    ],
    servingSize: '2 Green Chillas + Curd',
    estimatedNutrition: { calories: 320, proteinGrams: 18, carbsGrams: 39, fatGrams: 9, fiberGrams: 8 },
    preparationTimeMins: 14,
    recipeInstructions: [
      'Blend soaked moong dal with blanched fresh spinach and green chillies.',
      'Spread on hot tawa, sprinkle sesame seeds on top, and flip till cooked.'
    ],
    wellnessBenefits: [
      'Double iron boost from spinach chlorophyll and moong dal paired with sesame zinc'
    ],
    tags: ['iron-rich', 'high-protein', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_moong_chilla', 'm_methi_thepla', 'm_sprouts_salad_bowl']
  },
  {
    id: 'm_masala_oats_tofu',
    name: 'Masala Oats with Sautéed Tofu Cubes (60g)',
    hindiName: 'मसाला ओट्स + टोफू',
    mealType: 'breakfast',
    primaryProteinSource: 'tofu',
    ingredients: [
      { name: 'Rolled Oats', quantity: '45g' },
      { name: 'Firm Tofu (Cubed)', quantity: '60g' },
      { name: 'Carrots, Peas, Tomato Masala', quantity: '1/2 cup' }
    ],
    servingSize: '1 Large Warm Bowl',
    estimatedNutrition: { calories: 330, proteinGrams: 16, carbsGrams: 42, fatGrams: 10, fiberGrams: 7 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Sauté spices and vegetables; add water and simmer rolled oats for 4 minutes.',
      'Pan-sear tofu cubes with turmeric and fold into the warm masala oats.'
    ],
    wellnessBenefits: [
      'Vegan high-protein combination with high satiety and gentle digestion'
    ],
    tags: ['vegan', 'dairy-free', 'high-fiber', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_oats_chilla', 'm_quinoa_upma', 'm_dalia_porridge']
  },

  // ==========================================
  // 15 LUNCH MEALS (15 UNIQUE DAYS)
  // ==========================================
  {
    id: 'm_rajma_roti',
    name: '2 Roti + Rajma (150g) + Cucumber Salad',
    hindiName: 'राजमा रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'rajma_chole',
    ingredients: [
      { name: 'Whole Wheat Roti', quantity: '2 pieces' },
      { name: 'Cooked Rajma Curry', quantity: '1 bowl (180g)' },
      { name: 'Cucumber Tomato Salad + Lemon', quantity: '1 bowl' }
    ],
    servingSize: '2 Roti + 1 Bowl Rajma + Salad',
    estimatedNutrition: { calories: 430, proteinGrams: 18, carbsGrams: 75, fatGrams: 5, fiberGrams: 14 },
    preparationTimeMins: 25,
    recipeInstructions: [
      'Cook soaked rajma with tomato, onion, ginger-garlic gravy and mild spices.',
      'Pair with 2 freshly puffed whole wheat rotis and a crisp cucumber salad eaten first.'
    ],
    wellnessBenefits: [
      'Rich in potassium, magnesium, and resistant starch',
      'High satiety curve fuels afternoon focus'
    ],
    tags: ['classic-indian', 'high-fiber', 'iron-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_chole_curd_roti', 'm_kala_chana_curry', 'm_soya_sabzi_roti']
  },
  {
    id: 'm_chole_curd_roti',
    name: '1 Roti + Chole (150g) + 1 Bowl Curd (150g)',
    hindiName: 'छोले दही रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'rajma_chole',
    ingredients: [
      { name: 'Whole Wheat Roti', quantity: '1 piece' },
      { name: 'Spiced Chickpea Curry (Chole)', quantity: '1 bowl (160g)' },
      { name: 'Fresh Curd / Dahi', quantity: '1 bowl (150g)' },
      { name: 'Raw Onion & Green Chilli Salad', quantity: '1 plate' }
    ],
    servingSize: '1 Roti + Chole + Curd',
    estimatedNutrition: { calories: 420, proteinGrams: 19, carbsGrams: 62, fatGrams: 9, fiberGrams: 11 },
    preparationTimeMins: 25,
    recipeInstructions: [
      'Prepare chole with antioxidant-rich spices (anardana, amchur, cumin).',
      'Serve alongside 1 roti and 1 whole bowl of cooling probiotic curd.'
    ],
    wellnessBenefits: [
      'Complete amino acid profile pairing legumes with dairy curd',
      'Curd balances thermal spices'
    ],
    tags: ['high-protein', 'probiotic', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_rajma_roti', 'm_kala_chana_curry', 'm_dal_mixveg_roti']
  },
  {
    id: 'm_soya_sabzi_roti',
    name: '2 Roti + Soya Chunks Sabzi (50g dry) + Salad',
    hindiName: 'सोया चंक्स सब्जी',
    mealType: 'lunch',
    primaryProteinSource: 'soy_chunks',
    ingredients: [
      { name: 'Whole Wheat Roti', quantity: '2 pieces' },
      { name: 'Soya Chunks in Onion-Tomato Gravy', quantity: '50g dry' },
      { name: 'Green Salad', quantity: '1 bowl' }
    ],
    servingSize: '2 Roti + Soya Sabzi + Salad',
    estimatedNutrition: { calories: 440, proteinGrams: 32, carbsGrams: 60, fatGrams: 5, fiberGrams: 11 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Boil soya chunks in water with salt for 5 mins; squeeze out excess water completely.',
      'Sauté with onions, tomatoes, coriander powder, and garam masala.',
      'Simmer for 5 mins. Serve hot with 2 rotis.'
    ],
    wellnessBenefits: [
      'Highest density vegetarian protein meal (32g protein per serving)',
      'Budget-friendly and rapid cooking time'
    ],
    tags: ['ultra-high-protein', 'budget-friendly', 'muscle-builder'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_palak_paneer_roti', 'm_soya_keema_roti', 'm_rajma_roti']
  },
  {
    id: 'm_dal_rice_curd',
    name: '1 Cup Steamed Rice + Yellow Dal Tadka + Curd + Salad',
    hindiName: 'दाल चावल दही',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Steamed Rice', quantity: '1 cup (150g)' },
      { name: 'Moong/Toor Dal Tadka', quantity: '1.5 bowls (220ml)' },
      { name: 'Fresh Curd', quantity: '100g' },
      { name: 'Kachumber Salad', quantity: '1 bowl' }
    ],
    servingSize: '1 Plate Dal Chawal + Curd',
    estimatedNutrition: { calories: 410, proteinGrams: 17, carbsGrams: 72, fatGrams: 6, fiberGrams: 7 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Cook dal with turmeric and salt; temper with cumin, garlic, and hing in 1 tsp ghee.',
      'Serve over steamed rice with fresh curd and kachumber.'
    ],
    wellnessBenefits: [
      'Archetypal complementary amino acid combination (Lysine + Methionine)',
      'Easy gastric emptying'
    ],
    tags: ['comfort-food', 'easy-digest', 'classic-indian'],
    suitableForPCOS: false,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_khichdi_ghee', 'm_sambhar_redrice', 'm_dal_mixveg_roti']
  },
  {
    id: 'm_dal_mixveg_roti',
    name: '1 Roti + Mix Veg Sabzi + Yellow Moong Dal + Curd',
    hindiName: 'दाल मिक्स वेज रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Whole Wheat Roti', quantity: '1 piece' },
      { name: 'Yellow Moong Dal', quantity: '1 bowl (150ml)' },
      { name: 'Mix Veg (Gobhi, Carrot, Beans)', quantity: '1 bowl (120g)' },
      { name: 'Curd / Dahi', quantity: '1 bowl (100g)' }
    ],
    servingSize: '1 Roti + Dal + Veg + Curd',
    estimatedNutrition: { calories: 390, proteinGrams: 17, carbsGrams: 55, fatGrams: 9, fiberGrams: 9 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Sauté seasonal mixed vegetables with cumin, turmeric, and coriander.',
      'Pair with hot moong dal, 1 roti, and refreshing curd.'
    ],
    wellnessBenefits: [
      'Broad micronutrient and antioxidant spectrum from diverse vegetables'
    ],
    tags: ['fiber-rich', 'balanced', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_rajma_roti', 'm_gobi_methi_dal', 'm_lauki_dal_roti']
  },
  {
    id: 'm_khichdi_ghee',
    name: 'Moong Dal Khichdi + 1 tsp Ghee + Curd + Papad',
    hindiName: 'मूंग दाल खिचड़ी',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Moong Dal & Rice (1:1 ratio)', quantity: '1 large bowl (250g)' },
      { name: 'Desi Cow Ghee', quantity: '1 tsp (5g)' },
      { name: 'Fresh Curd', quantity: '1 bowl (150g)' }
    ],
    servingSize: '1 Bowl Khichdi + Curd',
    estimatedNutrition: { calories: 390, proteinGrams: 16, carbsGrams: 62, fatGrams: 9, fiberGrams: 6 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Pressure cook equal parts yellow moong dal and rice with turmeric, salt, and ginger.',
      'Top with 1 tsp hot ghee and eat with curd.'
    ],
    wellnessBenefits: [
      'Optimal restorative meal for recovery days or low-digestive capacity days',
      'Butyric acid in ghee supports gut lining integrity'
    ],
    tags: ['recovery', 'gut-healing', 'comfort-food'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_dal_rice_curd', 'm_lauki_dal_roti', 'm_sambhar_redrice']
  },
  {
    id: 'm_lauki_dal_roti',
    name: 'Lauki Chana Dal + 1 Roti + Cucumber Salad',
    hindiName: 'लौकी चना दाल',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Bottle Gourd (Lauki) with Chana Dal', quantity: '1 large bowl (200g)' },
      { name: 'Whole Wheat Roti', quantity: '1 piece' },
      { name: 'Cucumber Salad', quantity: '1 bowl' }
    ],
    servingSize: '1 Roti + Lauki Dal + Salad',
    estimatedNutrition: { calories: 320, proteinGrams: 14, carbsGrams: 52, fatGrams: 5, fiberGrams: 10 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Cook diced lauki with chana dal, tomatoes, and cumin in a pressure cooker for 3 whistles.',
      'Serve hot with 1 roti.'
    ],
    wellnessBenefits: [
      'Bottle gourd has high water content and cooling digestive properties'
    ],
    tags: ['stomach-rest', 'low-calorie', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_dal_mixveg_roti', 'm_khichdi_ghee', 'm_baingan_bharta_dal']
  },
  {
    id: 'm_palak_paneer_roti',
    name: 'Palak Paneer (120g) + 2 Multigrain Rotis + Salad',
    hindiName: 'पालक पनीर + रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Fresh Spinach Gravy (Palak)', quantity: '150g' },
      { name: 'Low-Fat Paneer Cubes', quantity: '90g' },
      { name: 'Multigrain Roti', quantity: '2 pieces' },
      { name: 'Kachumber Salad', quantity: '1 bowl' }
    ],
    servingSize: '2 Rotis + Palak Paneer + Salad',
    estimatedNutrition: { calories: 450, proteinGrams: 24, carbsGrams: 48, fatGrams: 16, fiberGrams: 10 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Blanch spinach and blend into smooth vibrant green puree.',
      'Sauté with garlic, ginger, and garam masala; simmer paneer cubes for 4 minutes.',
      'Serve with warm multigrain rotis.'
    ],
    wellnessBenefits: [
      'Rich plant-based folate & iron paired with complete dairy protein',
      'Low glycemic index ideal for PCOS and sustained mental stamina'
    ],
    tags: ['high-protein', 'iron-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_matar_paneer_rice', 'm_soya_sabzi_roti', 'm_rajma_roti']
  },
  {
    id: 'm_kala_chana_curry',
    name: 'Kala Chana (Black Chickpea) Curry + 2 Rotis + Beet Salad',
    hindiName: 'काला चना करी',
    mealType: 'lunch',
    primaryProteinSource: 'rajma_chole',
    ingredients: [
      { name: 'Black Chickpeas (Kala Chana)', quantity: '1 bowl (180g)' },
      { name: 'Whole Wheat Roti', quantity: '2 pieces' },
      { name: 'Grated Beetroot & Carrot Salad', quantity: '1 bowl' }
    ],
    servingSize: '2 Rotis + Kala Chana + Beet Salad',
    estimatedNutrition: { calories: 430, proteinGrams: 20, carbsGrams: 68, fatGrams: 6, fiberGrams: 15 },
    preparationTimeMins: 25,
    recipeInstructions: [
      'Pressure cook black chickpeas with ginger, garlic, tomatoes, and roasted coriander powder.',
      'Serve with rotis and raw beetroot salad dressed with fresh lemon.'
    ],
    wellnessBenefits: [
      'Exceptional dietary iron and copper density for red blood cell synthesis',
      'Extremely low glycemic index for hormonal balance'
    ],
    tags: ['iron-rich', 'pcos-friendly', 'high-fiber', 'high-protein'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_rajma_roti', 'm_chole_curd_roti', 'm_soya_sabzi_roti']
  },
  {
    id: 'm_baingan_bharta_dal',
    name: 'Smoked Baingan Bharta + Yellow Toor Dal + 2 Rotis',
    hindiName: 'बैंगन भरता + दाल रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Roasted Smoked Eggplant (Baingan)', quantity: '1 bowl (150g)' },
      { name: 'Toor Dal Tadka', quantity: '1 bowl (150ml)' },
      { name: 'Whole Wheat Roti', quantity: '2 pieces' }
    ],
    servingSize: '2 Rotis + Bharta + Dal',
    estimatedNutrition: { calories: 380, proteinGrams: 16, carbsGrams: 62, fatGrams: 7, fiberGrams: 12 },
    preparationTimeMins: 22,
    recipeInstructions: [
      'Roast eggplant directly on open flame, peel skin, and mash.',
      'Sauté with chopped onions, tomatoes, and peas in 1 tsp oil.',
      'Pair with comforting toor dal and rotis.'
    ],
    wellnessBenefits: [
      'Nasunin in eggplant skin provides potent antioxidant protection against cell peroxidation'
    ],
    tags: ['fiber-rich', 'low-calorie', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_lauki_dal_roti', 'm_dal_mixveg_roti', 'm_gobi_methi_dal']
  },
  {
    id: 'm_matar_paneer_rice',
    name: 'Matar Paneer (100g) + 1 Cup Steamed Rice + Raita',
    hindiName: 'मटर पनीर + चावल',
    mealType: 'lunch',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Green Peas & Paneer Curry', quantity: '1 large bowl (200g)' },
      { name: 'Steamed Rice', quantity: '1 cup (150g)' },
      { name: 'Cucumber Mint Raita', quantity: '1 bowl (100g)' }
    ],
    servingSize: '1 Plate Matar Paneer + Rice + Raita',
    estimatedNutrition: { calories: 460, proteinGrams: 22, carbsGrams: 64, fatGrams: 12, fiberGrams: 8 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Simmer sweet green peas and paneer cubes in a spiced tomato-cashew milk gravy.',
      'Serve with steamed rice and cooling raita.'
    ],
    wellnessBenefits: [
      '22g protein from dairy and green legumes for athletic recovery'
    ],
    tags: ['high-protein', 'comfort-food', 'satisfying'],
    suitableForPCOS: false,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_palak_paneer_roti', 'm_soya_keema_roti', 'm_rajma_roti']
  },
  {
    id: 'm_soya_keema_roti',
    name: 'Soya Granules Keema Matar + 2 Rotis + Spiced Chaas',
    hindiName: 'सोया कीमा मटर',
    mealType: 'lunch',
    primaryProteinSource: 'soy_chunks',
    ingredients: [
      { name: 'Soya Granules Keema with Peas', quantity: '55g dry (large bowl)' },
      { name: 'Whole Wheat Roti', quantity: '2 pieces' },
      { name: 'Cold Spiced Buttermilk (Chaas)', quantity: '200ml' }
    ],
    servingSize: '2 Rotis + Soya Keema + Chaas',
    estimatedNutrition: { calories: 460, proteinGrams: 34, carbsGrams: 58, fatGrams: 6, fiberGrams: 13 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Soak soya granules in boiling water for 5 mins; drain and squeeze dry.',
      'Sauté with chopped onions, ginger, garlic, tomatoes, peas, and pav bhaji/garam masala.',
      'Serve hot with rotis and chaas.'
    ],
    wellnessBenefits: [
      'Peak protein powerhouse (34g protein) supporting lean tissue synthesis'
    ],
    tags: ['ultra-high-protein', 'muscle-fuel', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_soya_sabzi_roti', 'm_palak_paneer_roti', 'm_kala_chana_curry']
  },
  {
    id: 'm_dal_makhani_missi',
    name: 'Home-Style Dal Makhani (Low Butter) + 1 Missi Roti + Salad',
    hindiName: 'दाल मखनी + मिस्सी रोटी',
    mealType: 'lunch',
    primaryProteinSource: 'rajma_chole',
    ingredients: [
      { name: 'Black Urad & Rajma Dal (Slow Cooked)', quantity: '1 bowl (180ml)' },
      { name: 'Missi Roti (Besan & Wheat)', quantity: '1 piece' },
      { name: 'Onion, Tomato, Radish Salad', quantity: '1 plate' }
    ],
    servingSize: '1 Missi Roti + Dal Makhani + Salad',
    estimatedNutrition: { calories: 420, proteinGrams: 19, carbsGrams: 62, fatGrams: 9, fiberGrams: 12 },
    preparationTimeMins: 25,
    recipeInstructions: [
      'Slow cook whole black urad and rajma with tomato puree, ginger, and a touch of milk.',
      'Pair with 1 high-protein missi roti.'
    ],
    wellnessBenefits: [
      'High iron from black urad and slow-digesting complex carbs in missi roti'
    ],
    tags: ['iron-rich', 'traditional', 'high-protein'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_rajma_roti', 'm_kala_chana_curry', 'm_chole_curd_roti']
  },
  {
    id: 'm_gobi_methi_dal',
    name: 'Gobi Methi Sabzi + Masoor Dal Tadka + 2 Rotis',
    hindiName: 'गोभी मेथी + मसूर दाल',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Cauliflower & Fresh Fenugreek Sabzi', quantity: '1 bowl (140g)' },
      { name: 'Orange Masoor Dal Tadka', quantity: '1 bowl (150ml)' },
      { name: 'Whole Wheat Roti', quantity: '2 pieces' }
    ],
    servingSize: '2 Rotis + Sabzi + Dal',
    estimatedNutrition: { calories: 390, proteinGrams: 18, carbsGrams: 64, fatGrams: 6, fiberGrams: 11 },
    preparationTimeMins: 20,
    recipeInstructions: [
      'Stir fry florets of cauliflower with fresh bitter methi leaves and spices.',
      'Serve alongside freshly tempered red masoor dal and 2 rotis.'
    ],
    wellnessBenefits: [
      'Fenugreek enhances glucose sensitivity; masoor dal provides fast-absorbing iron'
    ],
    tags: ['pcos-friendly', 'iron-rich', 'fiber-rich'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_dal_mixveg_roti', 'm_baingan_bharta_dal', 'm_lauki_dal_roti']
  },
  {
    id: 'm_sambhar_redrice',
    name: 'Vegetable Sambhar + Steamed Red Rice + Cabbage Poriyal',
    hindiName: 'सांभर + रेड राइस + पोरियाल',
    mealType: 'lunch',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Drumstick Pumpkin Toor Dal Sambhar', quantity: '1.5 bowls (220ml)' },
      { name: 'Steamed Red / Brown Rice', quantity: '1 cup (140g)' },
      { name: 'Cabbage Poriyal with Mustard & Coconut', quantity: '1 bowl (100g)' }
    ],
    servingSize: '1 Plate Sambhar Rice + Poriyal',
    estimatedNutrition: { calories: 400, proteinGrams: 16, carbsGrams: 70, fatGrams: 6, fiberGrams: 10 },
    preparationTimeMins: 22,
    recipeInstructions: [
      'Boil toor dal with tamarind, turmeric, and fresh vegetables; finish with mustard-curry leaf tadka.',
      'Serve over mineral-rich red rice with crunchy cabbage poriyal.'
    ],
    wellnessBenefits: [
      'Anthocyanins from red rice and glucosinolates from cabbage protect cell health'
    ],
    tags: ['antioxidant', 'fiber-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_dal_rice_curd', 'm_khichdi_ghee', 'm_dal_mixveg_roti']
  },

  // ==========================================
  // 15 DINNER MEALS (15 UNIQUE DAYS)
  // ==========================================
  {
    id: 'm_paneer_bhurji_dinner',
    name: 'Paneer Bhurji (100g) + Sautéed Spinach (No Roti)',
    hindiName: 'पनीर भुर्जी + पालक',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Low-Fat Fresh Paneer (Crumbled)', quantity: '100g' },
      { name: 'Fresh Spinach (Palak)', quantity: '100g' },
      { name: 'Tomatoes, Onions, Green Chillies', quantity: '1/2 cup' },
      { name: 'Mustard Oil / Ghee', quantity: '1 tsp' }
    ],
    servingSize: '1 Plate Paneer Bhurji',
    estimatedNutrition: { calories: 290, proteinGrams: 20, carbsGrams: 9, fatGrams: 18, fiberGrams: 4 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Sauté cumin, chopped onions, and tomatoes in 1 tsp oil.',
      'Add chopped spinach and cook until wilted (2 mins).',
      'Fold in crumbled paneer, turmeric, and garam masala; toss on high heat.'
    ],
    wellnessBenefits: [
      'Slow-digesting Casein protein provides sustained amino acid release during sleep',
      'Non-heme iron in spinach combined with light evening satiety'
    ],
    tags: ['high-protein', 'low-carb', 'no-roti', 'pcos-friendly', 'iron-rich'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_tofu_bhurji_dinner', 'm_grilled_paneer_soup', 'm_methi_paneer_dinner']
  },
  {
    id: 'm_tofu_bhurji_dinner',
    name: 'Tofu Bhurji (120g) + Bell Peppers + 1 Roti',
    hindiName: 'टोफू भुर्जी',
    mealType: 'dinner',
    primaryProteinSource: 'tofu',
    ingredients: [
      { name: 'Firm Tofu (Crumbled)', quantity: '120g' },
      { name: 'Diced Bell Peppers (Shimla Mirch)', quantity: '1/2 cup' },
      { name: 'Whole Wheat Roti', quantity: '1 piece' }
    ],
    servingSize: '1 Plate Tofu + 1 Roti',
    estimatedNutrition: { calories: 310, proteinGrams: 20, carbsGrams: 26, fatGrams: 12, fiberGrams: 5 },
    preparationTimeMins: 10,
    recipeInstructions: [
      'Crumble tofu with hands.',
      'Sauté bell peppers, onions, and turmeric in a non-stick pan.',
      'Toss tofu on high flame with salt and freshly cracked black pepper. Serve with 1 roti.'
    ],
    wellnessBenefits: [
      'Plant isoflavones support hormonal balance with low evening glycemic load'
    ],
    tags: ['vegan', 'dairy-free', 'pcos-friendly', 'high-protein'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_paneer_bhurji_dinner', 'm_grilled_tofu_skewers', 'm_besan_chilla_dinner']
  },
  {
    id: 'm_grilled_paneer_soup',
    name: 'Grilled Paneer (100g) + Clear Vegetable Soup',
    hindiName: 'ग्रिल्ड पनीर + सूप',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Low-Fat Paneer Cubes', quantity: '100g' },
      { name: 'Clear Vegetable Soup (Cabbage, Carrot, Garlic)', quantity: '1 large bowl (250ml)' },
      { name: 'Chaat Masala & Lemon', quantity: 'to taste' }
    ],
    servingSize: 'Paneer Skewers/Cubes + Soup',
    estimatedNutrition: { calories: 260, proteinGrams: 19, carbsGrams: 8, fatGrams: 15, fiberGrams: 3 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Pan-sear paneer cubes with chaat masala and black pepper on a hot tawa with 1/2 tsp oil.',
      'Simmer vegetable broth with shredded cabbage, carrots, ginger, and garlic.',
      'Enjoy hot soup with grilled paneer on the side.'
    ],
    wellnessBenefits: [
      'Ultra light evening meal prevents night-time acid reflux and metabolic stress'
    ],
    tags: ['light-dinner', 'low-carb', 'high-protein', 'warm-soothing'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_paneer_bhurji_dinner', 'm_lauki_soup_paneer', 'm_stirfry_paneer']
  },
  {
    id: 'm_stirfry_paneer',
    name: 'Stir Fry Veggies + Sautéed Paneer (80g)',
    hindiName: 'स्टिर फ्राई वेजीज + पनीर',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Paneer Cubes', quantity: '80g' },
      { name: 'Broccoli, Bell Peppers, Mushrooms, Beans', quantity: '1.5 cups' },
      { name: 'Soy Sauce, Ginger Garlic, Black Pepper', quantity: '1 tbsp' }
    ],
    servingSize: '1 Large Stir Fry Bowl',
    estimatedNutrition: { calories: 280, proteinGrams: 18, carbsGrams: 14, fatGrams: 16, fiberGrams: 6 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Toss minced garlic, ginger, and chopped vegetables on high heat in a wok for 3 mins.',
      'Add paneer cubes, soy sauce, and black pepper; stir fry until vegetables are crisp-tender.'
    ],
    wellnessBenefits: [
      'High sulforaphane from broccoli and sulfur compounds from mushrooms support cellular detox'
    ],
    tags: ['high-protein', 'crisp-veggies', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_paneer_bhurji_dinner', 'm_methi_paneer_dinner', 'm_grilled_paneer_soup']
  },
  {
    id: 'm_bhindi_dal',
    name: 'Bhindi (Okra) Fry + Yellow Moong Dal + 1 Roti',
    hindiName: 'भिंडी फ्राई + मूंग दाल',
    mealType: 'dinner',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Fresh Bhindi (Okra) sautéed', quantity: '1 bowl (120g)' },
      { name: 'Moong Dal', quantity: '1 bowl (150ml)' },
      { name: 'Whole Wheat Roti', quantity: '1 piece' }
    ],
    servingSize: '1 Roti + Bhindi + Dal',
    estimatedNutrition: { calories: 310, proteinGrams: 13, carbsGrams: 48, fatGrams: 7, fiberGrams: 8 },
    preparationTimeMins: 18,
    recipeInstructions: [
      'Sauté dry sliced bhindi with cumin, amchur, and turmeric until non-slimy and crisp.',
      'Serve with a comforting bowl of moong dal and 1 roti.'
    ],
    wellnessBenefits: [
      'Okra mucilage soothes digestive mucosa and binds bile acids'
    ],
    tags: ['easy-digestion', 'home-style', 'classic-indian'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_besan_chilla_dinner', 'm_moong_soup_beans', 'm_salad_curd_dinner']
  },
  {
    id: 'm_besan_chilla_dinner',
    name: 'Besan Chilla (2) + Tomato Onion Salad',
    hindiName: 'बेसन चीला डिनर',
    mealType: 'dinner',
    primaryProteinSource: 'besan',
    ingredients: [
      { name: 'Gram Flour (Besan)', quantity: '60g' },
      { name: 'Tomato, Onion, Coriander', quantity: '1/2 cup' },
      { name: 'Mint Chutney', quantity: '1 tbsp' }
    ],
    servingSize: '2 Light Chillas + Salad',
    estimatedNutrition: { calories: 270, proteinGrams: 14, carbsGrams: 38, fatGrams: 5, fiberGrams: 6 },
    preparationTimeMins: 10,
    recipeInstructions: [
      'Make a thin besan batter with finely chopped onions, tomatoes, and ajwain.',
      'Cook on low oil on a flat tawa until crisp.'
    ],
    wellnessBenefits: [
      'Light protein option without heavy grains right before bed'
    ],
    tags: ['quick-dinner', 'light-protein', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_paneer_bhurji_dinner', 'm_tofu_bhurji_dinner', 'm_bhindi_dal']
  },
  {
    id: 'm_salad_curd_dinner',
    name: 'Large Rainbow Salad + 1 Big Bowl Fresh Curd',
    hindiName: 'सलाद + दही',
    mealType: 'dinner',
    primaryProteinSource: 'curd_dairy',
    ingredients: [
      { name: 'Fresh Curd / Dahi with Jeera Powder', quantity: '200g' },
      { name: 'Cucumber, Beetroot, Carrots, Tomato, Pomegranate', quantity: '1 large bowl' },
      { name: 'Roasted Flaxseeds', quantity: '1 tbsp' }
    ],
    servingSize: '1 Salad Bowl + Curd',
    estimatedNutrition: { calories: 250, proteinGrams: 12, carbsGrams: 28, fatGrams: 9, fiberGrams: 6 },
    preparationTimeMins: 8,
    recipeInstructions: [
      'Toss diced vegetables with rock salt, chaat masala, and roasted flaxseeds.',
      'Pair with thick probiotic curd sprinkled with roasted cumin.'
    ],
    wellnessBenefits: [
      'Probiotics + prebiotic fiber promote deep nocturnal gut rest'
    ],
    tags: ['probiotics', 'gut-rest', 'iron-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_grilled_paneer_soup', 'm_roasted_chickpea_salad', 'm_pumpkin_soup_cheese']
  },
  {
    id: 'm_methi_paneer_dinner',
    name: 'Methi Paneer (100g) + Sautéed Zucchini & Mushrooms',
    hindiName: 'मेथी पनीर + जुकिनी',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Fresh Methi Leaves & Paneer Cubes', quantity: '100g paneer' },
      { name: 'Zucchini & Button Mushrooms', quantity: '1 cup sliced' },
      { name: 'Turmeric, Ginger, Black Pepper', quantity: '1 tsp' }
    ],
    servingSize: '1 Skillet Bowl (No Roti)',
    estimatedNutrition: { calories: 280, proteinGrams: 20, carbsGrams: 11, fatGrams: 16, fiberGrams: 5 },
    preparationTimeMins: 14,
    recipeInstructions: [
      'Sauté ginger, mushrooms, and zucchini on high heat.',
      'Add fresh methi leaves and paneer cubes; toss with black pepper and salt.'
    ],
    wellnessBenefits: [
      'Potent blood-sugar stabilizer; zero grain spike before sleep'
    ],
    tags: ['pcos-friendly', 'keto-friendly', 'high-protein'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_paneer_bhurji_dinner', 'm_stirfry_paneer', 'm_grilled_tofu_skewers']
  },
  {
    id: 'm_tomato_lentil_soup_soya',
    name: 'Tomato Lentil Soup + Sautéed Soya Chunks (60g)',
    hindiName: 'टमाटर सूप + सोया चंक्स',
    mealType: 'dinner',
    primaryProteinSource: 'soy_chunks',
    ingredients: [
      { name: 'Tomato Moong Dal Soup', quantity: '1 large bowl (250ml)' },
      { name: 'Soya Chunks pan-seared with chaat masala', quantity: '40g dry' }
    ],
    servingSize: '1 Bowl Soup + Soya Nuggets',
    estimatedNutrition: { calories: 270, proteinGrams: 26, carbsGrams: 25, fatGrams: 4, fiberGrams: 8 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Prepare warm tomato-lentil broth with ginger and crushed black pepper.',
      'Pan-sear boiled soya chunks until crisp on the exterior and serve together.'
    ],
    wellnessBenefits: [
      'Massive 26g protein in a light 270 kcal dinner; ideal for fat loss while preventing muscle loss'
    ],
    tags: ['ultra-high-protein', 'low-calorie', 'fat-loss-hero'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_tofu_bhurji_dinner', 'm_soya_stirfry_jowar', 'm_paneer_bhurji_dinner']
  },
  {
    id: 'm_roasted_chickpea_salad',
    name: 'Warm Roasted Chickpeas & Broccoli Bowl with Tahini Lemon',
    hindiName: 'चना ब्रोकली सलाद',
    mealType: 'dinner',
    primaryProteinSource: 'rajma_chole',
    ingredients: [
      { name: 'Boiled Chickpeas (Roasted crisp)', quantity: '100g' },
      { name: 'Steamed Broccoli & Red Cabbage', quantity: '1 cup' },
      { name: 'Tahini Sesame Dressing + Lemon', quantity: '1 tbsp' }
    ],
    servingSize: '1 Large Nourish Salad',
    estimatedNutrition: { calories: 290, proteinGrams: 14, carbsGrams: 36, fatGrams: 10, fiberGrams: 9 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Roast boiled chickpeas in a pan with cumin, smoked paprika, and rock salt till crunchy.',
      'Toss with warm steamed broccoli and lemon-tahini dressing.'
    ],
    wellnessBenefits: [
      'Anti-inflammatory cruciferous antioxidants + sesame lignans for hormonal clearance'
    ],
    tags: ['pcos-friendly', 'anti-inflammatory', 'vegan', 'high-fiber'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_salad_curd_dinner', 'm_tofu_bhurji_dinner', 'm_grilled_tofu_skewers']
  },
  {
    id: 'm_grilled_tofu_skewers',
    name: 'Grilled Tofu Cubes (120g) + Mint Dip + Steamed Beans',
    hindiName: 'ग्रिल्ड टोफू + हरी बीन्स',
    mealType: 'dinner',
    primaryProteinSource: 'tofu',
    ingredients: [
      { name: 'Firm Tofu (Marinated in curd & spices)', quantity: '120g' },
      { name: 'Steamed Green Beans & Carrots', quantity: '1 cup' },
      { name: 'Mint Chutney', quantity: '2 tbsp' }
    ],
    servingSize: '1 Plate Tofu Tikka + Veggies',
    estimatedNutrition: { calories: 260, proteinGrams: 21, carbsGrams: 12, fatGrams: 13, fiberGrams: 6 },
    preparationTimeMins: 14,
    recipeInstructions: [
      'Marinate tofu in curd, ginger-garlic paste, and tandoori masala.',
      'Grill on tawa until char marks form; serve with steamed green beans.'
    ],
    wellnessBenefits: [
      '21g light plant protein with low glycemic impact'
    ],
    tags: ['high-protein', 'low-carb', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_tofu_bhurji_dinner', 'm_paneer_bhurji_dinner', 'm_stirfry_paneer']
  },
  {
    id: 'm_lauki_soup_paneer',
    name: 'Bottle Gourd (Lauki) Soup + Pan-Seared Paneer (70g)',
    hindiName: 'लौकी सूप + पनीर',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Smooth Pureed Lauki Soup with Ginger & Jeera', quantity: '1 large bowl (250ml)' },
      { name: 'Paneer Cubes', quantity: '70g' }
    ],
    servingSize: '1 Bowl Warm Soup + Paneer',
    estimatedNutrition: { calories: 230, proteinGrams: 15, carbsGrams: 9, fatGrams: 14, fiberGrams: 4 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Boil lauki with ginger, cumin, and black pepper; blend into a silky soothing soup.',
      'Top with golden pan-seared paneer cubes.'
    ],
    wellnessBenefits: [
      'Deep stomach reset for heavy study/work days; zero bloating'
    ],
    tags: ['digestive-reset', 'light-dinner', 'low-carb'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_grilled_paneer_soup', 'm_moong_soup_beans', 'm_pumpkin_soup_cheese']
  },
  {
    id: 'm_moong_soup_beans',
    name: 'Yellow Moong Rasam / Soup + Sautéed French Beans',
    hindiName: 'मूंग रसम + बीन्स',
    mealType: 'dinner',
    primaryProteinSource: 'dal_moong',
    ingredients: [
      { name: 'Moong Dal Broth with Curry leaves & Hing', quantity: '1 large bowl (250ml)' },
      { name: 'French Beans sautéed with mustard seeds', quantity: '1 bowl (100g)' }
    ],
    servingSize: '1 Large Moong Soup + Beans',
    estimatedNutrition: { calories: 220, proteinGrams: 13, carbsGrams: 32, fatGrams: 4, fiberGrams: 7 },
    preparationTimeMins: 12,
    recipeInstructions: [
      'Simmer thin moong dal with tamarind, tomato, black pepper, and curry leaves.',
      'Drink as a restorative hot broth with sautéed crunchy green beans.'
    ],
    wellnessBenefits: [
      'Cleansing, alkaline, and gentle on the hepatic metabolic pathways'
    ],
    tags: ['gentle-digest', 'alkaline', 'recovery'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_bhindi_dal', 'm_lauki_soup_paneer', 'm_tomato_lentil_soup_soya']
  },
  {
    id: 'm_soya_stirfry_jowar',
    name: 'Soya Granules Capsicum Bhurji + 1 Jowar (Sorghum) Roti',
    hindiName: 'सोया भुर्जी + ज्वार रोटी',
    mealType: 'dinner',
    primaryProteinSource: 'soy_chunks',
    ingredients: [
      { name: 'Soya Granules with Bell Peppers', quantity: '45g dry' },
      { name: 'Jowar (Sorghum Millet) Roti', quantity: '1 piece' }
    ],
    servingSize: '1 Jowar Roti + Soya Bhurji',
    estimatedNutrition: { calories: 340, proteinGrams: 28, carbsGrams: 40, fatGrams: 6, fiberGrams: 10 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Cook seasoned soya granules with green bell peppers and garam masala.',
      'Pair with 1 gluten-free jowar roti.'
    ],
    wellnessBenefits: [
      'Complex gluten-free carbs paired with 28g plant protein'
    ],
    tags: ['gluten-free', 'high-protein', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_tofu_bhurji_dinner', 'm_paneer_bhurji_dinner', 'm_soya_keema_roti']
  },
  {
    id: 'm_pumpkin_soup_cheese',
    name: 'Roasted Pumpkin & Carrot Soup + 60g Paneer / Cottage Cheese',
    hindiName: 'कद्दू सूप + पनीर',
    mealType: 'dinner',
    primaryProteinSource: 'paneer',
    ingredients: [
      { name: 'Roasted Red Pumpkin & Carrot Soup', quantity: '1 large bowl (250ml)' },
      { name: 'Low-Fat Paneer / Cottage Cheese', quantity: '60g' },
      { name: 'Roasted Pumpkin Seeds', quantity: '1 tbsp' }
    ],
    servingSize: '1 Bowl Velvety Soup + Cheese',
    estimatedNutrition: { calories: 250, proteinGrams: 15, carbsGrams: 20, fatGrams: 12, fiberGrams: 5 },
    preparationTimeMins: 15,
    recipeInstructions: [
      'Roast and blend pumpkin and carrots with garlic and a hint of nutmeg.',
      'Serve warm topped with paneer cubes and crunchy pumpkin seeds.'
    ],
    wellnessBenefits: [
      'Tryptophan from pumpkin seeds and casein protein support melatonin and deep sleep architecture'
    ],
    tags: ['sleep-support', 'circadian-fuel', 'light-dinner'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_grilled_paneer_soup', 'm_salad_curd_dinner', 'm_lauki_soup_paneer']
  },

  // ==========================================
  // 15 SNACKS / MID-MEAL FUEL (15 UNIQUE DAYS)
  // ==========================================
  {
    id: 'm_snack_banana_coffee',
    name: '1 Banana + Black Coffee + 1 tsp Roasted Flaxseeds',
    hindiName: 'केला + कॉफी + अलसी',
    mealType: 'snack',
    primaryProteinSource: 'sprouts',
    ingredients: [
      { name: 'Ripe Banana', quantity: '1 medium (100g)' },
      { name: 'Black Coffee (No sugar)', quantity: '1 cup' },
      { name: 'Roasted Flaxseeds', quantity: '1 tsp' }
    ],
    servingSize: '1 Serving Pre-Workout',
    estimatedNutrition: { calories: 140, proteinGrams: 2, carbsGrams: 28, fatGrams: 3, fiberGrams: 4 },
    preparationTimeMins: 2,
    recipeInstructions: ['Slice banana, sprinkle roasted flaxseeds, and sip hot black coffee.'],
    wellnessBenefits: ['Rapid glycogen availability for high-intensity training with caffeine focus'],
    tags: ['pre-workout', 'quick-energy'],
    suitableForPCOS: false,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_whey_water', 'm_snack_sattu_drink', 'm_snack_sprouts_chaat']
  },
  {
    id: 'm_snack_whey_water',
    name: '1 Scoop Whey / Plant Protein Shake (24g Protein)',
    hindiName: 'प्रोटीन शेक',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Whey Protein Isolate / Plant Blend', quantity: '1 scoop (30g)' }, { name: 'Chilled Water', quantity: '250ml' }],
    servingSize: '1 Shaker Cup',
    estimatedNutrition: { calories: 120, proteinGrams: 24, carbsGrams: 2, fatGrams: 1, fiberGrams: 0 },
    preparationTimeMins: 1,
    recipeInstructions: ['Shake vigorously in 250ml chilled water.'],
    wellnessBenefits: ['Rapid leucine spike for muscle protein synthesis'],
    tags: ['post-workout', 'high-protein'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_sattu_drink', 'm_snack_greek_yogurt', 'm_snack_sprouts_chaat']
  },
  {
    id: 'm_snack_sattu_drink',
    name: 'Chana Sattu Drink (40g) + Roasted Jeera + Lemon',
    hindiName: 'सत्तू शरबत',
    mealType: 'snack',
    primaryProteinSource: 'besan',
    ingredients: [
      { name: 'Chana Sattu Powder', quantity: '40g' },
      { name: 'Cold Water', quantity: '250ml' },
      { name: 'Roasted Cumin (Jeera), Black Salt, Lemon', quantity: 'to taste' }
    ],
    servingSize: '1 Large Glass',
    estimatedNutrition: { calories: 165, proteinGrams: 10, carbsGrams: 26, fatGrams: 2, fiberGrams: 7 },
    preparationTimeMins: 2,
    recipeInstructions: ['Whisk sattu in cold water with black salt, cumin powder, and fresh lemon.'],
    wellnessBenefits: ['Cooling electrolytes with plant protein and immense gut satiety'],
    tags: ['traditional', 'high-fiber', 'pcos-friendly', 'iron-rich'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_snack_whey_water', 'm_snack_sprouts_chaat', 'm_snack_masala_chaas']
  },
  {
    id: 'm_snack_sprouts_chaat',
    name: 'Steamed Moong Sprouts Chaat (100g) + Lemon',
    hindiName: 'मूंग स्प्राउट्स चाट',
    mealType: 'snack',
    primaryProteinSource: 'sprouts',
    ingredients: [{ name: 'Moong Sprouts', quantity: '100g' }, { name: 'Tomato, Onion, Lemon', quantity: '3 tbsp' }],
    servingSize: '1 Bowl',
    estimatedNutrition: { calories: 130, proteinGrams: 9, carbsGrams: 22, fatGrams: 1, fiberGrams: 6 },
    preparationTimeMins: 5,
    recipeInstructions: ['Mix sprouts with diced tomato, onion, rock salt, and lemon.'],
    wellnessBenefits: ['High living enzymes, dietary fiber, and micronutrients'],
    tags: ['clean-eating', 'high-fiber', 'iron-rich', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_snack_sattu_drink', 'm_snack_bhuna_chana', 'm_snack_almonds_walnuts']
  },
  {
    id: 'm_snack_almonds_walnuts',
    name: '5 Soaked Almonds + 1 Walnut + 1 Cup Coconut Water',
    hindiName: 'बादाम + अखरोट + नारियल पानी',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Soaked Peeled Almonds', quantity: '5 pcs' }, { name: 'Walnut Halves', quantity: '2 pcs' }, { name: 'Fresh Coconut Water', quantity: '1 cup' }],
    servingSize: '1 Handful + Drink',
    estimatedNutrition: { calories: 140, proteinGrams: 4, carbsGrams: 12, fatGrams: 9, fiberGrams: 3 },
    preparationTimeMins: 1,
    recipeInstructions: ['Peel soaked almonds and enjoy with walnuts and natural coconut water.'],
    wellnessBenefits: ['Natural potassium electrolytes and neuroprotective omega-3 fatty acids'],
    tags: ['brain-fuel', 'natural-hydration', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_apple_greentea', 'm_snack_makhana', 'm_snack_trail_mix']
  },
  {
    id: 'm_snack_apple_greentea',
    name: '1 Crisp Apple + Warm Green Tea + 1 tbsp Pumpkin Seeds',
    hindiName: 'सेब + ग्रीन टी + कद्दू के बीज',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Fresh Apple', quantity: '1 medium' }, { name: 'Green Tea (No sugar)', quantity: '1 cup' }, { name: 'Raw Pumpkin Seeds', quantity: '10g' }],
    servingSize: '1 Sliced Apple + Tea',
    estimatedNutrition: { calories: 150, proteinGrams: 4, carbsGrams: 26, fatGrams: 5, fiberGrams: 5 },
    preparationTimeMins: 3,
    recipeInstructions: ['Slice apple, sprinkle pumpkin seeds, and sip warm green tea.'],
    wellnessBenefits: ['EGCG catechins boost fat oxidation; quercetin supports anti-inflammation'],
    tags: ['antioxidant', 'fat-loss', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_almonds_walnuts', 'm_snack_makhana', 'm_snack_chia_lemonade']
  },
  {
    id: 'm_snack_makhana',
    name: 'Roasted Makhana (Foxnuts 30g) in 1/2 tsp Ghee & Rock Salt',
    hindiName: 'रोस्टेड मखाना',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Foxnuts (Phool Makhana)', quantity: '30g' }, { name: 'Desi Ghee', quantity: '1/2 tsp' }, { name: 'Black Salt & Pepper', quantity: 'to taste' }],
    servingSize: '1 Medium Bowl',
    estimatedNutrition: { calories: 130, proteinGrams: 3, carbsGrams: 24, fatGrams: 3, fiberGrams: 4 },
    preparationTimeMins: 5,
    recipeInstructions: ['Roast makhana on low heat in a skillet with ghee until crunchy; season.'],
    wellnessBenefits: ['Low-sodium, high magnesium snack that stabilizes blood pressure and cravings'],
    tags: ['crunchy-snack', 'low-calorie', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_bhuna_chana', 'm_snack_apple_greentea', 'm_snack_trail_mix']
  },
  {
    id: 'm_snack_masala_chaas',
    name: 'Spiced Masala Buttermilk (Chaas) with Mint & Ginger',
    hindiName: 'मसाला छाछ',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Fresh Curd (Churned)', quantity: '100g' }, { name: 'Water', quantity: '150ml' }, { name: 'Mint, Ginger, Hing, Black Salt', quantity: 'to taste' }],
    servingSize: '1 Tall Glass (250ml)',
    estimatedNutrition: { calories: 75, proteinGrams: 4, carbsGrams: 6, fatGrams: 3, fiberGrams: 1 },
    preparationTimeMins: 3,
    recipeInstructions: ['Blend curd, cold water, mint, and roasted cumin; serve chilled.'],
    wellnessBenefits: ['Live lactic cultures restore gut integrity and cool afternoon acidity'],
    tags: ['probiotic', 'cooling', 'digestive-tonic', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_sattu_drink', 'm_snack_chia_lemonade', 'm_snack_greek_yogurt']
  },
  {
    id: 'm_snack_bhuna_chana',
    name: 'Roasted Black Gram (Bhuna Chana 40g) + Jaggery Piece',
    hindiName: 'भुना चना + गुड़',
    mealType: 'snack',
    primaryProteinSource: 'rajma_chole',
    ingredients: [{ name: 'Roasted Bengal Gram with husk', quantity: '40g' }, { name: 'Organic Jaggery (Gur)', quantity: '10g' }],
    servingSize: '1 Snack Bowl',
    estimatedNutrition: { calories: 180, proteinGrams: 8, carbsGrams: 32, fatGrams: 2, fiberGrams: 7 },
    preparationTimeMins: 1,
    recipeInstructions: ['Enjoy roasted chana with a small piece of jaggery.'],
    wellnessBenefits: ['Synergistic iron-rich pairing recognized in traditional Indian nutrition for combating fatigue'],
    tags: ['iron-rich', 'traditional-snack', 'energy-boost'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_snack_sattu_drink', 'm_snack_sprouts_chaat', 'm_snack_makhana']
  },
  {
    id: 'm_snack_chia_lemonade',
    name: 'Chia Seed Lime Hydrator (1 tbsp Chia + Mint + Lemon)',
    hindiName: 'चिया लेमनेड',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Chia Seeds (Soaked)', quantity: '1 tbsp (12g)' }, { name: 'Fresh Lemon Juice & Rock Salt', quantity: '1 lemon' }, { name: 'Water', quantity: '300ml' }],
    servingSize: '1 Large Glass',
    estimatedNutrition: { calories: 65, proteinGrams: 3, carbsGrams: 6, fatGrams: 4, fiberGrams: 5 },
    preparationTimeMins: 5,
    recipeInstructions: ['Soak chia seeds for 10 mins in water; add fresh lemon juice, black salt, and mint.'],
    wellnessBenefits: ['Soluble mucilage slows gastric carbohydrate absorption; high ALA Omega-3'],
    tags: ['pcos-friendly', 'insulin-sensitizing', 'hydration'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_masala_chaas', 'm_snack_apple_greentea', 'm_snack_almonds_walnuts']
  },
  {
    id: 'm_snack_greek_yogurt',
    name: 'Greek Yogurt / Hung Curd (120g) + Blueberries & Chia',
    hindiName: 'हंग कर्ड + बेरी',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Thick Hung Curd / Greek Yogurt', quantity: '120g' }, { name: 'Fresh Blueberries or Pomegranate', quantity: '2 tbsp' }, { name: 'Chia Seeds', quantity: '1 tsp' }],
    servingSize: '1 Bowl',
    estimatedNutrition: { calories: 150, proteinGrams: 12, carbsGrams: 14, fatGrams: 4, fiberGrams: 3 },
    preparationTimeMins: 2,
    recipeInstructions: ['Top cold hung curd with berries and chia seeds.'],
    wellnessBenefits: ['12g casein protein paired with anthocyanin polyphenols'],
    tags: ['high-protein', 'probiotic', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_whey_water', 'm_snack_masala_chaas', 'm_snack_sprouts_chaat']
  },
  {
    id: 'm_snack_cucumber_hummus',
    name: 'Cucumber & Carrot Sticks + 2 tbsp Roasted Chana Dip / Hummus',
    hindiName: 'सलाद स्टिक्स + हमस',
    mealType: 'snack',
    primaryProteinSource: 'rajma_chole',
    ingredients: [{ name: 'Cucumber & Carrot batons', quantity: '1 cup' }, { name: 'Homemade Chickpea Hummus', quantity: '30g' }],
    servingSize: '1 Plate Dippers',
    estimatedNutrition: { calories: 110, proteinGrams: 4, carbsGrams: 14, fatGrams: 5, fiberGrams: 4 },
    preparationTimeMins: 4,
    recipeInstructions: ['Slice raw cucumber and carrots; dip into spiced chickpea tahini hummus.'],
    wellnessBenefits: ['High fiber and water volume delivers zero-guilt crunch'],
    tags: ['low-calorie', 'pcos-friendly', 'fiber-rich'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_makhana', 'm_snack_sprouts_chaat', 'm_snack_apple_greentea']
  },
  {
    id: 'm_snack_chamomile_almonds',
    name: 'Warm Chamomile / Ashwagandha Tea + 4 Soaked Almonds',
    hindiName: 'अश्वगंधा टी + बादाम',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Ashwagandha / Chamomile Herbal Infusion', quantity: '1 cup' }, { name: 'Soaked Almonds', quantity: '4 pcs' }],
    servingSize: '1 Night Mug',
    estimatedNutrition: { calories: 50, proteinGrams: 2, carbsGrams: 2, fatGrams: 4, fiberGrams: 1 },
    preparationTimeMins: 4,
    recipeInstructions: ['Brew warm herbal tea for 5 minutes; eat peeled almonds alongside.'],
    wellnessBenefits: ['Adaptogens lower nocturnal cortisol and accelerate parasympathetic sleep onset'],
    tags: ['circadian-relax', 'sleep-tonic', 'pcos-friendly'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_turmeric_milk', 'm_snack_almonds_walnuts', 'm_snack_chia_lemonade']
  },
  {
    id: 'm_snack_trail_mix',
    name: 'Roasted Pumpkin, Sunflower & Flaxseed Mix (25g)',
    hindiName: 'सीड मिक्स',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Mixed Roasted Pumpkin, Sunflower, Flax Seeds', quantity: '25g' }, { name: 'Pink Salt', quantity: 'pinch' }],
    servingSize: '1 Small Handful',
    estimatedNutrition: { calories: 140, proteinGrams: 6, carbsGrams: 5, fatGrams: 12, fiberGrams: 4 },
    preparationTimeMins: 1,
    recipeInstructions: ['Munch on roasted mixed seeds as a mineral-dense afternoon bite.'],
    wellnessBenefits: ['Rich in zinc and magnesium essential for hormonal synthesis and ovarian health'],
    tags: ['pcos-friendly', 'mineral-dense', 'healthy-fats'],
    suitableForPCOS: true,
    suitableForIronBoost: true,
    alternativeMealIds: ['m_snack_makhana', 'm_snack_almonds_walnuts', 'm_snack_bhuna_chana']
  },
  {
    id: 'm_snack_turmeric_milk',
    name: 'Golden Turmeric Milk (Low-Fat / Almond Milk) with Black Pepper',
    hindiName: 'हल्दी दूध',
    mealType: 'snack',
    primaryProteinSource: 'curd_dairy',
    ingredients: [{ name: 'Low-Fat Cow Milk or Almond Milk', quantity: '180ml' }, { name: 'Organic Turmeric (Curcumin) & Black Pepper', quantity: '1/2 tsp' }, { name: 'Cardamom (Elaichi)', quantity: '1 pinch' }],
    servingSize: '1 Warm Mug',
    estimatedNutrition: { calories: 95, proteinGrams: 6, carbsGrams: 9, fatGrams: 3, fiberGrams: 0 },
    preparationTimeMins: 5,
    recipeInstructions: ['Warm milk with turmeric, crushed green cardamom, and a pinch of black pepper (piperine enhances curcumin absorption by 2000%).'],
    wellnessBenefits: ['Anti-inflammatory recovery tonic that promotes deep sleep and joint comfort'],
    tags: ['anti-inflammatory', 'sleep-aid', 'immunity'],
    suitableForPCOS: true,
    suitableForIronBoost: false,
    alternativeMealIds: ['m_snack_chamomile_almonds', 'm_snack_masala_chaas', 'm_snack_whey_water']
  }
];
