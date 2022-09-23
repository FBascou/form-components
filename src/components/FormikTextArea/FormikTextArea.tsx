import { useField } from 'formik';
import './FormikTextArea.scss';

interface FormikTextAreaInterface {
	orientation: string;
	label?: string;
	labelKor?: boolean;
	id: string;
	name: string;
	placeholder?: string;
	required?: boolean;
}

const FormikTextArea = ({
	orientation,
	label,
	labelKor,
	...props
}: FormikTextAreaInterface): JSX.Element => {
	const [field, meta] = useField(props);

	return (
		<div className={`formik-input-container formik-label-input-${orientation}`}>
			{label ? (
				<label htmlFor={props.name} className='formik-label'>
					<h6>
						{labelKor ? <span style={{ fontWeight: '800' }}>{label}</span> : label}{' '}
						{props.required ? <span className='input-required'>*</span> : null}
					</h6>
				</label>
			) : null}
			<textarea {...props} {...field} className={`formik-textarea`} />
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</div>
	);
};

export default FormikTextArea;
