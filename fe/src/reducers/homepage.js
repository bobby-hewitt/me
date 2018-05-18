
const initialState = {
  spotify: null,
  lastfm: null,
  places: null,
  lines: null,
  activity: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVES_DATA':
      return {
        ...state,
        places: action.payload && action.payload[0] && action.payload[0].places ? action.payload[0].places : null, 
        lines: action.payload && action.payload[0] && action.payload[0].lines ? action.payload[0].lines : null,
        activity: action.payload && action.payload[1] ? action.payload[1] : null
      }
    case 'SET_LASTFM_DATA':
      return {
        ...state,
        lastfm: action.payload
      }
    case 'SET_SPOTIFY_DATA':
      return {
        ...state,
        spotify: action.payload  
      }
    default:
      return state
  }
}

