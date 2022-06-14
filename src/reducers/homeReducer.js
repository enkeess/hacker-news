
const initialState = {
	storiesId: [],
	stories: [],

	isLoading: true,
	isErorr: false,
	waitingNewsRequest: -10000,

	timerId: -1,
}

const updateStories = (stories, payload, waitingNewsRequest) => {
	if(waitingNewsRequest > 0) {

		let newStories = [...stories];
		
		payload.forEach(item => {
			const index = newStories.findIndex(elem => item.id && elem.id === item.id)
			if(index !== -1) {
				if(JSON.stringify(newStories[index]) !== JSON.stringify(item)) {
					newStories[index] = item
				}
			} else {
				newStories.push(item);
			}
		})

		newStories = newStories.sort((a, b) => b.time - a.time).slice(0, 100);

		return {
			stories: newStories,
			waitingNewsRequest: waitingNewsRequest - 1
		}
	} else {
		return {
			stories, waitingNewsRequest
		}
	}
}

const homeReducer = (store, action) => {
	if(store === undefined) {
		return initialState;
	}

	switch(action.type) {
		case 'FETCH_STORIES_ID_REQUEST': {
			return {
				...store.home,
				waitingNewsRequest : -10000,
				isLoading: true
			}
		}

		case 'FETCH_STORIES_ID_SUCCESS': {
			return {
				...store.home,
				storiesId: action.payload,
				waitingNewsRequest: 10
			}
		}

		case 'FETCH_STORIES_SUCCESS': {
			const {home: {waitingNewsRequest, stories}} = store;
			return {
				...store.home,
				isLoading: waitingNewsRequest !== 1,
				...updateStories(stories, action.payload, waitingNewsRequest)
			}
		}


		case 'UPDATE_HOME_TIMER_ID': {
			return {
				...store.home,
				timerId: action.payload
			}
		}

		case 'STOP_HOME_TIMER': {
			clearTimeout(store.home.timerId);
			return store.home;
		}

		case 'FETCH_STORIES_FAILURE':
		case 'FETCH_STORIES_ID_FAILURE' :
			return {
				...store.home,
				waitingNewsRequest: 0
			}

		default:
			return store.home
	}
};

export default homeReducer;