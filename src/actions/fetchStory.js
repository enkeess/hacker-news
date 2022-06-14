import { createAction } from '@reduxjs/toolkit'

const newsRequested = createAction('FETCH_STORY_REQUEST');
const newsSuccess = createAction('FETCH_STORY_SUCCESS');
const newsFailure = createAction('FETCH_STORY_FAILURE');


const fetchStory = (id, newsService, dispatch) => () => {

	dispatch(newsRequested());
	newsService.getItem(id)
		.then(data => {
			dispatch(newsSuccess(data))
		})
		.catch(err => {
			dispatch(newsFailure(err));
		})
	}


export default fetchStory;