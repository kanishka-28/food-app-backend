import { createSelector } from "@reduxjs/toolkit";

export const allRestaurants = createSelector(store=> store.restaurants, restaurants=> restaurants.allRestaurants);