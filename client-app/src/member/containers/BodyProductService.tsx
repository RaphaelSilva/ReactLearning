import React, { useEffect, useState } from 'react'
import { Paper, TableCell, TableHead, TableRow, Table, TableBody } from '@material-ui/core'
import { fetchGet } from '../../utils/FUtil'
import { ProductAndType } from '../../models/ViewModels'
import { ISecurityComponet } from '../../component/SecurityComponet'

const fetchProductAndTyped = async (setting: (productsAndTyped: Array<ProductAndType>) => void) => {
    const productsAndTyped = await fetchGet<Array<ProductAndType>>('/api/product/list')
    setting(productsAndTyped)
}

export default function BodyProductService(props: Readonly<ISecurityComponet>) {

    useEffect(() => {
        fetchProductAndTyped((productsAndTyped) => {
            setProductsTyped(productsAndTyped)
        })
    }, [])

    const [productsTyped, setProductsTyped] = useState<Array<ProductAndType>>([])

    return productsTyped && productsTyped.length > 0 ? (<Paper>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Link</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>description</TableCell>
                    <TableCell>profileId</TableCell>
                    <TableCell>typeName</TableCell>
                    <TableCell align="right">typeDescription</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {productsTyped.map(productAndTyped => (
                    <TableRow key={productAndTyped.id}>
                        <TableCell>{productAndTyped.tagLink}</TableCell>
                        <TableCell>{productAndTyped.name}</TableCell>
                        <TableCell>{productAndTyped.description}</TableCell>
                        <TableCell>{productAndTyped.profileId}</TableCell>
                        <TableCell>{productAndTyped.typeName}</TableCell>
                        <TableCell align="right">{productAndTyped.typeDescription}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
    ) : (<h1>loading....</h1>)

}
