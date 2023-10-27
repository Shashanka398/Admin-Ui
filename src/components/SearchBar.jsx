import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const SearchBar = ({ setSearchInput }) => {
  return (
    <div>
       <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Search" id="fullWidth"  onChange={(e) => setSearchInput(e.target.value)} />
    </Box>

    </div>
  )
}

export default SearchBar