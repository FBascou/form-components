import './Input.scss';

interface InputInterface {
	orientation: string;
	title?: string | null;
	type: string;
	name?: string;
	value?: any;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	checked?: boolean;
	pattern?: string;
	accept?: string;
	autoFocus?: boolean;
	min?: number;
	max?: number;
	size?: number;
	maxLength?: number;
	minLength?: number;
	// id?: string;
	handleInput?: (event: React.ChangeEvent<HTMLInputElement>) => void | React.ChangeEventHandler;
}

const Input = ({
	orientation,
	title,
	type,
	name,
	value,
	placeholder,
	required,
	disabled,
	checked,
	pattern,
	accept,
	autoFocus,
	min,
	max,
	size,
	maxLength,
	minLength,
	// id,
	handleInput,
}: InputInterface): JSX.Element => {
	return (
		<div className={`label-input-container label-input-${orientation}`}>
			{title ? (
				<label htmlFor={name} className='label-tag'>
					<h6>
						{title} {required ? <span className='input-required'>*</span> : null}
					</h6>
				</label>
			) : null}
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				placeholder={placeholder}
				className={`input-${type}-tag`}
				required={required}
				disabled={disabled}
				checked={checked}
				pattern={pattern}
				accept={accept}
				autoFocus={autoFocus}
				min={min}
				max={max}
				size={size}
				maxLength={maxLength}
				minLength={minLength}
				onChange={handleInput}
			/>
		</div>
	);
};

export default Input;
