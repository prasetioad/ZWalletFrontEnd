const initialState = {
  data: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER' :
      return {
        ...state,
        data: action.payload
      }
    case 'PUSH_USER' :
      return {
        ...state,
        data: action.payload
      }
  }
}

export default userReducer
