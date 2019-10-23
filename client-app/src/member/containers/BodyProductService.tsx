import React, { useEffect, useState, MouseEvent, useRef } from 'react'
import { Paper, TableCell, TableHead, TableRow, Table, TableBody, Grid, makeStyles, createStyles, Theme, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Hidden } from '@material-ui/core'
import { fetchGet, fetchDelete as doDelete } from '../../utils/FUtil'
import { ProductAndType, ResponseView } from '../../models/ViewModels'
import { ISecurityComponet } from '../../component/SecurityComponet'
import Search from '../../component/Search';
import MyModal, { RefMyModal } from '../../component/MyModal'
import { Product } from '../../models/Entities'
import ProductUpdate from './ProductUpdate'
import { ParseProduct } from '../../models/ParserJson'
import Update from '@material-ui/icons/Update';
import Delete from '@material-ui/icons/Delete';
import CustomizedSnackbars, { RefCustomizedSnackbars } from '../../component/CustomizedSnackbars'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        table: {
            padding: theme.spacing(2),
            width: '100%',
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    }),
);

const urlList = '/api/product/list'

export default function BodyProductService(props: Readonly<ISecurityComponet>) {
    const classes = useStyles()
    const refMyModal = useRef(RefMyModal)
    const refCustomizedSnackbars = useRef(RefCustomizedSnackbars)
    const [dialog, setDiolog] = useState({ title: '', message: '', open: false, productId: 0 })

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

    const [product, setProduct] = useState<Product>(ParseProduct())
    const onAddButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        setProduct(ParseProduct())
        refMyModal.current.open()
    }

    const onProductCancel = () => {
        refMyModal.current.close()
    }

    const onProductUpdate = (result: ResponseView & { product?: Product } | null) => {
        if (result) {
            if (result.product) setProduct(result.product)
            if (result.variant === 'success') {
                fetchGet<Array<ProductAndType>>(urlList)
                    .then((productsAndTyped) => {
                        setProductsTyped(productsAndTyped)
                        refMyModal.current.close()
                    })
            }
            refCustomizedSnackbars.current.show(result)
        } else {
            refCustomizedSnackbars.current.show500()
        }
    }

    const updateProductTyped = (productAndTyped: ProductAndType) => {
        const p = ParseProduct(productAndTyped)
        p.id = productAndTyped.id
        setProduct(p)
        refMyModal.current.open()
    }

    const deleteProduct = (p: ProductAndType) => {
        setDiolog({
            title: `Exclusão do produto ${p.name}`,
            message: `Deseja realmente excluir este item ${p.name}!`,
            open: true,
            productId: p.id
        })
    }

    const chooseDialog = (choose: boolean) => {
        if (choose) {
            refCustomizedSnackbars.current.show({ message: 'Você excluiu', variant: 'info' })
            doDelete<ResponseView>(`/api/product/remove/${dialog.productId}`)
                .then(result => {
                    setProductsTyped(productsTyped.filter(value => {
                        return value.id !== dialog.productId
                    }))
                    refCustomizedSnackbars.current.show(result)
                }).catch(() => {
                    refCustomizedSnackbars.current.show500()
                }).finally(() => {
                    setDiolog({ title: '', message: '', open: false, productId: 0 })
                })
        } else { setDiolog({ title: '', message: '', open: false, productId: 0 }) }

    }

    return (<>
        <Grid container>
            <Grid item xs={12}>
                <Search placeholder="Consultar seus Produtos ou Serviços" autoFocus
                    fetchText={fetchValueOnText} onButtonClick={onAddButtonClick} />
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table size="small" aria-label="a dense table" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <Hidden only="xs"><TableCell>Id</TableCell></Hidden>
                                    <TableCell>Nome</TableCell>
                                    <Hidden only="xs"><TableCell>Link</TableCell></Hidden>
                                    <Hidden only="xs"><TableCell>Descrição</TableCell></Hidden>
                                    <Hidden only="xs"><TableCell>Tipo</TableCell></Hidden>
                                    <TableCell align="right">Ação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsTyped.map(productAndTyped => {
                                    return (
                                        <TableRow key={productAndTyped.id.toString()}>
                                            <Hidden only="xs"><TableCell>{productAndTyped.id}</TableCell></Hidden>
                                            <TableCell component="th" scope="row">{productAndTyped.name}</TableCell>
                                            <Hidden only="xs"><TableCell>{productAndTyped.tagLink}</TableCell></Hidden>
                                            <Hidden only="xs"><TableCell>{productAndTyped.description}</TableCell></Hidden>
                                            <Hidden only="xs"><TableCell>{productAndTyped.typeName}</TableCell></Hidden>
                                            <TableCell align="right">
                                                <Grid container direction="row" justify="space-between" alignItems="center">
                                                    <Grid item>
                                                        <IconButton color="primary" aria-label="directions"
                                                            onClick={() => { updateProductTyped(productAndTyped) }}>
                                                            <Update />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton color="primary" aria-label="directions"
                                                            onClick={() => { deleteProduct(productAndTyped) }}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </Grid>
        </Grid>
        <CustomizedSnackbars ref={refCustomizedSnackbars} />
        <MyModal ref={refMyModal}
            defaultTab={0}
            labelTabs={[`${product.id ? "Atualizar" : "Cadastrar"} Produto`, "Pré-Visualização"]}
            renderItens={[
                <ProductUpdate product={product} onUpdate={onProductUpdate} onCancel={onProductCancel} />,
                <p style={{ height: '80vh' }}>Todas as Imagens</p>
            ]} />

        <Dialog
            open={dialog.open}
            onClose={() => {
                chooseDialog(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialog.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    chooseDialog(true)
                }} color="secondary">
                    Sim
                </Button>
                <Button onClick={() => {
                    chooseDialog(false)
                }} color="primary" autoFocus>
                    Não
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )

}
