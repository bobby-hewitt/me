
export const setMovesData = (payload) => {
  console.log('calling moves')
  return dispatch => {
    dispatch({
      type: 'SET_MOVES_DATA',
      payload: payload
    })
  }
}

export const setLastFMData = (payload) => {
  console.log('calling last')
  return dispatch => {
    dispatch({
      type: 'SET_LASTFM_DATA',
      payload: payload
    })
  }
}

export const setSpotifyData = (payload) => {
  console.log('calling ')
  return dispatch => {
    dispatch({
      type: 'SET_SPOTIFY_DATA',
      payload: payload
    })
  }
}

