
export const setMovesData = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_MOVES_DATA',
      payload: payload
    })
  }
}
export const setHomepage = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_HOMEPAGE',
      payload: payload
    })
  }
}

export const setCurrentlyPlaying = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_CURRENTLY_PLAYING',
      payload: payload
    })
  }
}

export const setLastFMData = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_LASTFM_DATA',
      payload: payload
    })
  }
}

export const setSpotifyData = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_SPOTIFY_DATA',
      payload: payload
    })
  }
}

