export const COLUMNS = [
	{
		Header: 'BANNER',
		accessor: 'mediaId',
		Cell: ({ row }) => {
			return (
				<img
					src={row.original.mediaId.url}
					alt='news_img'
					style={{ width: '80px', height: '80px', margin: '2px' }}></img>
			);
		},
	},
	{
		Header: 'TITLE',
		accessor: 'title',
	},

	{
		Header: 'TYPE',
		accessor: 'type',
		Cell: ({ row }) => {
			return row.original.type
				? row.original.type.slice(0, 1).toUpperCase() + row.original.type.slice(1)
				: null;
		},
	},
	{
		Header: 'AUTHOR',
		accessor: 'quoteAuthor',
	},
	{
		Header: 'SUMMARY',
		accessor: 'summary',
		Cell: ({ row }) => {
			return (
				<span>
					{row.original.summary && row.original.summary.slice(0, 40)}...
				</span>
			);
		},
	},
];
