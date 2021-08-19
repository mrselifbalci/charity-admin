import React,{useMemo,useEffect,useState} from 'react'
import axios from 'axios'
import {useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table';
import {BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill,BsPencilSquare,BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {COLUMNS} from './SlidersTableData'
import '../../styles/table.css'

 

 Modal.setAppElement('#root'); 

export default function Sliders({apiBaseUrl}) {
     
    
    const [data,setData]=useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);  
    const [modalPost,setModalPost]=useState('')
    const [title,setTitle]=useState('')
    const [summary,setSummary]=useState('')
    const [content,setContent]=useState('')
    const [type,setType]=useState('')
    const [authorName,setAuthorName]=useState('')
    const [quote,setQuote]=useState('')
    const [bannerImage,setBannerImage]=useState('')
    const [authorImage,setAuthorImage]=useState('')
    

    const handleSubmit=(sliderId)=>{
        const updatedNews={
            title,
            summary,
            content,
            type,
            authorName,
            quote,
            bannerImage,
            authorImage,
        }
        axios.put(`${apiBaseUrl}/slider/${sliderId}`,updatedNews)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{console.log(err)})
    }


    const editNews=async (sliderId)=>{
       await  axios
        .get(`${apiBaseUrl}/slider/${sliderId}`)
        .then((res) => { 
            console.log(res.data.data.quoteAuthorMedia) 
            setModalPost(res.data);
            setTitle(res.data.data.title)
            setType(res.data.data.type)
            setAuthorName(res.data.data.quoteAuthor)
            setQuote(res.data.data.quote)
            setSummary(res.data.data.summary)
            setContent(res.data.data.content)
            setBannerImage(res.data.data.mediaId)
            setAuthorImage(res.data.data.quoteAuthorMedia)
        })
        .catch((err) => {
            console.log(err);
        });
            setModalIsOpen(true)
            
    }



    const deleteNews=(sliderId)=>{
        axios
        .delete(`${apiBaseUrl}/slider/${sliderId}`)
        .then((res) => {
            window.location.reload()
        })   
        .catch((err) => {
            console.log(err);
        });
       
    }


    useEffect(() => {
        axios
			.get(`${apiBaseUrl}/slider`)
			.then((res) => {
				setData(res.data.data);
                console.log(res.data.data)

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
        <div>
            <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(211, 211, 211, 0.60)'
					},
					content: {
						height: "auto",
                        backgroundColor: '#347ca5',
                        border:"none",
                        width:"90%",
                        padding:"0 2% 2% 2%",
                        
        			},
				}}
			>
				<div className="modal-container">
                        <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>X</p>
                        <form onSubmit={(e)=>{e.preventDefault();handleSubmit(modalPost._id)}} className="modal-form">
                            <div className="modal-form-column-one">
                           
                                <div className="modal-form-item"> 
                                            <label>Title</label>
                                            <input value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                                <div className="modal-form-item">
                                        <label>Summary</label>
                                        <textarea value={summary} onChange={(e)=>{setSummary(e.target.value)}}/>
                                </div>
                                <div className="modal-group-container"> 
                                        <div className="modal-form-item"> 
                                            <label>Type</label>
                                            <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                                                <option value="news">News</option>
                                                <option value="campaign">Campaign</option>
                                            </select>
                                            
                                        </div>
                                        <div className="modal-form-item">
                                            <label>Author Name</label>
                                            <input value={authorName} onChange={(e)=>{setAuthorName(e.target.value)}}/>
                                        </div>
                                </div>
                                <div className="modal-form-item">
                                        <label>Quote</label>
                                        <textarea value={quote} onChange={(e)=>{setQuote(e.target.value)}}/>
                                </div>
                                <div className="modal-group-container">
                                <div className="modal-form-item">
                                    <label>Banner Image</label>
                                    <img src={bannerImage.url} alt="news"/>
                                    <input type="file" onChange={(e) => {setBannerImage(e.target.files[0])}}/>
                                </div>
                                <div className="modal-form-item modal-image-container">
                                    <label>Author Image</label>
                                    <img src={authorImage.url} alt="news-author"/>
                                    <input type="file" onChange={(e) => {setAuthorImage(e.target.files[0])}}/>
                                </div>
                            </div>
                                <div className="news-update-button-container" >
                                      <button className="news-update-button submit-button" type="submit">Submit</button>
                                </div>
                            </div>
                            <div className="modal-form-column-two">
                                   <label>Content</label>
                                   <textarea value={content}/>
                            </div>
                        </form>
                </div>
			</Modal>
        </div>
        <div className="table-container">
            <h1 className="table-title">News&Campaigns List</h1>
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
                                                <Link  to={`/newsdetails/${row.original._id}`}>
                                                    <BsFillEyeFill to={`/newsdetails/${row.original._id}`} className="table-view-icon action-icons" />&nbsp; 
                                                </Link>
                                                <BsPencilSquare className="table-edit-icon action-icons" onClick={()=>{editNews(row.original._id)}}/>&nbsp; 
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

