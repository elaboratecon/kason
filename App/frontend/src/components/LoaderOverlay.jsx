// Project by: Jason Conover (https://github.com/elaboratecon) and Kevin Mathew (https://github.com/kmatchu)
// Hosted at: https://github.com/elaboratecon/kason

import React from 'react'
export const LoaderOverlay = (props) => {
    const {
        enable = false
    } = props

    return (
        <div id="loader" style={{ display: enable ? 'block' : 'none' }}>
            <div className="loader" />
            <div className="overlay" />
        </div>
    )
}