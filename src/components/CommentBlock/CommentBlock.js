import {  useSelector } from 'react-redux';
import Comment from '../Comment';

const CommentBlock = (props) => {
	const { id } = props;

	const { comments } = useSelector(store => store.story);

	const getComments = () => {
		return comments
			.filter(item => item.parent == id)
			.sort((a, b) => b.time - a.time)
			.map(item => {
				return <Comment key={item.id} {...item}/>
			})
	}

	return(
		<ul className='comment__block'>
			{getComments()}
		</ul>
	)
};

export default CommentBlock;

