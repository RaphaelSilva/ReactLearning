import React, { ReactNode, useState } from 'react'
import { makeStyles, createStyles, Theme, Grid, Button, CircularProgress } from '@material-ui/core'
import DropZone from './DropZone'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            overflow: 'auto',
            padding: theme.spacing(2),
        },
        row: {
            display: 'flex',
            alignItems: 'center',
        },
        progressWrapper: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkIcon: {
            opacity: 0.5,
            marginLeft: '32px',
        },
        progress: {
            margin: theme.spacing(2),
        },
    }),
);

interface OnChange {
    onChange: (img: string) => void;
    children?: ReactNode;
}

export default function UploadFile(props: Readonly<OnChange>) {
    const classes = useStyles();

    const [uploadProgress, setUploadProgress] = useState({} as unknown as any)
    const [uploading, setUploading] = useState(false);
    const [successfullUploaded, setSuccessfullUploaded] = useState(false);

    // props.onChange('test')    
    const [files, setFiles] = useState([] as Array<File>);
    const onFilesAdded = (files: Array<File>) => {
        setFiles(files)
    }

    const renderProgress = (file: File) => {
        const uploadProgressItem = uploadProgress[file.name];
        if (uploading || successfullUploaded) {
            return (
                <div className={classes.progressWrapper}>
                    <CircularProgress className={classes.progress} variant="static" value={uploadProgressItem ? uploadProgressItem.percentage : 0} />
                </div>
            );
        }
    }

    const sendRequest = (file: File) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    uploadProgress[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    }
                    setUploadProgress(uploadProgress)
                }
            })

            req.upload.addEventListener("load", event => {
                uploadProgress[file.name] = { state: "done", percentage: 100 }
                setUploadProgress(uploadProgress)
            })

            req.upload.addEventListener("error", event => {
                uploadProgress[file.name] = { state: "error", percentage: 0 }
                setUploadProgress(uploadProgress)
                reject(req.response)
            })

            req.onreadystatechange = function () {
                if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                    resolve(req.responseText)
                }
            };

            const formData = new FormData()
            formData.append("file", file, file.name)

            req.open("POST", "/api/server/upload");
            req.send(formData)
        })
    }

    const uploadFiles = () => {
        setUploading(true)

        const promises: Array<Promise<any>> = []
        files.forEach(file => promises.push(sendRequest(file)))

        Promise.all(promises).then((response) => {
            setSuccessfullUploaded(true)
            setUploading(false)
        }).catch((error) => {
            setSuccessfullUploaded(true)
            setUploading(false)
        })

    }

    const renderActions = () => {
        if (successfullUploaded) {
            return (
                <Button variant="contained" color="primary"
                    onClick={() => {
                        setFiles([] as Array<File>)
                        setSuccessfullUploaded(false)
                    }}>Limpar</Button>
            );
        } else {
            return (
                <Button variant="contained" color="primary"
                    disabled={files.length < 0 || uploading}
                    onClick={uploadFiles}>Enviar</Button>
            );
        }
    }

    return (
        <div className={classes.paper}>
            <Grid container spacing={1}>
                {files.length > 0 ? (
                    <>
                        <Grid item xs={12} style={{ marginTop: 15 }}>
                            {files.map(file => {
                                return (
                                    <div key={file.name} className={classes.row}>                       
                                        <span className="Filename">{file.name}</span>
                                        {renderProgress(file)}
                                    </div>
                                )
                            })}
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 5 }}>
                            <div className="Actions">{renderActions()}</div>
                        </Grid>
                    </>
                    ) : (
                        <Grid item xs={12} style={{ marginTop: 15 }}>
                            <DropZone disabled={uploading || successfullUploaded} onFilesAdded={onFilesAdded}>
                                <p>Escolha suas imagens</p>
                            </DropZone>
                        </Grid>
                    )}
            </Grid>
        </div>
    )
}
