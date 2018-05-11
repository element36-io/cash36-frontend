import React from 'react';
import { Typography } from "material-ui";
import uportLogo from '../assets/uport-logo-w.png';


export default LoginWithUport => {
    return (
        <div>
            <Typography variant="caption" style={{ fontSize: '14px', paddingLeft: 15 }}>Login with</Typography>
            <img src={uportLogo} style={{ width: 90, paddingTop: 10 }} alt={'UPORT'}/>
        </div>
    )
}

