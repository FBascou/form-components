import { useField } from 'formik';
import './FormikInput.scss';

interface FormikInputInterface {
	orientation: string;
	label?: string;
	labelKor?: boolean;
	id: string;
	name: string;
	type: string;
	placeholder?: string;
	accept?: string;
	disabled?: boolean;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	checked?: any;
}

const FormikInput = ({ orientation, label, labelKor, accept, ...props }: FormikInputInterface) => {
	const [field, meta] = useField(props);

	return (
		<>
			<div className={`formik-input-container formik-label-input-${orientation}`}>
				{label ? (
					<label htmlFor={props.name} className='formik-label'>
						<h6>
							{labelKor ? <span style={{ fontWeight: '800' }}>{label}</span> : label}{' '}
							{props.required ? <span className='input-required'>*</span> : null}
						</h6>
					</label>
				) : null}
				<input
					{...props}
					{...field}
					accept={accept}
					className='formik-input'
					// onChange={props.onChange} // ADD ONCHANGE TO THE INPUT FORMS???
				/>
			</div>
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</>
	);
};

export default FormikInput;
