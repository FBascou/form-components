import './List.scss';

interface ListInterface {
	type: 'ol' | 'ul';
	itemList: Array<string | number | null>;
}

const List = ({ type, itemList }: ListInterface): JSX.Element => {
	const ListType = type as keyof JSX.IntrinsicElements;
	return (
		<div className='list-container'>
			<ListType>
				{itemList.map((item, index: number) => (
					<li key={index}>{item}</li>
				))}
			</ListType>
		</div>
	);
};

export default List;
