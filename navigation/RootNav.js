import React from 'react';

export const navigationRef = React.createRef()

const navigate = (name, params) => {
    console.log(navigationRef)
    navigationRef.current?.navigate(name, params)
    
}

export default {
    navigate,
}