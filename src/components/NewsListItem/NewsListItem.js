import { Link } from 'react-router-dom';
import getDate from '../../utils/getDate';

const NewsListItem = (props) => {

	const {
		by, descendants, id, 
		time, title, score,
		index
	} = props

	return(
		<Link to={`/${id}`} style={{width: '100%'}}>
			<li className='li'>
				<div className='index'>
					{index}
				</div>
				<div className='item'>
					<h2>{title}</h2>
					<div className='row'>
						<span>{score} points</span>
						<span>by {by}</span>
						<span>at {getDate(time)}</span>
						<span>{descendants} comments</span>
					</div>
				</div>
			</li>
		</Link>
	)
};

export default NewsListItem;