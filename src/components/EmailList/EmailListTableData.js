
export const COLUMNS = [

    {
        Header:"FIRSTNAME",
        accessor:"firstname"
    },
    {
        Header:"LASTNAME",
        accessor:"lastname"
    },
    {
        Header:"TYPE",
        accessor:"type",
        Cell:({row})=>{
            return row.original.type ? row.original.type.slice(0,1).toUpperCase() + row.original.type.slice(1) : null
         }
    },

    {
        Header:"EMAIL",
        accessor:"email",
    },
    {
        Header:"MESSAGE",
        accessor:"message",
        Cell:({row})=>{
            return <span>{row.original.message && row.original.message.slice(0,40)}...</span>  }
    },
    
]

