import { createSelector } from "@reduxjs/toolkit";

export const restaurantId = createSelector(store=>store.cart, cart=> cart.restaurant);
export const orderDetails = createSelector(store=>store.cart, cart=> cart.orderDetails);
export const itemTotal = createSelector(store=>store.cart, cart=> cart.itemTotal);
export const status = createSelector(store=>store.cart, cart=> cart.status);