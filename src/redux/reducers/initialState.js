export default {
  recipes: [],
  ingredients: [],
  alergen: [],
  apiCallsInProgress: 0,

  aggregate: {
    allergens: {
      eggs: 0,
      milk: 1,
      wheat: 2,
      peanuts: 3,
      "tree nuts": 4,
      fish: 5,
      shellfish: 6,
      soy: 7,
    },
    categories: {
      Breakfast: 1,
      Lunch: 2,
      Dinner: 3,
      Snack: 4,
      Soup: 5,
      Dessert: 6,
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
