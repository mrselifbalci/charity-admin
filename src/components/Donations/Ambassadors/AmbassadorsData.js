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
		Header: 'Reason to Join',
		accessor: 'reason_to_join',
	},
	{
		Header: 'Interested In',
		accessor: 'interested_in',
	},

	{
		Header: 'Comments',
		accessor: 'comments',
		Cell: ({ row }) => {
			return (
				<>
					{row.original.instructions.length !== 0 ? (
						<span>
							{row.original.comments && row.original.comments.slice(0, 30)}
							...
						</span>
					) : (
						<span>-</span>
					)}
				</>
			);
		},
	},
];
