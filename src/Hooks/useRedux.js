import { useSelector, useDispatch } from 'react-redux'

export const select = (selector) => {
  const selected = useSelector(selector)
  return selected
}

export const dis = () => {
  const dispatch = useDispatch()
  return dispatch
}
