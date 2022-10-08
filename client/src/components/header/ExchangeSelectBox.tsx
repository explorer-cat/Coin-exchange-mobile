import '../../stylesheets/initialization.css'
import '../../stylesheets/palette.css'
import '../../stylesheets/public.css'
import React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



//Header 컴포넌트 메게변수 타입을 직접 선언합니다.
interface ExchangeSelectBoxType {
    // navigationMenu : any
  exchangeFuc: any
}

function ExchangeSelectBox({exchangeFuc} : ExchangeSelectBoxType) {
  const [exchange, setExchange] = React.useState('10');

  const handleChange = (event: SelectChangeEvent) => {
    setExchange(event.target.value as string);
  };

  useEffect(() => {
    exchangeFuc(exchange)
  },[exchange])

  return (
      <Box sx={{ minWidth: 120 , maxHeight : 32}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchange}
              label=""
              onChange={handleChange}
          >
            <MenuItem value={10}>업비트</MenuItem>
            <MenuItem value={20}>빗썸</MenuItem>
            <MenuItem value={30}>코인원</MenuItem>
          </Select>
        </FormControl>
      </Box>
  );
}

export default ExchangeSelectBox;
