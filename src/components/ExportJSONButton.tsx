//@ts-nocheck
import React, { useRef } from 'react'

export const ExportJSONButton = ({ figuresData }) => {
  const exportLink = useRef(null)

  const download = (text: BlobPart) => {
    let file = new Blob([text], { type: 'application/json' })
    exportLink.current.href = URL.createObjectURL(file)
    exportLink.current.download = 'dogecoin.json'
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
