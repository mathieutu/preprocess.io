import React from "react"

export default (props) => {
    let className = ""

    const sizes = ["xs", "sm", "md", "lg"]
    const next = Object.assign({}, props)

    let sized = false

    for (let i = 0; i < sizes.length; i++) {
        let size = sizes[i]

        if (props[size]) {
            sized = true
            className += " col-" + size + "-" + props[size]
            delete next[size]
        }

        if (props[size + "Offset"]) {
            sized = true
            className += " col-" + size + "-offset-" + props[size]
            delete next[size + "Offset"]
        }
    }

    if (!sized) {
        className += " col-sm-12"
    }

    return (
        <div className={className.trim()} {...next}>
            {next.children}
        </div>
    )
}
