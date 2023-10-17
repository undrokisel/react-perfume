import React from 'react'
import ss from './Loader.module.scss'

export const Loader = () => {
    return (
        <div data-testid="loader"
        className={ss.loader}></div>
    )
}
