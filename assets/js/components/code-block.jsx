import React from "react"

export default (props) => {
    return (
        <div className="code-wrapper">
            <code dangerouslySetInnerHTML={{__html: props.code.trim()}} />
        </div>
    )
}
