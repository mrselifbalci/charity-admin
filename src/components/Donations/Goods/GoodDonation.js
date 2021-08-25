import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { BsArrowUpDown } from 'react-icons/bs';
import { BsFillEyeFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { COLUMNS } from './GoodDonationData';
import '../../../styles/table.css';
import './GoodDonation.css';

Modal.setAppElement('#root');

const GoodDonation = ({ apiBaseUrl }) => {
	const [data, setData] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [postcode, setPostcode] = useState('');
	const [typeOfGoods, setTypeOfGoods] = useState('');
	const [instructions, setInstructions] = useState('');

	const viewGoodDonation = async (donationId) => {
		await axios
			.get(`${apiBaseUrl}/donations/${donationId}`)
			.then((res) => {
				setFirstname(res.data.data.userId.firstname);
				setLastname(res.data.data.userId.lastname);
				setEmail(res.data.data.userId.email);
				setPhone(res.data.data.phone);
				setAddress(res.data.data.address);
				setPostcode(res.data.data.postcode);
				setTypeOfGoods(res.data.data.type_of_goods);
				setInstructions(res.data.data.instructions);
			})
			.catch((err) => {
				console.log(err);
			});
		setModalIsOpen(true);
	};

	const deleteGoodDonation = (donationId) => {
		axios
			.delete(`${apiBaseUrl}/donations/${donationId}`)
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get(`${apiBaseUrl}/donations/type/good`)
			.then((res) => {
				setData(res.data.data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [apiBaseUrl]);

	const columns = useMemo(() => COLUMNS, []);
	const goodDonation = useMemo(() => data, []);

	useTable({
		columns: columns,
		data: goodDonation,
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		setPageSize,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	console.log(data);

	return (
		<div className='news-component-wrapper'>
			<div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					style={{
						overlay: {
							backgroundColor: 'rgba(211, 211, 211, 0.60)',
						},
						content: {
							height: 'auto',
							backgroundColor: '#347ca5',
							border: 'none',
							width: '70%',
							padding: '0 2% 2% 2%',
							margin: '20px auto',
						},
					}}>
					<div className='modal-container'>
						<p
							className='close-modal-x'
							onClick={() => setModalIsOpen(false)}>
							X
						</p>
						<form className='modal-form'>
							<div className='modal-form-item'>
								<h2>Name</h2>
								<p>
									{firstname} {lastname}
								</p>
							</div>

							<div className='modal-group-container'>
								<div className='modal-form-item'>
									<h2>Phone</h2>
									<p>{phone}</p>
								</div>
								<div className='modal-form-item'>
									<h2>Email</h2>
									<p>{email}</p>
								</div>
								<div className='modal-form-item'>
									<h2>Address</h2>
									<p>{address}</p>
								</div>
							</div>
							<div className='modal-form-item'>
								<h2>Post Code</h2>
								<p>{postcode}</p>
							</div>
							<div className='modal-group-container'>
								<div className='modal-form-item'>
									<h2>Type of Goods</h2>
									<p>{typeOfGoods}</p>
								</div>
								<div className='modal-form-item'>
									<h2>Instructions to the Driver</h2>
									<p>{instructions}</p>
								</div>
							</div>
						</form>
					</div>
				</Modal>
			</div>
			<div className='table-container'>
				<h1 className='table-title'>Good Donations</h1>
				<hr className='hr-table' />
				<div className='table-show-search-wrapper'>
					<div className='table-show-bar'>
						<p>Show&nbsp;</p>{' '}
						<select
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}>
							{[10, 20, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
						&nbsp; <p>entries</p>
					</div>

					<div className='table-search-bar'>
						<p>Search:&nbsp;&nbsp;</p>
						<input
							value={globalFilter || ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</div>
				</div>

				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}>
										<div className='table-sort-icon-container'>
											<div>{column.render('Header')}</div>
											<div className='table-sort-icon'>
												<BsArrowUpDown />
											</div>
										</div>
									</th>
								))}
								<th>Email</th>
								<th>ACTION</th>
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr className='table-row-wrapper' {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										);
									})}
									<td>{row.original.userId.email}</td>
									{console.log(row.original.userId.email)}
									<td className='table-action-icons-wrapper'>
										<BsFillEyeFill
											className='table-view-icon action-icons'
											onClick={() => {
												viewGoodDonation(row.original._id);
											}}
										/>
										&nbsp; &nbsp;
										<BsFillTrashFill
											className='table-delete-icon action-icons'
											onClick={() => {
												deleteGoodDonation(row.original._id);
											}}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className='table-button-container'>
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>
					<button
						className='table-page-nav'
						onClick={() => previousPage()}
						disabled={!canPreviousPage}>
						Previous
					</button>
					<div className='table-current-page'>{pageIndex + 1}</div>
					<button
						className='table-page-nav'
						onClick={() => nextPage()}
						disabled={!canNextPage}>
						Next
					</button>
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}>
						{'>>'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GoodDonation;
