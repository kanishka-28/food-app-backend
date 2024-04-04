import { createSelector } from "@reduxjs/toolkit";

export const location = createSelector(store=> store.location , location=> location)