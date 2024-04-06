import {createSelector} from "@reduxjs/toolkit"

export const loading = createSelector(store => store.loader, loader=>loader.loading)