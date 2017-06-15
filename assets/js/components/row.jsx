import React from "react"

export default (props) => {
    return (
        <div className="row" {...props}>
            {props.children}
        </div>
    )
}
