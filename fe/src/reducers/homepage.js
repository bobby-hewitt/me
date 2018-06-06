
const initialState = {
  spotify: null,
  places: null,
  lines: null,
  activity: null,
  tracks: null,
  lastTrack: null,
  currentlyPlaying: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_HOMEPAGE':
      return {
        ...state,
        places: action.payload && action.payload.movesPlaces ? action.payload.movesPlaces : null,
        lines: action.payload && action.payload.movesLines ? action.payload.movesLines : null,
        activity: action.payload && action.payload.movesActivity ? action.payload.movesActivity : null,
        lastTrack: action.payload && action.payload.lastTrack ? action.payload.lastTrack : null,
        tracks: action.payload && action.payload.tracks ? action.payload.tracks : null,
      }
    
    case 'SET_CURRENTLY_PLAYING':
    console.log('settig', action.payload)
      return {
        ...state,
        currentlyPlaying: action.payload
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

