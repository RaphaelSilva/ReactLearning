import React, { Component, RefObject, ChangeEvent, DragEvent } from 'react'
import './css/DropZone.css'

type myPropsTypes = Readonly<{
    disabled: boolean,
    onFilesAdded?: (list: Array<File>) => void
}>

type myState = { 
    hightlight: boolean 
}

export default class DropZone extends Component<myPropsTypes, myState> {
    public fileInputRef: RefObject<HTMLInputElement>

    constructor(props: myPropsTypes) {
        super(props)
        this.state = { hightlight: false }
        this.fileInputRef = React.createRef()
        this.openFileDialog = this.openFileDialog.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    openFileDialog() {
        if (this.props.disabled) return
        if (this.fileInputRef.current) this.fileInputRef.current.click()
    }

    onFilesAdded(event: ChangeEvent<HTMLInputElement>) {
        if (this.props.disabled) return
        const files = event.target.files
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files)
            this.props.onFilesAdded(array)
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault()
        if (this.props.disabled) return
        this.setState({ hightlight: true })
    }

    onDragLeave() {
        this.setState({ hightlight: false })
    }

    onDrop(event: DragEvent) {
        event.preventDefault()
        if (this.props.disabled) return
        const files = event.dataTransfer.files
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files)
            this.props.onFilesAdded(array)
        }
        this.setState({ hightlight: false })
    }

    fileListToArray(list: FileList | null): Array<File> {
        const array: Array<File> = []
        if (list) for (var i = 0; i < list.length; i++) {
            const file = list.item(i)
            if (file) array.push(file)
        }
        return array
    }

    render() {
        return (
            <div className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
                <img
                    alt="upload"
                    className="Icon"
                    src="/svgs/baseline-cloud-upload.svg"
                />
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                />
                <span>Arraste aqui ou Click!</span>
                {this.props.children}
            </div>
        )
    }
}
