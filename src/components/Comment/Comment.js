import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addParent, removeParent } from '../../actions/updateParents';

import getDate from '../../utils/getDate';
import CommentBlock from '../CommentBlock';

const Comment = (props) => {
	const { id } = props;

	const {
		comments, activeParents
	} = useSelector(store => store.story);
	
	const [isShow, setIsShow] = useState('Show reply')

	const dispatch = useDispatch();
	
	const toggleIsShow = () => {
		setIsShow(isShow => !isShow);
	}

	const toggleActiveParent = () => {	
		
		if(activeParents.findIndex(item => item.id == id) !== -1) {
			dispatch(removeParent(id));
		} else {
			addParent(comments.find((item => item.id == id)), dispatch)();
		}

		toggleIsShow();	
	}

	const getComment = () => {
		const index = comments.findIndex(item => item.id == id)
		if(index !== -1) {
			 const {
				by, kids,
				text, time
			} = comments[index];

			const reply = (kids && kids.length) || 0;

			return(
				<>	
					<div className='row'>
					<span>by {by}</span>
					<span>{getDate(time)}</span>
						{reply > 0 && <span> {reply} reply</span>}
						{reply > 0 &&  
							<button
								className='btn btn_small btn_danger' 
								onClick={toggleActiveParent}
							> 
							{isShow ? 'Show reply ' : 'Hide reply'}
							
							</button>
						}
					</div>

					<div dangerouslySetInnerHTML={{__html: text}}/>
				</>
			)
		} else {
			return null;
		}
	}

	return(
		<li className='comment'>
			{getComment()}
			<CommentBlock id={id}/>
		</li>
	)
}

export default Comment;