import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Captcha.scss';

interface CaptchaInterface {
	captchaInput: string;
	handleCaptchaInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialValue: string = '';

const Captcha = ({ captchaInput, handleCaptchaInput }: CaptchaInterface) => {
	let captcha = new Array();
	const [activeCaptcha, setActiveCaptcha] = useState<string>('');

	const createCaptcha = () => {
		for (let i = 0; i < 6; i++) {
			if (i % 2 == 0) {
				captcha[i] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
			} else {
				captcha[i] = Math.floor(Math.random() * 10 + 0);
			}
		}
		let theCaptcha = captcha.join('');
		setActiveCaptcha(theCaptcha);
	};

	const handleNewCaptcha: React.MouseEventHandler<HTMLInputElement> | undefined = (
		event: React.MouseEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		createCaptcha();
	};

	// const handleCaptchaInput: React.ChangeEventHandler<HTMLInputElement> | undefined = (
	// 	event: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const value = event.target.value;
	// 	setCaptchaInput(value);
	// };

	// const handleButtonDisable = () => {
	// 	let validateCaptcha = 0;

	// 	for (var i = 0; i < 6; i++) {
	// 		if (captchaInput.charAt(i) != captcha[i]) {
	// 			validateCaptcha++;
	// 		}
	// 	}

	// 	if (captchaInput === '') {
	// 		setError('Re-Captcha must be filled');
	// 	} else if (captchaInput !== activeCaptcha) {
	// 		setError('Wrong Captcha');
	// 	} else {
	// 		setIsDisabled(false);
	// 		setError('Correct');
	// 	}
	// };

	return (
		<div className='captcha-container'>
			<div className='captcha-container'>
				<div id='captcha' className='captcha'>
					{activeCaptcha}
				</div>
				<div className='captcha-input-container'>
					<div className='captcha-input'>
						<Input
							orientation={'vertical'}
							type={'text'}
							name='reCaptcha'
							placeholder='Enter the Captcha code'
							required={true}
							value={captchaInput}
							handleInput={handleCaptchaInput}
							maxLength={6}
						/>
					</div>
					<div className='captcha-restart'>
						<Button
							btnStyle={'secondary'}
							btnTitle={'Change'}
							btnSize={'md'}
							handleClick={handleNewCaptcha}
						/>
					</div>
				</div>
				<div id='captcha-err-msg' className='captcha-err-msg'></div>
			</div>
		</div>
	);
};

export default Captcha;
