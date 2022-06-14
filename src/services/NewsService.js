export default class NewsService {
	_baseUrl = 'https://hacker-news.firebaseio.com/v0/'

	getRequest = async (path) => {
		try {
			return await fetch(`${this._baseUrl}${path}.json`).then(response => {
				if(response.ok) {
					switch(response.status) {
						case 404 : 
							throw new Error(response);
						case 500 :
							throw new Error(response);
						default: 
							break;
					}	
						return response;


				} else {
					throw new Error(response);
				}
			}).then(res => 
				res.json());

		} catch (error) {
			console.log('Возникла проблема с вашим fetch запросом: ', error.message);
			return undefined;
		}
	}

	getItem = async (id) => {
		return await this.getRequest(`item/${id}`);
	}

	getItems = async (items) => {
		let itemsData =  await Promise.all(
			items.map(async item => await this.getItem(item))
		);
		return [...itemsData];
	}

	getNewStories = async () => {
		return await this.getRequest('newstories');
	}
}