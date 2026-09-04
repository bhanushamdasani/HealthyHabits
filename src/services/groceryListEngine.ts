import { UserProfile, CuratedMeal } from '../types';
import { getMealPlanForDate } from './dietPlannerEngine';
import { addDays } from '../utils/dateUtils';

export interface GroceryItem {
  id: string;
  name: string;
  category: 'produce' | 'protein' | 'grains' | 'superfoods' | 'pantry';
  weeklyQuantity: string;
  mealsUsedIn: string[];
  checked: boolean;
}

export interface CategorizedGroceryList {
  produce: GroceryItem[];
  protein: GroceryItem[];
  grains: GroceryItem[];
  superfoods: GroceryItem[];
  pantry: GroceryItem[];
  totalItems: number;
}

/**
 * Standardize ingredient names for clean shopping consolidation.
 */
export function normalizeIngredientName(name: string): { normalized: string; category: GroceryItem['category']; standardUnit: string } {
  const n = name.toLowerCase();

  // 1. Proteins & Dairy
  if (n.includes('paneer')) return { normalized: 'Fresh Low-Fat Paneer', category: 'protein', standardUnit: '~400g - 500g' };
  if (n.includes('tofu')) return { normalized: 'Organic Firm Tofu', category: 'protein', standardUnit: '1-2 blocks (400g)' };
  if (n.includes('curd') || n.includes('yogurt')) return { normalized: 'Fresh Curd / Greek Yogurt', category: 'protein', standardUnit: '1 kg tub' };
  if (n.includes('soya')) return { normalized: 'Soya Chunks / Granules', category: 'protein', standardUnit: '1 pack (200g)' };
  if (n.includes('kala chana') || n.includes('black chana') || n.includes('chole')) return { normalized: 'Black Chana / Chickpeas', category: 'protein', standardUnit: '500g pack' };
  if (n.includes('rajma')) return { normalized: 'Kidney Beans (Rajma)', category: 'protein', standardUnit: '500g pack' };
  if (n.includes('moong dal') || n.includes('yellow dal') || n.includes('dal')) return { normalized: 'Yellow Moong / Toor Dal', category: 'protein', standardUnit: '500g - 1 kg' };
  if (n.includes('protein') || n.includes('whey')) return { normalized: 'Whey / Plant Protein Powder', category: 'protein', standardUnit: 'Weekly Supply' };

  // 2. Fresh Produce & Vegetables
  if (n.includes('spinach') || n.includes('palak')) return { normalized: 'Fresh Baby Spinach (Palak)', category: 'produce', standardUnit: '2 fresh bunches' };
  if (n.includes('methi') || n.includes('fenugreek')) return { normalized: 'Fresh Methi Leaves', category: 'produce', standardUnit: '1-2 bunches' };
  if (n.includes('cucumber')) return { normalized: 'Salad Cucumbers (Kheera)', category: 'produce', standardUnit: '1 kg (~5-6 pcs)' };
  if (n.includes('tomato')) return { normalized: 'Ripe Tomatoes', category: 'produce', standardUnit: '1 kg' };
  if (n.includes('onion')) return { normalized: 'Red Onions', category: 'produce', standardUnit: '1 kg' };
  if (n.includes('lemon')) return { normalized: 'Fresh Juicy Lemons', category: 'produce', standardUnit: '6-8 pcs' };
  if (n.includes('beetroot')) return { normalized: 'Fresh Beetroots', category: 'produce', standardUnit: '500g (~3 pcs)' };
  if (n.includes('bhindi') || n.includes('okra')) return { normalized: 'Fresh Bhindi (Ladyfinger)', category: 'produce', standardUnit: '500g' };
  if (n.includes('capsicum') || n.includes('bell pepper')) return { normalized: 'Green & Colored Bell Peppers', category: 'produce', standardUnit: '500g' };
  if (n.includes('sprout')) return { normalized: 'Moong / Mixed Sprouts', category: 'produce', standardUnit: '500g pack' };
  if (n.includes('mint') || n.includes('coriander') || n.includes('pudina') || n.includes('ginger')) return { normalized: 'Mint, Coriander & Fresh Ginger', category: 'produce', standardUnit: 'Weekly Bunch & 100g' };
  if (n.includes('apple') || n.includes('pomegranate') || n.includes('banana')) return { normalized: 'Fresh Fruits (Apples / Bananas / Pom)', category: 'produce', standardUnit: '4-6 pcs' };

  // 3. Whole Grains & Flours
  if (n.includes('ragi')) return { normalized: 'Ragi (Finger Millet) Flour', category: 'grains', standardUnit: '500g pack' };
  if (n.includes('besan') || n.includes('gram flour')) return { normalized: 'Pure Besan (Gram Flour)', category: 'grains', standardUnit: '500g pack' };
  if (n.includes('oats')) return { normalized: 'Rolled / Steel Cut Oats', category: 'grains', standardUnit: '500g pack' };
  if (n.includes('poha')) return { normalized: 'Thick Poha (Flattened Rice)', category: 'grains', standardUnit: '500g pack' };
  if (n.includes('sattu')) return { normalized: 'Chana Sattu Powder', category: 'grains', standardUnit: '500g pack' };
  if (n.includes('rice') || n.includes('khichdi')) return { normalized: 'Brown / Sona Masoori Rice', category: 'grains', standardUnit: '1 kg pack' };
  if (n.includes('roti') || n.includes('atta') || n.includes('thepla') || n.includes('bread')) return { normalized: 'Whole Wheat Atta / Multigrain Bread', category: 'grains', standardUnit: 'Weekly Supply' };

  // 4. Seeds, Nuts & Superfoods
  if (n.includes('chia')) return { normalized: 'Raw Chia Seeds', category: 'superfoods', standardUnit: '100g - 200g jar' };
  if (n.includes('flax')) return { normalized: 'Roasted Flaxseeds', category: 'superfoods', standardUnit: '100g - 200g jar' };
  if (n.includes('almond') || n.includes('walnut') || n.includes('pumpkin')) return { normalized: 'Almonds, Walnuts & Pumpkin Seeds', category: 'superfoods', standardUnit: '200g mixed pack' };
  if (n.includes('acv') || n.includes('apple cider')) return { normalized: 'Organic Raw Apple Cider Vinegar (ACV)', category: 'superfoods', standardUnit: '1 bottle' };
  // 5. Pantry Essentials & Spices Consolidation
  if (n.includes('garlic') || n.includes('chilli') || n.includes('chili')) {
    return { normalized: 'Fresh Garlic, Ginger & Green Chillies', category: 'produce', standardUnit: 'Weekly Aisle Pick' };
  }
  if (n.includes('oil') || n.includes('ghee') || n.includes('butter')) {
    return { normalized: 'Cold-Pressed Cooking Oil & Pure Ghee', category: 'pantry', standardUnit: '500ml - 1L Bottle' };
  }
  if (n.includes('salt') || n.includes('pepper') || n.includes('black salt')) {
    return { normalized: 'Sendha Rock Salt & Crushed Black Pepper', category: 'pantry', standardUnit: 'Pantry Shaker' };
  }
  if (
    n.includes('turmeric') ||
    n.includes('jeera') ||
    n.includes('cumin') ||
    n.includes('mustard') ||
    n.includes('rai') ||
    n.includes('hing') ||
    n.includes('masala') ||
    n.includes('spice') ||
    n.includes('curry') ||
    n.includes('chutney') ||
    n.includes('coriander powder')
  ) {
    return { normalized: 'Indian Spices Kit (Turmeric, Jeera, Rai, Masala)', category: 'pantry', standardUnit: 'Pantry Spice Box' };
  }

  return { normalized: 'Essential Seasoning & Herbs', category: 'pantry', standardUnit: 'Pantry Staple' };
}

