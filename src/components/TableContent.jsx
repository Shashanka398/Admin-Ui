import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { selectCheckItem, unselectCheckItem} from "../redux/Slices/DeleteSlice";
import "./TableConent.css";


const TableContent = (props) => {
  const dispatch = useDispatch();
  const data = props.data;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [userData, setUserData] = useState({
    id:data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const  handleChecked=(userId)=>{
      dispatch(selectCheckItem(userId));
  }

  const  handleUnchecked=(userId)=>{
    dispatch(unselectCheckItem(userId));
  }
  return (
      <TableRow
      key={data.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <FormGroup>
          <FormControlLabel control={ <Checkbox
      onChange={(event) => {
        if (event.target.checked) {
          handleChecked(userData.id);
        } else {
          handleUnchecked(userData.id);
        }
      }}
    />} />
        </FormGroup>
      </TableCell>
      <TableCell component="th" scope="row">
        {userData.name}
      </TableCell>
      <TableCell>{userData.email}</TableCell>
      <TableCell>{userData.role}</TableCell>
      <TableCell>
        <EditIcon fontSize="small" onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box className="tableContent">
          <TableCell>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            </TableCell>
            <TableCell>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
           </TableCell>
           <TableCell>
            <label htmlFor="email">Role:</label>
            <input
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
            />
           </TableCell>
            <Button onClick={handleClose} >Save</Button>
          </Box>
        </Modal>
        <DeleteIcon fontSize="small"  onClick={() => props.onDelete(data)} />
      </TableCell>
    </TableRow>


    
  );
};

export default TableContent;
