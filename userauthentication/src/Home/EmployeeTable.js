import { useEmployeContext } from "../hooks/CustomHooks"


function HomeTable({data,config}){

    const {sortListingByName,employee_state} = useEmployeContext();

    const onSortingHandler = () =>{
        sortListingByName(data)
    }

    //----------------------create dynamic headers while looping over config element------------------
    const rendered_headers = config.map(header=>{
        return(<th width="500" key={header.label}><span onClick={onSortingHandler}>{header.label == 'Employee Name' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
      </svg>}</span>{header.label}</th>)
    })


    //----------------------create dynamic rows while looping over data element------------------
    const rendered_rows = data.map(table_data=>{

        const rendered_cells = config.map((column)=>{
            return(
                <td key={column.label}>{column.render(table_data)}</td>
            )
        })

        return(
            <tr key={table_data.id}>
                {rendered_cells}
          </tr>
        )
    })

    return(
        <table className="table table-dark stripped bordered hover" variant="dark" size="lg">
            <thead>
            <tr>
                {rendered_headers}
            </tr>
            </thead>
            <tbody>
                {rendered_rows}
            </tbody>
        </table>
    )
}

export default HomeTable