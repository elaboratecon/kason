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