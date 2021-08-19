
export const COLUMNS = [

    {
        Header:"BANNER",
        accessor:"mediaId",
        Cell: ({row})=>{       
        return <img src={row.original.mediaId.url} alt="news_img" style={{width:"80px",height:"80px",margin:"2px"}}></img>}
    },
    {
        Header:"FIRSTNAME",
        accessor:"firstname"
    },
    {
        Header:"LASTNAME",
        accessor:"lastname"
    },

    {
        Header:"EMAIL",
        accessor:"email",
    },
    {
        Header:"ROLE", 
        accessor:"role",

    },
    
]

