import { createSelector } from "@reduxjs/toolkit";

export const isLoading = createSelector(store=>store.loading, loading=> loading.isLoading);