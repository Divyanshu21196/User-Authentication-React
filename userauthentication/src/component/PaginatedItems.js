import ReactPaginate from 'react-paginate';
import {useState,useEffect} from 'react';
import { useEmployeContext } from '../hooks/CustomHooks';


export default function PaginatedItems({ itemsPerPage,data }) {
    
    const { setPaginatedListing } = useEmployeContext();

    const [itemOffset, setItemOffset] = useState(0);
  
    const endOffset = itemOffset + itemsPerPage;

    useEffect(()=>{
        
    const currentItems = data.slice(itemOffset, endOffset);
    console.log(currentItems)
    setPaginatedListing(currentItems)

    },[])
    
    const pageCount = Math.ceil(data.length / itemsPerPage);

  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {

      const newOffset = (event.selected * itemsPerPage) % data.length;
      
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }