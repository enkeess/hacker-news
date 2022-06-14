import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, StoryPage } from './pages';

const App = () => {
  return (
    <Routes>
		<Route path='/' element={<HomePage/>}  exact/>
		<Route path='/:id' element={<StoryPage/>} /> 
		<Route path="*" element={
			<div>
				Page not found!
			</div>
		}/>
	</Routes>
  );
}

export default App;