import React from 'react'

import './BackdropModal.css'

const backdropModal = props => (
    <div className="backdrop__modal" onClick={props.click}/>
)

export default backdropModal