export const COLUMNS = [
	{
		Header: 'Name',
		accessor: 'userId',
		Cell: ({ row }) => {
			return (
				row.original.userId &&
				row.original.userId.firstname + ' ' + row.original.userId.lastname
			);
		},
	},

	{
		Header: 'Phone',
		accessor: 'phone',
	},

	{
		Header: 'Address',
		accessor: 'address',
	},

	{
		Header: 'Post Code',
		accessor: 'postcode',
	},
	{
		Header: 'Type of Goods',
		accessor: 'type_of_goods',
	},

	{
		Header: 'Instructions',
		accessor: 'instructions',
		Cell: ({ row }) => {
			return (
				<span>
					{row.original.instructions && row.original.instructions.slice(0, 30)}
					...
				</span>
			);
		},
	},
];
