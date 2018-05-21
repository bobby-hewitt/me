
const initialState = {
  scrollCheck: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEM_TO_SCROLL_CHECK':
    // console.log(state)
    
    let elems = state.scrollCheck
    elems.push(action.payload)
    console.log(elems)
    return {
      ...state,
      scrollCheck: elems,

    }
    default:
      return state
  }
}

