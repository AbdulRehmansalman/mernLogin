export const initialState = false;

export const reducer = (state, action) => {
  if (action.type === 'USER') {
    //*JAB bhi ma dispatch ko call kro ga : useReducer ma action trigger ho jye ga Aghar user aus
    //? ki value hai:aUr jo payload ki value ho ge:tag karna wala:Whohi navbar pe jane wala hai:
    return action.payload;
  }
  return state;
};
