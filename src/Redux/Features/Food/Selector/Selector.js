import { createSelector } from "@reduxjs/toolkit";

export const openModal = createSelector(store=>store.foodModal, foodModal=>foodModal.open);