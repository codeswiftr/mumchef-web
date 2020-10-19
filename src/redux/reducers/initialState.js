export default {
  recipes: [],
  ingredients: [],
  alergen: [],
  apiCallsInProgress: 0,

  aggregate: {
    allergens: {
      eggs: "eggs",
      milk: "milk",
      wheat: "wheat",
      peanuts: "peanuts",
      tree_nuts: "tree nuts",
      fish: "fish",
      shellfish: "shellfish",
      soy: "soy",
    },
    categories: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
      soup: "Soup",
      dessert: "Dessert",
      side_dish: "Side Dish",
    },
    dificulties: {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    },

    timeMarks: [
      {
        value: 5,
        label: "5 min",
      },
      {
        value: 15,
        label: "15 min",
      },
      {
        value: 30,
        label: "30 min",
      },
      {
        value: 45,
        label: "45 min",
      },
      {
        value: 60,
        label: "1 h",
      },
      {
        value: 90,
        label: "1.5 h",
      },
      {
        value: 120,
        label: "2 h",
      },
      {
        value: 180,
        label: "3 h",
      },
    ],
  },
};
