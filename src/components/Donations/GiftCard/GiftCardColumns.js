
export const COLUMNS = [

    {
        Header:"Name",
        accessor:'firstname'
    },
    {
        Header:"TYPE",
        accessor:"type",
        Cell:({row})=>{
            return row.original.type ? (row.original.type.slice(0,1).toUpperCase() + row.original.type.slice(1)).replace('-', ' ') : null
         }
    },
    {
        Header:"Card Type",
        accessor:"type_of_card"
    },
    {
        Header:"Amount",
        accessor:"amount",
        Cell:({row}) => <span style={{display:'flex', justifyContent:'center'}}>{row.original.amount}</span>
    },
    {
        Header:"Card Number",
        accessor:"card_number",
    },
    {
        Header:"Expiration Date",
        accessor:"expiration_date",
        Cell:({row}) => <span style={{display:'flex', justifyContent:'center'}}>{row.original.expiration_date}</span>
    },
    {
        Header:"Security Code",
        accessor:"security_code",
        Cell:({row}) => <span style={{display:'flex', justifyContent:'center'}}>{row.original.security_code}</span>
    },
    {
        Header:"Comments", 
        accessor:"comments",
        Cell:({row})=>{
            return <span>{row.original.comments && row.original.comments.slice(0,40)}...</span>  }
    },
    
]

