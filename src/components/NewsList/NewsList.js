import NewsListItem from '../NewsListItem';

const NewsList = ({stories}) => {

	return (
		<ul className='list'>
			{stories.map((item, index) => 
				<NewsListItem key={item.id} {...item} index={index + 1}/>
			)}
		</ul>
	);
}

export default NewsList;