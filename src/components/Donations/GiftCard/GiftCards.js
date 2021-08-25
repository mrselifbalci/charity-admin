import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import {BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill,BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {COLUMNS} from './GiftCardColumns'
import '../../../styles/table.css'
import '../../../styles/news.css' 
import { EditModal } from './Modals';
 



export default function GiftCards({apiBaseUrl}) {
     
    
    const [data,setData]=useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);  
    const [id, setId]=useState('')

   
    const deleteNews=(newsId)=>{
        axios
        .delete(`${apiBaseUrl}/donations/${newsId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        });
       
    }

    useEffect(() => {
        if(!modalIsOpen) {
            setId('')
        }
    }, [modalIsOpen])


    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/donations/type/gift-card`)
			.then((res) => {
                console.log(res.data.data)
				setData(res.data.data);

			})
			.catch((err) => {
				console.log(err);
			});
    }, [])

    const columns = useMemo(() => COLUMNS,[])
    const news = useMemo(() => data,[])
     
   

    useTable({
        columns:columns,
        data:news
    })
   
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
    } = useTable({
        columns,
        data
    },
    useGlobalFilter,useSortBy,usePagination)
 
    const { globalFilter,pageIndex,pageSize }=state


    return (
    <div className="news-component-wrapper">
        <EditModal apiBaseUrl={apiBaseUrl} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} id={id}/>
        <div className="table-container">
            <h1 className="table-title">Gift Cards</h1>
            <hr className="hr-table"/>
            <div className="table-show-search-wrapper" >
                <div className="table-show-bar">
                   <p>Show&nbsp;</p> <select  value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                                    {
                                        [10,20,50].map(pageSize=>(
                                            <option key={pageSize} value={pageSize}>
                                                {pageSize}
                                            </option>
                                        ))
                                    } 
                                </select>&nbsp; <p>entries</p>
                </div>
            
                <div className="table-search-bar">
                    <p>Search:&nbsp;&nbsp;</p>
                    <input value={globalFilter || ''}
                    onChange={e=>setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>
          
         <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup)=>(
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                        {/* <th></th> */}
                                        {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <div className="table-sort-icon-container">
                                                <div>{column.render('Header')}</div>
                                                <div className="table-sort-icon"><BsArrowUpDown/></div>
                                            </div>
                                    </th> ))}
                                    <th>ACTION</th>  
                                </tr>
                            ))
                        }
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row=>{ 
                                prepareRow(row)
                                return(
                                        <tr className="table-row-wrapper"  {...row.getRowProps()}>   
                                            {row.cells.map((cell)=>{
                                                return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                            <td className="table-action-icons-wrapper">
                                                    <BsFillEyeFill to={`/newsdetails/${row.original._id}`} className="table-view-icon action-icons" />&nbsp; 
                                                <BsPencilSquare className="table-edit-icon action-icons" onClick={()=>{setId(row.original._id)}}/>&nbsp; 
                                                <BsFillTrashFill className="table-delete-icon action-icons" onClick={()=>{deleteNews(row.original._id)}}/>
                                            </td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
        </table>
       <div className="table-button-container">
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button className="table-page-nav" onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <div className="table-current-page">{pageIndex+1}</div>
            <button className="table-page-nav" onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
       </div>
       
        
    </div>
</div> 
    )
}

