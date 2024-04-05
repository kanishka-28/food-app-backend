import { createSelector } from "@reduxjs/toolkit";

export const allKitchens = createSelector(store => store.kitchens, kitchens=> kitchens.allKitchens);