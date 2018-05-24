
const initialState = {
  scrollCheck: [],
  loading: true
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
    case 'BEGIN_LOAD':
    return {
      ...state,
      loading: true,
    }
    case 'END_LOAD':
    return {
      ...state,
      loading: false,
    }
    default:
      return state
  }
}

