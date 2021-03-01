//@ts-nocheck
import React, { MutableRefObject, useRef } from 'react'

type PropsType = {
  deleteFiguresData: () => void
  setFiguresData: () => void
}

export const ImportJSONButton: React.FC<PropsType> = ({ deleteFiguresData, setFiguresData }) => {
  const importInput: MutableRefObject<null> = useRef(null)

  const importJSON = (e: ChangeEvent<HTMLInputElement>) => {
    deleteFiguresData()

    const file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)

    reader.onload = () => {
      setFiguresData(JSON.parse(reader.result))
    }
  }

  return (
    <>
      <label className="import__label" htmlFor="import">
        import JSON
        <input type="file" id='import' className="import" ref={importInput} onChange={importJSON}></input>
      </label>
    </>
  )
}
