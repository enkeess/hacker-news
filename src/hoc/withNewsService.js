
import { NewsServiceConsumer } from '../components/NewsServiceContext'

const withNewsService = (Wrapped) =>  {
	return (props) => {
		return(
			<NewsServiceConsumer>
				{
					(newsService) => 
						<Wrapped {...props} newsService={newsService}/>
					
				}
			</NewsServiceConsumer>
		);
	};
}

export default withNewsService;