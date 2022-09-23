import { useField } from 'formik';
import Select, { Options, OnChangeValue, components, DropdownIndicatorProps } from 'react-select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './FormikSelect.scss';
import { ColorSystemOptions } from '@mui/material/styles/experimental_extendTheme';

interface Option {
	label: string;
	value: string;
}

interface FormikSelectInterface {
	orientation: string;
	label?: string;
	labelKor?: boolean;
	uniqueTitle?: string;
	uniqueValue?: any;
	id: string;
	name: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	options: Options<Option>;
	isMulti?: boolean;
	maxLimit?: number;
}

const FormikSelect = ({
	orientation,
	label,
	labelKor,
	uniqueTitle,
	uniqueValue,
	placeholder,
	options,
	isMulti = false,
	maxLimit = 3,
	...props
}: FormikSelectInterface) => {
	const [field, meta, helpers] = useField(props);
	const { setValue } = helpers;

	const onChange = (option: OnChangeValue<Option, boolean>) => {
		setValue(
			isMulti
				? (option as Option[]).map((item: Option) => item.value)
				: (option as Option).value
		);
	};

	const getValue = () => {
		if (options) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : ('' as any);
		}
	};

	const CaretDownIcon = () => {
		return <ArrowDropDownIcon className='formik-select-drop-down-icon' />;
	};

	const DropdownIndicator = (props: DropdownIndicatorProps) => {
		return (
			<components.DropdownIndicator {...props}>
				<CaretDownIcon />
			</components.DropdownIndicator>
		);
	};

	const customStyles = {
		option: (provided: any, state: any) => ({
			...provided,
		}),

		singleValue: (provided: any, state: any) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';

			return { ...provided, opacity, transition };
		},

		valueContainer: (provided: any, state: any) => ({
			...provided,
			padding: 0,
			margin: 0,
			border: 'none',
			outline: 'none',
		}),

		control: (provided: any, state: any) => ({
			...provided,
			padding: 0,
			margin: 0,
			border: 'none',
			outline: 'none',
		}),

		input: (provided: any, state: any) => ({
			...provided,
			padding: 0,
			margin: 0,
			border: 'none',
			outline: 'none',
		}),
	};

	return (
		<div className={`formik-select-container formik-select-${orientation}`}>
			{label ? (
				<label htmlFor={props.name} className='formik-label'>
					<h6>
						{labelKor ? <span style={{ fontWeight: '800' }}>{label}</span> : label}{' '}
						{props.required ? <span className='input-required'>*</span> : null}
					</h6>
				</label>
			) : null}
			<Select
				components={{ DropdownIndicator }}
				placeholder={placeholder}
				options={options}
				isMulti={isMulti}
				onChange={onChange}
				value={getValue()}
				isOptionDisabled={
					isMulti ? () => getValue().length >= maxLimit : () => getValue() === 'null'
				}
				styles={customStyles}
				{...props}
			/>
			{/* <ArrowDropDownIcon className='formik-select-drop-down-icon' /> */}
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</div>
	);
};

export default FormikSelect;