/**
 * Generates an organized, realistic 7-Day (1-Week) Grocery Checklist tailored to the user's active profile and meals.
 */
export function generateWeeklyGroceryList(
  profile: UserProfile,
  startDate: Date = new Date(),
  dietPlan?: any,
  dateDietOverrides?: Record<string, any>
): CategorizedGroceryList {
  const itemsMap = new Map<string, { category: GroceryItem['category']; unit: string; meals: Set<string> }>();

  // Iterate over exactly the next 7 calendar days
  for (let i = 0; i < 7; i++) {
    const d = addDays(startDate, i);
    const dayPlan = getMealPlanForDate(d, profile, dietPlan, dateDietOverrides);

    const meals: CuratedMeal[] = [
      dayPlan.breakfast,
      dayPlan.lunch,
      dayPlan.dinner,
      ...(dayPlan.snacks || [])
    ].filter(Boolean);

    meals.forEach((meal) => {
      meal.ingredients.forEach((ing) => {
        const { normalized, category, standardUnit } = normalizeIngredientName(ing.name);
        const existing = itemsMap.get(normalized);
        if (existing) {
          existing.meals.add(meal.name);
        } else {
          itemsMap.set(normalized, {
            category,
            unit: standardUnit,
            meals: new Set([meal.name])
          });
        }
      });
    });
  }

  const categorized: CategorizedGroceryList = {
    produce: [],
    protein: [],
    grains: [],
    superfoods: [],
    pantry: [],
    totalItems: 0
  };

  let idx = 1;
  itemsMap.forEach((val, key) => {
    const item: GroceryItem = {
      id: `groc_${idx++}`,
      name: key,
      category: val.category,
      weeklyQuantity: val.unit,
      mealsUsedIn: Array.from(val.meals).slice(0, 3),
      checked: false
    };

    categorized[val.category].push(item);
    categorized.totalItems += 1;
  });

  const sortFn = (a: GroceryItem, b: GroceryItem) => a.name.localeCompare(b.name);
  categorized.produce.sort(sortFn);
  categorized.protein.sort(sortFn);
  categorized.grains.sort(sortFn);
  categorized.superfoods.sort(sortFn);
  categorized.pantry.sort(sortFn);

  return categorized;
}

// Backward-compatible alias
export const generateGroceryList = generateWeeklyGroceryList;
