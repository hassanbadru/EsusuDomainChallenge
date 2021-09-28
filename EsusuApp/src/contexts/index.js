import React from 'react';
import { GameProvider } from './gamecontext'

const ApplicationProvider = props => {
    return (
        <GameProvider>
            {props.children}
        </GameProvider>
    )
}

export default ApplicationProvider
