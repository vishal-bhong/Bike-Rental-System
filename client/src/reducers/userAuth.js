const userAuthReducer = (state = { authData: null, investData: null }, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            localStorage.setItem('userProfile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        case 'BIKE_INVEST':
            return { ...state, investData: action?.data };

        default:
            return state;
    }
};

export default userAuthReducer;