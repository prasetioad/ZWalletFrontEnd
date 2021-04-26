import axios from 'axios'

export const getUser = (data) => (dispatch) => {
  axios.get('')
  dispatch({ type: 'GET_USER', payload: data })
}

export const pushUser = (data) => (dispatch) => {
  dispatch({ type: 'PUSH_USER', payload: data })
}
