import { createAction } from '@reduxjs/toolkit'

const newsIdRequested = createAction('FETCH_STORIES_ID_REQUEST');
const newsIdSuccess = createAction('FETCH_STORIES_ID_SUCCESS');
const newsIdFailure = createAction('FETCH_STORIES_ID_FAILURE');

const fetchStoriesId = (newsService, dispatch) => () => {
	dispatch(newsIdRequested());
	newsService.getNewStories()
		.then(data => {
			dispatch(newsIdSuccess(data.slice(0, 100)))
		})
		.catch(err => {
			dispatch(newsIdFailure(err));
		})
}


export default fetchStoriesId;

