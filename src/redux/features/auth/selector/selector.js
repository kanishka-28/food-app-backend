import { createSelector } from "@reduxjs/toolkit";

export const user = createSelector(store => store.auth, auth=> auth.user);
export const isAuthenticated = createSelector(store => store.auth, auth=> auth.isAuthenticated);
export const isReady = createSelector(store=> store.auth, auth=> auth.isReady);