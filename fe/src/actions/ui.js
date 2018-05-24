
export const addElemToScrollCheck = (payload) => {
  return dispatch => {
    dispatch({
      type: 'ADD_ELEM_TO_SCROLL_CHECK',
      payload: payload
    })
  }
}

export const beginLoad = (payload) => {
	console.log('calling')
  return dispatch => {
    dispatch({
      type: 'BEGIN_LOAD',
    })
  }
}

export const endLoad = (payload) => {
  return dispatch => {
    dispatch({
      type: 'END_LOAD',
    })
  }
}
