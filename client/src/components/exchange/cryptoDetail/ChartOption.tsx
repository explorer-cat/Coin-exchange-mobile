import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './ChartOption.css'
interface ChartOptionType {
    changeChartOption:any,
}


function ChartOption({changeChartOption}:ChartOptionType): React.ReactElement {
    const [alignment, setAlignment] = React.useState('left');


    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        changeChartOption(newAlignment)
        setAlignment(newAlignment);
    };


    const children = [
        <ToggleButton value="1hour" key="1hour" >
            1시간
        </ToggleButton>,
        <ToggleButton value="4hour" key="4hour" >
            4시간
        </ToggleButton>,
        <ToggleButton value="24hour" key="24hour" >
            24시간
        </ToggleButton>,
        <ToggleButton value="7day" key="7day">
            7일
        </ToggleButton>,
        <ToggleButton value="30day" key="30day">
            30일
        </ToggleButton>,
        // <ToggleButton value="180day" key="180day">
        //     180일
        // </ToggleButton>,
        // <ToggleButton value="allday" key="allday">
        //     전체
        // </ToggleButton>,
    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <div className = "ChartOptionArea">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // TODO Replace with Stack
                    '& > :not(style) + :not(style)': { mt: 2 },
                }}
            >
                <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
                    {children}
                </ToggleButtonGroup>
            </Box>
        </div>
    );
}


export default ChartOption;

