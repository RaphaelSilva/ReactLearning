import React, { useEffect, useState, MouseEvent, useRef } from 'react'
import { Paper, TableCell, TableHead, TableRow, Table, TableBody, Grid, makeStyles, createStyles, Theme, Divider, IconButton } from '@material-ui/core'
import { fetchGet } from '../../utils/FUtil'
import { ProductAndType } from '../../models/ViewModels'
import { ISecurityComponet } from '../../component/SecurityComponet'
import Search from '../../component/Search';
import MyModal, { RefMyModal } from '../../component/MyModal'
import { Product } from '../../models/DBEntities'
import ProductUpdate from './ProductUpdate'
import { ParseProduct } from '../../models/ParserJson'
import Update from '@material-ui/icons/Update';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            padding: theme.spacing(2, 2, 2, 2),
            width: '100%',
            display: 'block',
            overflow: 'hidden',
            overflowX: 'auto',
            marginBottom: '16px',
            borderSpacing: '0',
            borderCollapse: 'collapse',
        },
    }),
);

const urlList = '/api/product/list'

export default function BodyProductService(props: Readonly<ISecurityComponet>) {
    const classes = useStyles()
    const refMyModal = useRef(RefMyModal)

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
        refMyModal.current.open()
    }

    const onProductUpdate = (product: Product) => {
        setProduct(product)
    }

    const updateProductTyped = (productAndTyped: ProductAndType) => {
        setProduct(ParseProduct(productAndTyped))
        refMyModal.current.open()
    }

    return (<>
        <Paper>
            <Grid container>
                <Grid item container>
                    <Grid item xs={8}>
                        <Search placeholder="Consultar seus Produtos ou Serviços"
                            fetchText={fetchValueOnText} onButtonClick={onAddButtonClick} />
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider />
                    <Table size="small" className={classes.table}>
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
                                        <TableCell >{productAndTyped.typeDescription}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" aria-label="directions"
                                                onClick={() => { updateProductTyped(productAndTyped) }}>
                                                <Update />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Paper>
        <MyModal ref={refMyModal}
            defaultTab={0}            
            labelTabs={[`${product ? "Cadastrar" : "Atualizar"} Produto`, "Plano de pagamento"]}
            renderItens={[
                <ProductUpdate product={product} onUpdate={onProductUpdate} />,
                <p style={{height: '80vh'}}>Todas as Imagens</p>
            ]} />
    </>
    )

}
