import { MutableRefObject, useReducer, useEffect } from "react"

const list: { [key: string]: MutableRefObject<HTMLDivElement | null> } = {}

interface ReducerProps {
  prevFrame: number
  frame: number
  percent: number
}

interface ReducerData {
  visible: boolean,
  percent: number,
  prevFrame: number,
  frame: number
}

const isElementInScreen = (rect: DOMRect) =>
  rect && rect.top <= window.innerHeight && rect.top + rect.height >= 0

const isElementOnStartScreen = (rect: DOMRect) =>
  rect && rect.top <= 0 && rect.top + rect.height >= 0

const initialState: ReducerData = {prevFrame: -1, frame: -1, percent: 0, visible: false}

export const useScrollLayer = (id: string, {onScreen}: ({ onScreen: boolean } | undefined) = {onScreen: false}) => {
  const [state, dispatch] = useReducer(
    (
      state: ReducerProps,
      {
        percent,
        frame,
        visible
      }: { percent: number; frame: number; visible: boolean }
    ): ReducerData => {
      return {
        percent,
        frame,
        prevFrame: state.frame,
        visible: visible
      }
    },
    initialState
  )

  useEffect(() => {
    const onScrollAction = () => {
      if (!list[id]) {
        return
      }
      const element = list[id]?.current;
      if (!element) {
        return
      }
      const rect = element.getBoundingClientRect()

      if (onScreen && isElementInScreen(rect)) {
        const childRect = element.children[0].getBoundingClientRect()
        if (childRect) {
          const position = Math.floor(
            Math.abs(window.innerHeight - rect.top) / childRect.height
          )
          const percent =
            ((Math.abs(window.innerHeight - rect.top) -
                position * childRect.height) *
              100) /
            childRect.height

          dispatch({
            frame: position,
            percent,
            visible: rect.top < window.innerHeight
          })
          return
        }
      }
      if (!onScreen && isElementOnStartScreen(rect)) {
        const childRect = element.children[0].getBoundingClientRect()
        if (childRect) {
          const position = Math.floor(Math.abs(rect.top) / childRect.height)
          const percent =
            ((Math.abs(rect.top) - position * childRect.height) * 100) /
            childRect.height
          dispatch({
            frame: position,
            percent,
            visible: rect.top < window.innerHeight
          })
          return
        }
      }
      dispatch({
        frame: -1,
        percent: 0,
        visible: rect.top < window.innerHeight
      })
    }

    document.addEventListener('scroll', onScrollAction, true)
    return () => {
      document.removeEventListener('scroll', onScrollAction, true)
    }
  }, [onScreen, id])

  return {
    currentFrame: state.frame,
    percent: state.percent,
    prevFrame: state.prevFrame,
    visible: state.visible,
  }
}

export const useLayerScrollSubscriber = () => {
  const subscribe = (id: string, ref: MutableRefObject<HTMLDivElement | null>) => {
    if (list[id]) {
      throw new Error(`element with this id ("${id}") exists`)
    }
    list[id] = ref

    return () => {
      delete list[id];
    }

  }
  return {
    subscribe
  }
}
