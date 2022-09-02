import '../../../stylesheets/initialization.css'
import '../../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './ChartOption.css';
import {Skeleton} from '@mui/material';

interface ChartOptionType {
    changeChartOption:any,
    loading : boolean,
}


function DetailContent({changeChartOption,loading}:ChartOptionType): React.ReactElement {
    // const [loading, setLoading] = useState(false)
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
            1일
        </ToggleButton>,
        <ToggleButton value="4hour" key="4hour" >
            1주
        </ToggleButton>,
        <ToggleButton value="24hour" key="24hour" >
            3달
        </ToggleButton>,
        <ToggleButton value="7day" key="7day">
            1년
        </ToggleButton>,
        <ToggleButton value="30day" key="30day">
            5년
        </ToggleButton>,
        <ToggleButton value="candle" key="candle">
            캔들
        </ToggleButton>,
    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    if(!loading) {
        return (
            <div className="ChartOptionAreaLoading">
                <Skeleton sx={{
                    bgcolor: "rgba(255, 255, 255, 0.13)",
                    width: "70%",
                    height: "60px",
                    margin: "0px 0px 0px 0px",
                }}/>
            </div>
        )

    }
    else {
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

}


export default DetailContent;

