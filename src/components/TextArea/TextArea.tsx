import './TextArea.scss';

interface TextAreaInterface {
	orientation: string;
	title?: string | null;
	name?: string;
	value?: any;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	maxLength?: number;
	minLength?: number;
	cols?: number;
	rows?: number;
	wrap?: 'soft' | 'hard';
	// id?: string;
	handleTextArea: (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => void | React.ChangeEventHandler;
}

const TextArea = ({
	orientation,
	title,
	name,
	value,
	placeholder,
	required,
	disabled,
	autoFocus,
	maxLength,
	minLength,
	cols,
	rows,
	wrap,
	// id,
	handleTextArea,
}: TextAreaInterface): JSX.Element => {
	return (
		<div className={`label-textarea-container label-textarea-${orientation}`}>
			{title ? (
				<label htmlFor={name} className='label-tag'>
					<h6>
						{title} {required ? <span className='textarea-required'>*</span> : null}
					</h6>
				</label>
			) : null}
			<textarea
				name={name}
				id={name}
				value={value}
				placeholder={placeholder}
				className={`textarea-tag`}
				required={required}
				disabled={disabled}
				autoFocus={autoFocus}
				maxLength={maxLength}
				minLength={minLength}
				cols={cols}
				rows={rows}
				wrap={wrap}
				onChange={handleTextArea}
			/>
		</div>
	);
};

export default TextArea;
