
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
        Header:"EMAIL",
        accessor:"email",
    },
    {
        Header:"SUBJECT",
        accessor:"subject",
    },
    {
        Header:"CONTENT",
        accessor:"content",
        Cell:({row})=>{
            return <span>{row.original.content && row.original.content.slice(0,40)}...</span>  }
    },
    {
        Header:"Phone",
        accessor:"phoneNumber",
        Cell:({row})=>{
            return <span>{row.original.phoneNumber && row.original.phoneNumber.slice(0,5)}...</span>  }
    },
    
]

