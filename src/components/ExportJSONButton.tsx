import React, { useRef } from 'react'
import { FigureType } from '../types'

type PropsType = {
  figuresData: Array<FigureType>
}

export const ExportJSONButton: React.FC<PropsType> = ({ figuresData }) => {
  const exportLink = useRef<HTMLAnchorElement>(null)

  const download = (text: BlobPart) => {
    let file = new Blob([text], { type: 'application/json' })
    exportLink.current!.href = URL.createObjectURL(file)
    exportLink.current!.download = 'dogecoin.json'
  }

  const exportJSON = () => {
    download(JSON.stringify(figuresData))
  }

  return (
    <a href="" className="export" onClick={exportJSON} ref={exportLink}>
      export JSON
    </a>
  )
}
