

function HomeTable({data,config}){

    //----------------------create dynamic headers while looping over config element------------------
    const rendered_headers = config.map(header=>{
        return(<th width="500" key={header.label}>{header.label}</th>)
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