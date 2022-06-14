import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import fetchAllKids from '../actions/fetchAllKids';
import fetchStory from '../actions/fetchStory';
import { stopStoryTimer, updateStoryTimerId } from '../actions/updateStoryTimerId';
import { Spinner, UpdateBtn, Comment } from '../components';
import { withLayout, withNewsService } from '../hoc';
import getDate from '../utils/getDate';

const StoryPage = ({newsService}) => {
	const navigate = useNavigate();
	
	const {id} = useParams();

	const dispatch = useDispatch();

	const [isForce, setIsForce] = useState(false);

	const {
		data, activeParents, isWaiting, timerId, kids
	} = useSelector(store => store.story);

	useEffect(() => {
		fetchStory(id, newsService, dispatch)();

		return () => {
			dispatch(stopStoryTimer());
		}
			
	}, []);

	useEffect(() => {
		if(activeParents.length > 0 && isWaiting) {
			fetchAllKids(kids, newsService, dispatch)();
		}
	}, [activeParents])

	useEffect(() => {
		if(!isWaiting) {
			clearTimeout(timerId);
			if(isForce) {
				fetchAllKids(kids, newsService, dispatch)();
				setIsForce(false);
			}

			const newTimer = setTimeout(() => {
				fetchAllKids(kids, newsService, dispatch)();
				
			}, 60000)

			dispatch(updateStoryTimerId(newTimer));
		}
	}, [isWaiting, isForce])

	const forceUpdate = () => {
		setIsForce(true);
		dispatch(stopStoryTimer());
	}

	const {
		by, descendants, time, 
		title, score, url
	} = data;


	const goBack = () => navigate(-1);
	
	return(
		<div>
			{ data.id 
				? 
					<> <div className='row'>
						<h2>{title}</h2>
						<button className='btn btn_outline' onClick={goBack}>Back </button>
					</div>
					
					<div className='row'>
						{url && <a href={url}>({url})</a>}	
					</div>
					
					<div className='row'>
						<span>{score} points</span>
						<span>by {by}</span>
						<span>at {getDate(time)}</span>
						<span>{descendants} comments</span>
					</div> </>
				: 
					<Spinner/>
			}

			{ descendants > 0 && 
				<div className='comments'>
					{isWaiting && <Spinner/>}
					<Comment id={id}/>
				</div>
			}

			<UpdateBtn onClick={forceUpdate} loading={isWaiting}/>
		</div>
	)
};

export default withNewsService(withLayout(StoryPage));