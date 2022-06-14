import { createAction } from '@reduxjs/toolkit'

const updateHomeTimerId = createAction('UPDATE_HOME_TIMER_ID');
const stopHomeTimer = createAction('STOP_HOME_TIMER');

export {
	updateHomeTimerId,
	stopHomeTimer
}