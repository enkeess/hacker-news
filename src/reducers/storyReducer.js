const initialState = {
	data: {}, 
	comments: [], 
	activeParents: [], 
	kids: [],
	timerId: -1,
	isWaiting: false,
}


const updateKids = (activeParents) => {
	return activeParents.reduce((res, item) => res.concat(item.kids), [])
}

const findAllKids = (id, comments) => {
	const kids = comments.filter(kid => kid.parent == id);

	const deepKids = kids.map(kid => findAllKids(kid.id, comments));

	if(deepKids.length > 0) {
		return kids.concat(...deepKids);
	} else {
		return kids;
	}
}

const removeParent = (id, comments, activeParents) => {
	const kids = findAllKids(id, comments);

	const newParents = activeParents.filter(parent => 
		!kids.some(kid => kid.parent == parent.id)
	)

	const newComments = comments.filter(comment => 
		!kids.some(kid => kid.id == comment.id))

	return [newComments, newParents];
}


const storyReducer = (store, action) => {
	if(store === undefined) {
		return initialState;
	}

	switch(action.type) {
		case 'FETCH_STORY_REQUEST': { 
			return {
				...initialState,
			}
		} 

		case 'FETCH_STORY_SUCCESS': { 
			const activeParents = [action.payload];
			const kids=  updateKids(activeParents);
			return {
				...store.story,
				data: action.payload,
				activeParents,
				kids,
				isWaiting: true
			}
		}

		case 'FETCH_ALL_KIDS_REQUEST': {
			return {
				...store.story,
				isWaiting: true
			}
		}

		case 'FETCH_ALL_KIDS_SUCCESS': { 
			return {
				...store.story,
				comments: action.payload,
				isWaiting: false
			}
		}

		case 'ADD_PARENT' : {
			const {story: { activeParents }} = store;
			const newParents = activeParents.concat(action.payload);
			return {
				...store.story,
				activeParents: activeParents.concat(action.payload),
				kids: updateKids(newParents),
				isWaiting: true
			}
		}

		case 'REMOVE_PARENT' : {
			const {story: { activeParents, comments }} = store;

			const [newComments, newParents] = removeParent(action.payload, comments, activeParents);

			return {
				...store.story,
				comments: newComments,
				activeParents: newParents,
				kids: updateKids(newParents)
			}
		}

		case 'UPDATE_STORY_TIMER_ID': {
			return {
				...store.story,
				timerId: action.payload
			}
		}

		case 'STOP_STORY_TIMER': {
			clearTimeout(store.story.timerId);
			return store.story
		}

		case 'FETCH_ALL_KIDS_FAILURE':
		case 'FETCH_STORY_FAILURE': {
			return {
				...store.story,
				isWaiting: false
			}
		}

		default: 
			return store.story
	}
};

export default storyReducer;

