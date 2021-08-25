export const COLUMNS = [
	{
		Header: 'Name',
		accessor: 'userId',
		Cell: ({ row }) => {
			return (
				<span>
					{row.original.userId &&
						row.original.userId.firstname +
							' ' +
							row.original.userId.lastname}
				</span>
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
				<>
					{row.original.interested_in.length !== 0 ? (
						<span>
							{row.original.interested_in &&
								row.original.interested_in.slice(0, 30)}
							...
						</span>
					) : (
						<span>-</span>
					)}
				</>
			);
		},
	},

	{
		Header: 'Comments',
		accessor: 'comments',
		Cell: ({ row }) => {
			return (
				<>
					{row.original.comments.length !== 0 ? (
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
