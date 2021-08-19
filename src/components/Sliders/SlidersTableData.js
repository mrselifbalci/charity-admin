
export const COLUMNS = [

    {
        Header:"BANNER",
        accessor:"mediaId",
        Cell: ({row})=>{       
        return <img src={row.original.mediaId.url} alt="news_img" style={{width:"80px",height:"80px",margin:"2px"}}></img>}
    },
    {
        Header:"TITLE",
        accessor:"title"
    },

    {
        Header:"TYPE",
        accessor:"type",
        Cell:({row})=>{
            return row.original.type ? row.original.type.slice(0,1).toUpperCase() + row.original.type.slice(1) : null
         }
    },
    {
        Header:"AUTHOR",
        accessor:"quoteAuthor",
        Cell:({row})=>{
            return row.original.quoteAuthor ? row.original.quoteAuthor.slice(0,1).toUpperCase() + row.original.quoteAuthor.slice(1) : 'N/A'
         }
    },
    {
        Header:"QUOTE", 
        accessor:"quote",
        Cell:({row})=>{
            return <span>{row.original.quote && row.original.quote.slice(0,40)}...</span>  }
    },
    
]

