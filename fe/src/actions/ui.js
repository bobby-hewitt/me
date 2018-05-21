
export const addElemToScrollCheck = (payload) => {
  return dispatch => {
    dispatch({
      type: 'ADD_ELEM_TO_SCROLL_CHECK',
      payload: payload
    })
  }
}
