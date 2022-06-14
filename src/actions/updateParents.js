import { createAction } from '@reduxjs/toolkit'
import { stopStoryTimer } from './updateStoryTimerId';

const addParentAction = createAction('ADD_PARENT');
const removeParent = createAction('REMOVE_PARENT');


const addParent = (parent, dispatch) => () => {
	dispatch(stopStoryTimer());
	dispatch(addParentAction(parent));
}

export {
	addParent,
	removeParent
}