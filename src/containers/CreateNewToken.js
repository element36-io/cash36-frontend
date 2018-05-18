import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core/Dialog';
import { CircularProgress, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
    progress: {
        marginBottom: 25
    },
});

class CreateNewToken extends React.Component {
    state = {
        symbol: '',
        name: '',
    };

    handleChange = (event) => {
        this.setState({
            [ event.target.id ]: event.target.value,
        });
    };

    createToken() {
        this.props.createToken(this.state.symbol, this.state.name);
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create new Token</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will deploy a new Instance of a Token36 and will be placed under control of this exchange
                    </DialogContentText>
                    <Grid container direction="column" wrap="nowrap" spacing={16}>
                        <Grid item>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="symbol"
                                label="Token Symbol"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.symbol}
                                centered
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Token name"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.name}
                                centered
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                {!this.props.loading &&
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.createToken.bind(this)} color="primary">
                        Create
                    </Button>
                </DialogActions>
                }
                {this.props.loading &&
                <DialogActions>
                    <CircularProgress className={classes.progress} style={{ color: 'purple[500]' }} thickness={7} />
                </DialogActions>
                }
            </Dialog>
        );
    }
}

CreateNewToken.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewToken);