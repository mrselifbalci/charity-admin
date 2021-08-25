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
		Header: 'City',
		accessor: 'city',
	},

	{
		Header: 'Interested In',
		accessor: 'interested_in',
		Cell: ({ row }) => {
			return (
				<p>
					{row.original.interested_in &&
						row.original.interested_in.slice(0, 30)}
					...
				</p>
			);
		},
	},

	{
		Header: 'Comments',
		accessor: 'comments',
		Cell: ({ row }) => {
			return (
				<p>{row.original.comments && row.original.comments.slice(0, 30)}...</p>
			);
		},
	},
];
