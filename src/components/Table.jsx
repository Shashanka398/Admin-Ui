import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../redux/Slices/ApiDataSlice"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContent from "./TableContent";
import "./Table.css";
import Pagination from "./Pagination";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const TableDetails = ({searchInput}) => {
  const [rows, setRows] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const dispatch = useDispatch();
  const {selectedItem}=useSelector((state=>(state.delete)))
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filter = () => {
    if (searchInput.trim() === "") {
      setRows(originalData); 
    } else {
      const filteredData = originalData.filter((row) =>
        row.email.toLowerCase().includes(searchInput.toLowerCase())  || row.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setRows(filteredData);
    }
  };

  useEffect(() => {
    filter();
  }, [originalData, searchInput]);

  useEffect(() => {
    dispatch(fetchItems())
      .then((action) => {
        if (fetchItems.fulfilled.match(action)) {
          const { payload } = action;
          setOriginalData(payload);
          setRows(payload.slice(0, recordsPerPage)); 
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    const arr = rows.filter((user) => user.id !== id.id);
    setRows(arr);
    setOriginalData(arr);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const changeCPage=(id)=>{
    setCurrentPage(id);
       
  }

  const deleteSeleceted = () => {
    if (selectedItem) {
      const updatedRows = rows.filter((row) => !selectedItem.includes(row.id));
      setRows(updatedRows);
      setOriginalData(updatedRows);
    }
  };

  
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;
  const npage=Math.ceil(rows.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  return (
    <div className="tablecontainer">
      {rows.length === 0 ? (
        <div>Loading or empty data message</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} />
                  </FormGroup>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(firstIndex,lastIndex).map((row) => (
                <TableContent data={row} key={row.id} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination  
   firstIndex={firstIndex}
   lastIndex={lastIndex}
   onNextPage={nextPage}
   onPrevPage={prevPage}
   changeCPage={changeCPage}
   numbers={numbers}/>
   <button onClick={()=>deleteSeleceted()}>delete selected</button>
    </div>
  );
};

export default TableDetails;
