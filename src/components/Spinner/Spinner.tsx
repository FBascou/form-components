import './Spinner.scss';
import B2GLogo from '../../assets/images/B2GLogo.png';

interface SpinnerInterface {
	size: string;
	img: boolean;
}

const Spinner = ({ size, img }: SpinnerInterface) => {
	return (
		<div className={`spinner-container`}>
			<div className='spinner-logo'>{img ? <img src={B2GLogo} alt='B2G Logo' /> : null}</div>
			<div className={`spinner-circle spinner-${size}`}></div>
		</div>
	);
};

export default Spinner;
