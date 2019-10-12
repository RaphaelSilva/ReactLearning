import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
interface PropsTypes {
    placeholder: string
    fetchText: (text: string) => void
    onButtonClick: ((event: MouseEvent<HTMLButtonElement>) => void)
}

export default function Search(props: PropsTypes) {
    const classes = useStyles()

    const [searchText, setSearchText] = useState('')
    const handleOnChane = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        props.fetchText(e.target.value);
    }

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={props.placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleOnChane}
                value={searchText}
            />
            <IconButton className={classes.iconButton} aria-label="search" >
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions"
                onClick={props.onButtonClick}>
                <Add />
            </IconButton>
        </Paper>
    );
}

