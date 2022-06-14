import homeReducer from './homeReducer'
import storyReducer from './storyReducer';


const rootReducer = (store, action) => {
	return {
		home: homeReducer(store, action),
		story: storyReducer(store, action)
	}
};

export default rootReducer;