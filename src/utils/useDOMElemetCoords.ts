import { useLayoutEffect, useRef, useState } from 'react';
import { initialCoords } from './../initialStateValues/initialStateValues';


export const useDOMElementCoords = <T extends HTMLElement>(initialValue: typeof initialCoords) =>  {
  const elementRef = useRef<T>(null)
  const [elementCoords, setElementCoords] = useState(initialValue)

  useLayoutEffect(() => {
    setElementCoords((elementRef.current as T).getBoundingClientRect())
  }, [elementRef])

  return [elementCoords, elementRef] as [typeof elementCoords, typeof elementRef]
}
