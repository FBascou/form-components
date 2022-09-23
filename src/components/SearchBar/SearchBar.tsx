import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './SearchBar.scss';

interface SearchInterface {
	title: string | null;
	value: any;
	placeholder?: string;
	handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	btn: boolean;
	btnSize: string;
	btnStyle: string;
	handleClick:
		| ((event: React.MouseEvent<HTMLButtonElement>) => void)
		| ((event: React.MouseEvent<HTMLButtonElement>) => JSX.Element)
		| React.MouseEventHandler;
}

const SearchBar = ({
	title,
	value,
	placeholder,
	handleInput,
	btn,
	btnSize,
	btnStyle,
	handleClick,
}: SearchInterface): JSX.Element => {
	return (
		<div className='search-bar-container'>
			<div className='search-bar-input'>
				<Input
					orientation={'horizontal'}
					title={title}
					type='search'
					value={value}
					name='search-bar'
					placeholder={placeholder}
					handleInput={handleInput}
				/>
			</div>
			{btn ? (
				<div className='search-bar-btn'>
					<Button
						btnSize={btnSize}
						btnStyle={btnStyle}
						btnTitle='Search'
						handleClick={handleClick}
					/>
				</div>
			) : null}
		</div>
	);
};

export default SearchBar;
