import React from 'react'
import Info from '../../components/Info'

export const NotFound = () => {
    return (
        <div>
            <Info
                img={'404.png'}
                title={'This page not found'}
                buttonLink={'/'}
                buttonText={'Back to homepage'}
            />
        </div>
    )
}

