import { createAction } from '@reduxjs/toolkit'

const newsRequested = createAction('FETCH_STORIES_REQUEST');
const newsSuccess = createAction('FETCH_STORIES_SUCCESS');
const newsFailure = createAction('FETCH_STORIES_FAILURE');


const fetchNews = (storiesId, newsService, dispatch) => () => {
	const step = 10;
	
	for(let i = 0; i < 100; i += step) {
		dispatch(newsRequested());
		newsService.getItems(storiesId.slice(i, i + step))
			.then(data => {
				dispatch(newsSuccess(data))
			})
			.catch(err => {
				dispatch(newsFailure(err));
			})
	}
}

export default fetchNews;