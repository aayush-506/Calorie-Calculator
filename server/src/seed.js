require('dotenv').config();
const mongoose = require('mongoose');
const FoodProducts = require('./features/foodProducts/products.model');

const foodData = [
  {
    Category: 'Poultry',
    Description: 'Chicken Breast, Grilled',
    'Nutrient Data Bank': 1001,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0, Cholesterol: 85, Choline: 87, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 14.8,
      Protein: 31, Retinol: 5, Riboflavin: 0.1, Selenium: 27.6,
      'Sugar Total': 0, Thiamin: 0.07, Water: 65,
      Fat: { 'Monosaturated Fat': 1.2, 'Polysaturated Fat': 0.7, 'Saturated Fat': 0.9, 'Total Lipid': 3.6 },
      'Major Minerals': { Calcium: 11, Copper: 0.05, Iron: 0.9, Magnesium: 29, Phosphorus: 220, Potassium: 256, Sodium: 74, Zinc: 1.0 },
      Vitamins: { 'Vitamin A - RAE': 5, 'Vitamin B12': 0.3, 'Vitamin B6': 0.9, 'Vitamin C': 0, 'Vitamin E': 0.3, 'Vitamin K': 0 },
    },
  },
  {
    Category: 'Beef',
    Description: 'Beef, Ground, 85% Lean',
    'Nutrient Data Bank': 1002,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0, Cholesterol: 78, Choline: 82, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 5.1,
      Protein: 26, Retinol: 0, Riboflavin: 0.18, Selenium: 18,
      'Sugar Total': 0, Thiamin: 0.05, Water: 60,
      Fat: { 'Monosaturated Fat': 6.5, 'Polysaturated Fat': 0.5, 'Saturated Fat': 5.8, 'Total Lipid': 15 },
      'Major Minerals': { Calcium: 18, Copper: 0.08, Iron: 2.6, Magnesium: 22, Phosphorus: 190, Potassium: 318, Sodium: 72, Zinc: 5.4 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 2.4, 'Vitamin B6': 0.4, 'Vitamin C': 0, 'Vitamin E': 0.2, 'Vitamin K': 1.4 },
    },
  },
  {
    Category: 'Seafood',
    Description: 'Salmon, Atlantic, Cooked',
    'Nutrient Data Bank': 1003,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0, Cholesterol: 63, Choline: 91, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 8.6,
      Protein: 25, Retinol: 50, Riboflavin: 0.4, Selenium: 36,
      'Sugar Total': 0, Thiamin: 0.23, Water: 60,
      Fat: { 'Monosaturated Fat': 3.8, 'Polysaturated Fat': 3.9, 'Saturated Fat': 2.1, 'Total Lipid': 13.4 },
      'Major Minerals': { Calcium: 14, Copper: 0.08, Iron: 0.8, Magnesium: 29, Phosphorus: 270, Potassium: 490, Sodium: 59, Zinc: 0.8 },
      Vitamins: { 'Vitamin A - RAE': 50, 'Vitamin B12': 3.2, 'Vitamin B6': 0.9, 'Vitamin C': 0, 'Vitamin E': 1.1, 'Vitamin K': 0.5 },
    },
  },
  {
    Category: 'Dairy',
    Description: 'Whole Milk',
    'Nutrient Data Bank': 1004,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 7, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 4.8, Cholesterol: 10, Choline: 14, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 0.1,
      Protein: 3.2, Retinol: 28, Riboflavin: 0.18, Selenium: 3.7,
      'Sugar Total': 4.8, Thiamin: 0.04, Water: 88,
      Fat: { 'Monosaturated Fat': 1.0, 'Polysaturated Fat': 0.1, 'Saturated Fat': 2.0, 'Total Lipid': 3.3 },
      'Major Minerals': { Calcium: 113, Copper: 0.01, Iron: 0.03, Magnesium: 10, Phosphorus: 84, Potassium: 143, Sodium: 43, Zinc: 0.4 },
      Vitamins: { 'Vitamin A - RAE': 28, 'Vitamin B12': 0.4, 'Vitamin B6': 0.04, 'Vitamin C': 0.4, 'Vitamin E': 0.07, 'Vitamin K': 0.3 },
    },
  },
  {
    Category: 'Dairy',
    Description: 'Greek Yogurt, Plain, Low Fat',
    'Nutrient Data Bank': 1005,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 3.6, Cholesterol: 5, Choline: 15, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 0.2,
      Protein: 10, Retinol: 0, Riboflavin: 0.27, Selenium: 9.7,
      'Sugar Total': 3.6, Thiamin: 0.02, Water: 80,
      Fat: { 'Monosaturated Fat': 0.3, 'Polysaturated Fat': 0.03, 'Saturated Fat': 0.7, 'Total Lipid': 0.7 },
      'Major Minerals': { Calcium: 110, Copper: 0.01, Iron: 0.07, Magnesium: 11, Phosphorus: 135, Potassium: 141, Sodium: 36, Zinc: 0.5 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0.75, 'Vitamin B6': 0.07, 'Vitamin C': 0, 'Vitamin E': 0.01, 'Vitamin K': 0.2 },
    },
  },
  {
    Category: 'Eggs',
    Description: 'Egg, Whole, Hard Boiled',
    'Nutrient Data Bank': 1006,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0.6, Cholesterol: 187, Choline: 147, Fiber: 0,
      'Lutein and Zeaxanthin': 331, Lycopene: 0, Niacin: 0.06,
      Protein: 6.3, Retinol: 75, Riboflavin: 0.26, Selenium: 15.4,
      'Sugar Total': 0.6, Thiamin: 0.02, Water: 75,
      Fat: { 'Monosaturated Fat': 1.8, 'Polysaturated Fat': 0.7, 'Saturated Fat': 1.6, 'Total Lipid': 5.3 },
      'Major Minerals': { Calcium: 25, Copper: 0.01, Iron: 0.6, Magnesium: 5, Phosphorus: 86, Potassium: 63, Sodium: 62, Zinc: 0.6 },
      Vitamins: { 'Vitamin A - RAE': 75, 'Vitamin B12': 0.56, 'Vitamin B6': 0.06, 'Vitamin C': 0, 'Vitamin E': 0.5, 'Vitamin K': 0.1 },
    },
  },
  {
    Category: 'Grains',
    Description: 'Brown Rice, Cooked',
    'Nutrient Data Bank': 1007,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 23, Cholesterol: 0, Choline: 9, Fiber: 1.8,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 1.5,
      Protein: 2.3, Retinol: 0, Riboflavin: 0.01, Selenium: 9.8,
      'Sugar Total': 0.4, Thiamin: 0.1, Water: 73,
      Fat: { 'Monosaturated Fat': 0.3, 'Polysaturated Fat': 0.3, 'Saturated Fat': 0.2, 'Total Lipid': 0.9 },
      'Major Minerals': { Calcium: 10, Copper: 0.08, Iron: 0.4, Magnesium: 43, Phosphorus: 83, Potassium: 43, Sodium: 5, Zinc: 0.6 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0, 'Vitamin B6': 0.15, 'Vitamin C': 0, 'Vitamin E': 0.04, 'Vitamin K': 1.2 },
    },
  },
  {
    Category: 'Grains',
    Description: 'Oatmeal, Cooked',
    'Nutrient Data Bank': 1008,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 12, Cholesterol: 0, Choline: 7, Fiber: 1.7,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 0.3,
      Protein: 2.5, Retinol: 0, Riboflavin: 0.02, Selenium: 5.5,
      'Sugar Total': 0.1, Thiamin: 0.1, Water: 84,
      Fat: { 'Monosaturated Fat': 0.5, 'Polysaturated Fat': 0.5, 'Saturated Fat': 0.4, 'Total Lipid': 1.5 },
      'Major Minerals': { Calcium: 10, Copper: 0.06, Iron: 0.7, Magnesium: 26, Phosphorus: 77, Potassium: 61, Sodium: 49, Zinc: 0.6 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0, 'Vitamin B6': 0.02, 'Vitamin C': 0, 'Vitamin E': 0.1, 'Vitamin K': 0 },
    },
  },
  {
    Category: 'Vegetables',
    Description: 'Broccoli, Raw',
    'Nutrient Data Bank': 1009,
    Data: {
      'Alpha Carotene': 25, 'Beta Carotene': 361, 'Beta Cryptoxanthin': 1,
      Carbohydrate: 6.6, Cholesterol: 0, Choline: 18.7, Fiber: 2.6,
      'Lutein and Zeaxanthin': 1403, Lycopene: 0, Niacin: 0.6,
      Protein: 2.8, Retinol: 0, Riboflavin: 0.12, Selenium: 2.5,
      'Sugar Total': 1.7, Thiamin: 0.07, Water: 89.3,
      Fat: { 'Monosaturated Fat': 0.01, 'Polysaturated Fat': 0.04, 'Saturated Fat': 0.04, 'Total Lipid': 0.4 },
      'Major Minerals': { Calcium: 47, Copper: 0.05, Iron: 0.7, Magnesium: 21, Phosphorus: 66, Potassium: 316, Sodium: 33, Zinc: 0.4 },
      Vitamins: { 'Vitamin A - RAE': 31, 'Vitamin B12': 0, 'Vitamin B6': 0.18, 'Vitamin C': 89.2, 'Vitamin E': 0.78, 'Vitamin K': 101.6 },
    },
  },
  {
    Category: 'Vegetables',
    Description: 'Spinach, Raw',
    'Nutrient Data Bank': 1010,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 4196, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 3.6, Cholesterol: 0, Choline: 19.3, Fiber: 2.2,
      'Lutein and Zeaxanthin': 12198, Lycopene: 0, Niacin: 0.7,
      Protein: 2.9, Retinol: 0, Riboflavin: 0.19, Selenium: 1,
      'Sugar Total': 0.4, Thiamin: 0.08, Water: 91.4,
      Fat: { 'Monosaturated Fat': 0.01, 'Polysaturated Fat': 0.17, 'Saturated Fat': 0.06, 'Total Lipid': 0.4 },
      'Major Minerals': { Calcium: 99, Copper: 0.13, Iron: 2.7, Magnesium: 79, Phosphorus: 49, Potassium: 558, Sodium: 79, Zinc: 0.5 },
      Vitamins: { 'Vitamin A - RAE': 469, 'Vitamin B12': 0, 'Vitamin B6': 0.2, 'Vitamin C': 28.1, 'Vitamin E': 2.03, 'Vitamin K': 482.9 },
    },
  },
  {
    Category: 'Fruits',
    Description: 'Banana, Raw',
    'Nutrient Data Bank': 1011,
    Data: {
      'Alpha Carotene': 25, 'Beta Carotene': 26, 'Beta Cryptoxanthin': 78,
      Carbohydrate: 23, Cholesterol: 0, Choline: 9.8, Fiber: 2.6,
      'Lutein and Zeaxanthin': 22, Lycopene: 0, Niacin: 0.67,
      Protein: 1.1, Retinol: 0, Riboflavin: 0.07, Selenium: 1,
      'Sugar Total': 12.2, Thiamin: 0.03, Water: 74.9,
      Fat: { 'Monosaturated Fat': 0.04, 'Polysaturated Fat': 0.07, 'Saturated Fat': 0.11, 'Total Lipid': 0.3 },
      'Major Minerals': { Calcium: 5, Copper: 0.08, Iron: 0.3, Magnesium: 27, Phosphorus: 22, Potassium: 358, Sodium: 1, Zinc: 0.2 },
      Vitamins: { 'Vitamin A - RAE': 3, 'Vitamin B12': 0, 'Vitamin B6': 0.37, 'Vitamin C': 8.7, 'Vitamin E': 0.1, 'Vitamin K': 0.5 },
    },
  },
  {
    Category: 'Fruits',
    Description: 'Apple, Raw, With Skin',
    'Nutrient Data Bank': 1012,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 27, 'Beta Cryptoxanthin': 11,
      Carbohydrate: 13.8, Cholesterol: 0, Choline: 3.4, Fiber: 2.4,
      'Lutein and Zeaxanthin': 29, Lycopene: 0, Niacin: 0.09,
      Protein: 0.3, Retinol: 0, Riboflavin: 0.02, Selenium: 0,
      'Sugar Total': 10.4, Thiamin: 0.02, Water: 85.6,
      Fat: { 'Monosaturated Fat': 0.01, 'Polysaturated Fat': 0.05, 'Saturated Fat': 0.03, 'Total Lipid': 0.17 },
      'Major Minerals': { Calcium: 6, Copper: 0.03, Iron: 0.12, Magnesium: 5, Phosphorus: 11, Potassium: 107, Sodium: 1, Zinc: 0.04 },
      Vitamins: { 'Vitamin A - RAE': 3, 'Vitamin B12': 0, 'Vitamin B6': 0.04, 'Vitamin C': 4.6, 'Vitamin E': 0.18, 'Vitamin K': 2.2 },
    },
  },
  {
    Category: 'Legumes',
    Description: 'Lentils, Boiled',
    'Nutrient Data Bank': 1013,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 29, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 20, Cholesterol: 0, Choline: 32.7, Fiber: 7.9,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 1.06,
      Protein: 9, Retinol: 0, Riboflavin: 0.07, Selenium: 2.8,
      'Sugar Total': 1.8, Thiamin: 0.17, Water: 70,
      Fat: { 'Monosaturated Fat': 0.06, 'Polysaturated Fat': 0.19, 'Saturated Fat': 0.05, 'Total Lipid': 0.38 },
      'Major Minerals': { Calcium: 19, Copper: 0.25, Iron: 3.3, Magnesium: 36, Phosphorus: 180, Potassium: 369, Sodium: 2, Zinc: 1.3 },
      Vitamins: { 'Vitamin A - RAE': 1, 'Vitamin B12': 0, 'Vitamin B6': 0.18, 'Vitamin C': 1.5, 'Vitamin E': 0.11, 'Vitamin K': 1.7 },
    },
  },
  {
    Category: 'Nuts and Seeds',
    Description: 'Almonds, Raw',
    'Nutrient Data Bank': 1014,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 21.6, Cholesterol: 0, Choline: 52.1, Fiber: 12.5,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 3.38,
      Protein: 21.2, Retinol: 0, Riboflavin: 1.01, Selenium: 2.5,
      'Sugar Total': 5, Thiamin: 0.21, Water: 4.4,
      Fat: { 'Monosaturated Fat': 31.6, 'Polysaturated Fat': 12.3, 'Saturated Fat': 3.8, 'Total Lipid': 49.9 },
      'Major Minerals': { Calcium: 264, Copper: 1.03, Iron: 3.7, Magnesium: 270, Phosphorus: 481, Potassium: 733, Sodium: 1, Zinc: 3.1 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0, 'Vitamin B6': 0.13, 'Vitamin C': 0, 'Vitamin E': 25.6, 'Vitamin K': 0 },
    },
  },
  {
    Category: 'Grains',
    Description: 'Whole Wheat Bread',
    'Nutrient Data Bank': 1015,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 41.3, Cholesterol: 0, Choline: 14.6, Fiber: 6.8,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 4.8,
      Protein: 13.4, Retinol: 0, Riboflavin: 0.13, Selenium: 26.2,
      'Sugar Total': 5.5, Thiamin: 0.5, Water: 38.3,
      Fat: { 'Monosaturated Fat': 0.6, 'Polysaturated Fat': 1.3, 'Saturated Fat': 0.5, 'Total Lipid': 3.6 },
      'Major Minerals': { Calcium: 161, Copper: 0.29, Iron: 3.9, Magnesium: 76, Phosphorus: 212, Potassium: 248, Sodium: 472, Zinc: 2 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0, 'Vitamin B6': 0.21, 'Vitamin C': 0, 'Vitamin E': 0.5, 'Vitamin K': 7.8 },
    },
  },
  {
    Category: 'Vegetables',
    Description: 'Sweet Potato, Baked',
    'Nutrient Data Bank': 1016,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 8509, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 20.7, Cholesterol: 0, Choline: 13.1, Fiber: 3.3,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 1.49,
      Protein: 2.0, Retinol: 0, Riboflavin: 0.09, Selenium: 0.2,
      'Sugar Total': 6.5, Thiamin: 0.1, Water: 75.8,
      Fat: { 'Monosaturated Fat': 0.01, 'Polysaturated Fat': 0.08, 'Saturated Fat': 0.02, 'Total Lipid': 0.15 },
      'Major Minerals': { Calcium: 38, Copper: 0.16, Iron: 0.69, Magnesium: 27, Phosphorus: 54, Potassium: 475, Sodium: 55, Zinc: 0.32 },
      Vitamins: { 'Vitamin A - RAE': 961, 'Vitamin B12': 0, 'Vitamin B6': 0.29, 'Vitamin C': 19.6, 'Vitamin E': 1.44, 'Vitamin K': 2.3 },
    },
  },
  {
    Category: 'Seafood',
    Description: 'Tuna, Canned in Water',
    'Nutrient Data Bank': 1017,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0, Cholesterol: 30, Choline: 34, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 11.3,
      Protein: 25.5, Retinol: 20, Riboflavin: 0.1, Selenium: 80,
      'Sugar Total': 0, Thiamin: 0.03, Water: 72,
      Fat: { 'Monosaturated Fat': 0.14, 'Polysaturated Fat': 0.26, 'Saturated Fat': 0.21, 'Total Lipid': 0.82 },
      'Major Minerals': { Calcium: 11, Copper: 0.04, Iron: 1.02, Magnesium: 31, Phosphorus: 217, Potassium: 237, Sodium: 247, Zinc: 0.77 },
      Vitamins: { 'Vitamin A - RAE': 20, 'Vitamin B12': 2.5, 'Vitamin B6': 0.46, 'Vitamin C': 0, 'Vitamin E': 0.5, 'Vitamin K': 0 },
    },
  },
  {
    Category: 'Legumes',
    Description: 'Chickpeas, Boiled',
    'Nutrient Data Bank': 1018,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 37, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 27.4, Cholesterol: 0, Choline: 42.8, Fiber: 7.6,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 0.53,
      Protein: 8.9, Retinol: 0, Riboflavin: 0.06, Selenium: 3.7,
      'Sugar Total': 4.8, Thiamin: 0.12, Water: 60.2,
      Fat: { 'Monosaturated Fat': 0.68, 'Polysaturated Fat': 1.1, 'Saturated Fat': 0.28, 'Total Lipid': 2.6 },
      'Major Minerals': { Calcium: 49, Copper: 0.35, Iron: 2.9, Magnesium: 48, Phosphorus: 168, Potassium: 291, Sodium: 7, Zinc: 1.5 },
      Vitamins: { 'Vitamin A - RAE': 1, 'Vitamin B12': 0, 'Vitamin B6': 0.14, 'Vitamin C': 1.3, 'Vitamin E': 0.35, 'Vitamin K': 4 },
    },
  },
  {
    Category: 'Fruits',
    Description: 'Avocado, Raw',
    'Nutrient Data Bank': 1019,
    Data: {
      'Alpha Carotene': 24, 'Beta Carotene': 62, 'Beta Cryptoxanthin': 28,
      Carbohydrate: 8.5, Cholesterol: 0, Choline: 14.2, Fiber: 6.7,
      'Lutein and Zeaxanthin': 271, Lycopene: 0, Niacin: 1.74,
      Protein: 2.0, Retinol: 0, Riboflavin: 0.13, Selenium: 0.4,
      'Sugar Total': 0.7, Thiamin: 0.07, Water: 73.2,
      Fat: { 'Monosaturated Fat': 9.8, 'Polysaturated Fat': 1.8, 'Saturated Fat': 2.1, 'Total Lipid': 14.7 },
      'Major Minerals': { Calcium: 12, Copper: 0.19, Iron: 0.6, Magnesium: 29, Phosphorus: 52, Potassium: 485, Sodium: 7, Zinc: 0.64 },
      Vitamins: { 'Vitamin A - RAE': 7, 'Vitamin B12': 0, 'Vitamin B6': 0.26, 'Vitamin C': 10, 'Vitamin E': 2.07, 'Vitamin K': 21 },
    },
  },
  {
    Category: 'Poultry',
    Description: 'Turkey, Roasted, Light Meat',
    'Nutrient Data Bank': 1020,
    Data: {
      'Alpha Carotene': 0, 'Beta Carotene': 0, 'Beta Cryptoxanthin': 0,
      Carbohydrate: 0, Cholesterol: 76, Choline: 78, Fiber: 0,
      'Lutein and Zeaxanthin': 0, Lycopene: 0, Niacin: 10.6,
      Protein: 28.6, Retinol: 0, Riboflavin: 0.15, Selenium: 31,
      'Sugar Total': 0, Thiamin: 0.06, Water: 64.4,
      Fat: { 'Monosaturated Fat': 0.59, 'Polysaturated Fat': 0.68, 'Saturated Fat': 0.91, 'Total Lipid': 3.2 },
      'Major Minerals': { Calcium: 18, Copper: 0.06, Iron: 1.4, Magnesium: 29, Phosphorus: 229, Potassium: 298, Sodium: 70, Zinc: 2.1 },
      Vitamins: { 'Vitamin A - RAE': 0, 'Vitamin B12': 0.35, 'Vitamin B6': 0.86, 'Vitamin C': 0, 'Vitamin E': 0.19, 'Vitamin K': 0 },
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const existing = await FoodProducts.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️  Database already has ${existing} food products. Skipping seed.`);
      console.log('   To re-seed, run: node seed.js --force');
      if (!process.argv.includes('--force')) {
        await mongoose.disconnect();
        return;
      }
      await FoodProducts.deleteMany({});
      console.log('🗑️  Cleared existing food products.');
    }

    const inserted = await FoodProducts.insertMany(foodData);
    console.log(`🌱 Successfully seeded ${inserted.length} food products!`);
    console.log('\nCategories added:');
    const cats = [...new Set(foodData.map(f => f.Category))];
    cats.forEach(c => {
      const count = foodData.filter(f => f.Category === c).length;
      console.log(`  • ${c} (${count} items)`);
    });
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

seed();
