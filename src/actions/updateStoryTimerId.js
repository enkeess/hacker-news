import { createAction } from '@reduxjs/toolkit'

const updateStoryTimerId = createAction('UPDATE_STORY_TIMER_ID');
const stopStoryTimer = createAction('STOP_STORY_TIMER');

export {
	updateStoryTimerId,
	stopStoryTimer
}