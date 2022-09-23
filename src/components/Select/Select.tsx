import './Select.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface InputInterface {
	orientation?: string;
	title?: string;
	name?: string;
	value: any | any[];
	optionList: any[];
	optionKey?: any;
	uniqueTitle?: string | null;
	uniqueValue?: any | any[] | null;
	placeholder?: string | null;
	required?: boolean;
	disabled?: boolean;
	hidden?: boolean;
	handleSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
	orientation,
	title,
	name,
	value,
	optionList,
	optionKey,
	uniqueTitle,
	uniqueValue,
	placeholder,
	required,
	disabled,
	hidden,
	handleSelect,
}: InputInterface): JSX.Element => {
	return (
		<div className={`label-select-container label-select-${orientation}`}>
			<label htmlFor={name} className='label-tag'>
				<h6>
					{title} {required ? <span className='select-required'>*</span> : null}
				</h6>
			</label>
			<select name={name} id={name} value={value} onChange={handleSelect} required={required}>
				{placeholder !== null ? (
					<option
						value=''
						disabled={disabled}
						hidden={hidden}
						id='label-select-option-disabled'
					>
						{placeholder}
					</option>
				) : null}
				{uniqueTitle !== null ? <option value={uniqueValue}>{uniqueTitle}</option> : null}
				{optionList.map((item, index) => (
					<option key={item.id || index} value={item[optionKey] || item}>
						{item[optionKey] || item}
					</option>
				))}
			</select>
			<ArrowDropDownIcon className='label-select-drop-down-icon' />
		</div>
	);
};

export default Select;
