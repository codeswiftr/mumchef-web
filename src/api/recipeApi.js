import firebase from "firebase/app";
import "firebase/database";

import { firebaseConfig } from "../firebaseConfig";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function getRecipes() {
  return firebase.database().ref("/recipe");
}

export function saveRecipe() {}

export function deleteRecipe(recipeId) {}
