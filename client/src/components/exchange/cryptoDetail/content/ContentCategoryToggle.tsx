import '../../../../stylesheets/initialization.css'
import '../../../../stylesheets/palette.css'
import React, {useEffect, useState, useCallback} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Skeleton} from '@mui/material';
import ExchangeContent from './ExchangeContent';
import InvestmentInfo from './InvestmentInfo';
import CryptoInfo from './CryptoInfo';
import DailyCandleTable from './DailyCandleTable';
import './ContentCategoryToggle.css'

interface contentType {
    investInfo:any,
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function ContentCategoryToggle({investInfo} : contentType): React.ReactElement {
    const [loading,setLoading] = useState(true)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
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
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="가격 정보" {...a11yProps(0)} />
                        <Tab label="자산 정보" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <InvestmentInfo props = {investInfo}/>
                    <div className = "blockgap"></div>
                    <DailyCandleTable props = {investInfo}/>
                    <div className = "blockgap"></div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <CryptoInfo props = {investInfo}/>
                    <div className = "blockgap"></div>
                </TabPanel>
                {/*<TabPanel value={value} index={1}>*/}
                {/*    <ExchangeContent />*/}
                {/*</TabPanel>*/}
                {/*<TabPanel value={value} index={2}>*/}
                {/*    Item Three*/}
                {/*</TabPanel>*/}
            </div>
        );
    }

}


export default ContentCategoryToggle;

