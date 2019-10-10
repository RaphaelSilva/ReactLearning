import React, { useEffect, useState } from 'react'
import { Paper, TableCell, TableHead, TableRow, Table, TableBody, Grid, makeStyles, createStyles, Theme, Divider } from '@material-ui/core'
import { fetchGet } from '../../utils/FUtil'
import { ProductAndType } from '../../models/ViewModels'
import { ISecurityComponet } from '../../component/SecurityComponet'
import { fade } from '@material-ui/core/styles';
import Search from '../../component/Search';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
    }),
);

const urlList = '/api/product/list'

export default function BodyProductService(props: Readonly<ISecurityComponet>) {
    const classes = useStyles()
    console.log(classes)

    const [productsTyped, setProductsTyped] = useState<Array<ProductAndType>>([])
    useEffect(() => {
        fetchGet<Array<ProductAndType>>(urlList)
            .then((productsAndTyped) => {
                setProductsTyped(productsAndTyped)
            })
    }, [])

    const fetchValueOnText = (text: string): void => {
        if (text.length >= 3) fetchGet<Array<ProductAndType>>(urlList + '/' + text)
            .then((productsAndTyped) => {
                setProductsTyped(productsAndTyped)
            })
        else fetchGet<Array<ProductAndType>>(urlList)
            .then((productsAndTyped) => {
                setProductsTyped(productsAndTyped)
            })
    }

    return (<Paper>
        <Grid container>
            <Grid item container>
                <Grid item xs={12}>
                    <Search placeholder="Consultar seus Produtos ou Serviços" fetchText={fetchValueOnText} />
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
            <Grid item>
                <Divider />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>typeName</TableCell>
                            <TableCell align="right">typeDescription</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsTyped.map(productAndTyped => {
                            return (
                                <TableRow key={productAndTyped.id.toString()}>
                                    <TableCell>{productAndTyped.id}</TableCell>
                                    <TableCell>{productAndTyped.tagLink}</TableCell>
                                    <TableCell>{productAndTyped.name}</TableCell>
                                    <TableCell>{productAndTyped.description}</TableCell>
                                    <TableCell>{productAndTyped.typeName}</TableCell>
                                    <TableCell align="right">{productAndTyped.typeDescription}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    </Paper>)

}
