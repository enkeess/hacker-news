import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ErrorBoundry, NewsServiceProvider } from './components';
import { NewsService } from './services';
import App from './App';
import store from './app/store';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

const newsService = new NewsService();

root.render(
  	// <React.StrictMode>
		<Provider store={store}>
			<ErrorBoundry>
				<NewsServiceProvider value={newsService}>
					<Router>
						<App />
					</Router>
				</NewsServiceProvider>
			</ErrorBoundry>
		</Provider>
	// </React.StrictMode>
);