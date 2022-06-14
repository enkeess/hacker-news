
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchNews from '../actions/fetchStories';
import fetchStoriesId from '../actions/fetchStoriesId';
import { updateHomeTimerId, stopHomeTimer } from '../actions/updateHomeTimerId';
import { NewsList, Spinner, UpdateBtn } from '../components';
import { withLayout, withNewsService } from '../hoc';


const HomePage = ({ newsService }) => {

	const dispatch = useDispatch();

	const {
		storiesId, stories, timerId,
		waitingNewsRequest, isLoading
	} = useSelector(state => state.home);

	const [isForce, setIsForce] = useState(false);

	useEffect(() => {
		fetchStoriesId(newsService, dispatch)();

		return () => {
			dispatch(stopHomeTimer())
		}
	}, []);

	useEffect(() => {
		if(storiesId.length > 0 && waitingNewsRequest > 0) {
			fetchNews(storiesId, newsService, dispatch)();
		}
	}, [storiesId]);

	useEffect(() => {
		if(waitingNewsRequest === 0) {
			clearTimeout(timerId);

			if(isForce) {
				fetchStoriesId(newsService, dispatch)();
				setIsForce(false);
			}

			const newTimer = setTimeout(() => {
				fetchStoriesId(newsService, dispatch)();
				
			}, 60000)
			dispatch(updateHomeTimerId(newTimer));
		}
	}, [waitingNewsRequest, isForce])

	const forceUpdate = () => {
		setIsForce(true);
	}

	return (
		<div className='home'>
			{isLoading && <Spinner/>}
			<NewsList stories={stories} />
			<UpdateBtn onClick={forceUpdate} loading={isLoading}/>
		</div>
	)
};

export default withLayout(withNewsService(HomePage));


