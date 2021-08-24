export const COLUMNS = [
	{
		Header: 'Name',
		accessor: 'userId',
		Cell: ({ row }) => {
			return row.original.userId.firstname + ' ' + row.original.userId.lastname;
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
	},

	{
		Header: 'Comments',
		accessor: 'comments',
	},
];
