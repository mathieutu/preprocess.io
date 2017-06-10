import React, { Component } from "react"
import { render } from "react-dom"
import throttle from "lodash/throttle"

const encode = data => Object.keys(data).map((key) =>
    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
).join("&")

class App extends Component {
    async process(e) {
        const headers = new Headers()
        headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")

        const body = encode({
            "pre": this.refs.pre.value,
        })

        const response = await fetch("/process", {
            "method": "POST",
            headers,
            body,
        })

        const result = await response.json()

        this.refs.php.value = result.data.compileResult.stdout

        if (result.data.executeResult) {
            this.refs.output.value = result.data.executeResult.stdout
        }
    }

    render() {
        return (
            <div>
                <textarea ref="pre"></textarea>
                <textarea ref="php" readOnly></textarea>
                <textarea ref="output" readOnly></textarea>
                <button onClick={throttle(e => this.process())}>
                    go!
                </button>
            </div>
        )
    }
}

render(<App />, document.querySelector(".app"))
