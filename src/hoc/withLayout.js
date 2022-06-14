import Layout from '../components/Layout';

const withLayout = (Wrapped) => (props) => {
	return(
		<Layout>
			<Wrapped {...props}/>
		</Layout>
	);
};

export default withLayout;