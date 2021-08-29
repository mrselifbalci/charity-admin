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
		Cell: ({ row }) => {
			return (
				<>
					{row.original.reason_to_join.length !== 0 ? (
						<span>
							{row.original.reason_to_join &&
								row.original.reason_to_join.slice(0, 30)}
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
