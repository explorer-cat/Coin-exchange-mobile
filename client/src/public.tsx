import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts() {
    console.log("sssss")
    return (
        <Alert severity="success" color="info">
        This is a success alert — check it out!
    </Alert>
);
}

export {ColorAlerts};