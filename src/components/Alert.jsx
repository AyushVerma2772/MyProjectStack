import React from 'react'

const Alert = ({ alertMsg, alertType }) => {
    return (
        <>
            <div className={`alert alert-${alertType ? alertType : 'danger'} p-1 px-2`} role="alert">
                <strong>{alertType === "danger" || '' ? "Error !!!" : "Success !!!" }</strong> {alertMsg}
            </div>
        </>
    )
}

export default Alert