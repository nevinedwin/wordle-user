import React from 'react'

const ValidationComponent = (props) => {
    return (
        <>{props.isShow &&
            <small className="p-error block m-10">{props.message}</small>
        }
        </>
    )
}

export default ValidationComponent