import React, { ChangeEvent, MutableRefObject, useRef } from 'react'
import { FigureType } from '../types'

type ImportJSONButtonProps = {
  deleteFiguresData: () => void
  setFiguresData: (array: Array<FigureType>) => void
}

export const ImportJSONButton = ({ deleteFiguresData, setFiguresData }: ImportJSONButtonProps) => {
  const importInput: MutableRefObject<null> = useRef(null)

  const importJSON = (e: ChangeEvent<HTMLInputElement>) => {
    deleteFiguresData()

    if (e.target.files?.length) {
      const file = e.target.files[0]    

      let reader = new FileReader()
      reader.readAsText(file)
  
      reader.onload = () => {
        setFiguresData(JSON.parse(reader.result as string))
      }
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
