import React from 'react';
import { Grid } from '@material-ui/core';
import TokenDetails from "./TokenDetails";

class WalletTokenDetails extends React.Component {

    render() {
        const { tokens } = this.props;

        return (
            <Grid container justify="center" spacing={40}>
                {tokens.length > 0 && tokens.map((token, key) =>
                    <Grid key={key} item xs={12} sm={6} md={5} lg={4}>
                        <TokenDetails token={token}/>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default WalletTokenDetails;