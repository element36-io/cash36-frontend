import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        width: 1200,
        margin: 'auto',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    title: {
        flex: '0 0 auto',
    },
});

let id = 0;

function createData(symbol, taddr, caddr, cap, bank) {
    id += 1;
    return { id, symbol, taddr, caddr, cap, bank };
}

const data = [
    createData('CHF36', '0x1234', '0x5678', '1000000 CHF36', '100000 CHF'),
    createData('EUR36', '0x1234', '0x5678', '1000000 EUR36', '100000 EUR'),
    createData('USD36', '0x1234', '0x5678', '1000000 USD36', '100000 USD'),
];

function Exchange(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Token address</TableCell>
                        <TableCell>Cntroller address</TableCell>
                        <TableCell>Total Supply</TableCell>
                        <TableCell>Supply in Bank</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell>{n.symbol}</TableCell>
                                <TableCell>{n.taddr}</TableCell>
                                <TableCell>{n.caddr}</TableCell>
                                <TableCell>{n.cap}</TableCell>
                                <TableCell>{n.bank}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Button variant="fab" color="secondary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Button>
        </div>
    );
}

Exchange.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exchange);