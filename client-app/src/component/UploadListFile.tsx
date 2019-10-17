import React, { useEffect, useState } from 'react'
import { OnChange } from './UploadFileModal'
import { fetchGet } from '../utils/FUtil'
import { GridList, GridListTile, ListSubheader, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const fetchList = async () => {
    return await fetchGet<Array<string>>('/api/server/upload')
}

export default function UploadListFile(props: Readonly<OnChange>) {
    const classes = useStyles()
    const [fileList, setFileList] = useState([] as Array<string>)

    useEffect(() => {
        fetchList().then((fList) => setFileList(fList))
    }, [])

    const cols = 4
    return (
        <div style={{ height: '80vh' }} className={classes.root}>
            <GridList cellHeight={240} className={classes.gridList} cols={cols}>
                <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Todas as Imagens</ListSubheader>
                </GridListTile>
                {fileList.map((value, index) => (
                    <GridListTile key={index}>
                        <img alt={value} src={value} onClick={() => props.onPick(value)}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
