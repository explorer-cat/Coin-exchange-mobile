import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import './CryptoInfoTable.css'

import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CrpytoInfoTable(): React.ReactElement {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="코인 정보" />
                <Tab label="상장 거래소" />
                <Tab label="관련 뉴스" />
            </Tabs>
        </Box>
    );
}


export default CrpytoInfoTable;

