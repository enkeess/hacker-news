import { createAction } from '@reduxjs/toolkit'

const allKidsRequested = createAction('FETCH_ALL_KIDS_REQUEST');
const allKidsSuccess = createAction('FETCH_ALL_KIDS_SUCCESS');
const allKidsFailure = createAction('FETCH_ALL_KIDS_FAILURE');

const fetchAllKids = (kids, newsService, dispatch) => () => {
	dispatch(allKidsRequested());
	newsService.getItems(kids)
		.then(data => {
			dispatch(allKidsSuccess(data))
		})
		.catch(err => {
			dispatch(allKidsFailure(err));
		})
}

export default fetchAllKids;