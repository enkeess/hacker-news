
const Layout = (props) => {
	return(
		<>	
			<header className='header'>
				<div className='container'>
					<h1>
						Hacker News
					</h1>
				</div>
			</header>

			<div className='container' style={{paddingTop: '72px'}}>
				{props.children}
			</div>
			
		</>
	);
};

export default Layout;