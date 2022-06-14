import Spinner from '../Spinner';

const UpdateBtn = ({loading, onClick}) => {
	return(
		<button 
			className='btn btn_danger btn_outline btn_fixed'
			onClick={onClick}
		>
			{loading ? <Spinner/> : 'Update'}
		</button>
	)
};



export default UpdateBtn;