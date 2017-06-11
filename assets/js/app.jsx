import React, { Component } from "react"
import { render } from "react-dom"

import AceEditor from "react-ace"

import "brace/mode/php"
import "brace/theme/chaos"

const encode = data => Object.keys(data).map((key) =>
    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
).join("&")

class App extends Component {
    constructor(...params) {
        super(...params)

        this.state = {
            "tab": 0,
            "code": "<?php\n\n",
            "compiled": "",
            "executed": "",
        }
    }

    async process(e) {
        const headers = new Headers()
        headers.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")

        const body = encode({
            "code": this.state.code,
        })

        const response = await fetch("/process", {
            "method": "POST",
            headers,
            body,
        })

        const { data } = await response.json()

        this.setState({
            "tab": 1,
            "compiled": data.compileResult.stdout,
            "executed": data.executeResult ? data.executeResult.stdout : "",
        })
    }

    componentDidMount() {
        window.addEventListener("keydown", e => {
            if ((e.key == "s" || e.key == "S" ) && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                this.process()
                return false
            }

            return true
        })
    }

    render() {
        const props = {
            "$blockScrolling": Infinity,
        }

        const style = {
            "width": "100%",
            "height": 450,
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="editor">
                            <div className="controls">
                                <span className="control-close"></span>
                                <span className="control-minimise"></span>
                                <span className="control-maximise"></span>
                            </div>
                            <div className="tabs">
                                <button className={this.state.tab === 0 ? "selected" : ""} onClick={e => this.setState({ "tab": 0 })}>
                                    code.pre
                                </button>
                                <button className={this.state.tab === 1 ? "selected" : ""} onClick={e => this.setState({ "tab": 1 })}>
                                    code.php
                                </button>
                                <button className={this.state.tab === 2 ? "selected" : ""} onClick={e => this.setState({ "tab": 2 })}>
                                    output
                                </button>
                            </div>
                            {this.state.tab === 0 && (
                                <AceEditor
                                    focus={true}
                                    mode="php"
                                    theme="chaos"
                                    value={this.state.code}
                                    onChange={code => this.setState({ code })}
                                    editorProps={props}
                                    showPrintMargin={false}
                                    fontSize={16}
                                    style={style}
                                    lineHeight={2}
                                    onLoad={editor => {
                                        editor.container.style.lineHeight = 2
                                        editor.renderer.updateFontSize()
                                    }}
                                />
                            )}
                            {this.state.tab === 1 && (
                                <AceEditor
                                    focus={true}
                                    mode="php"
                                    theme="chaos"
                                    value={this.state.compiled}
                                    editorProps={props}
                                    showPrintMargin={false}
                                    fontSize={16}
                                    style={style}
                                    lineHeight={2}
                                    onLoad={editor => {
                                        editor.container.style.lineHeight = 2
                                        editor.renderer.updateFontSize()
                                    }}
                                />
                            )}
                            {this.state.tab === 2 && (
                                <AceEditor
                                    focus={true}
                                    mode="text"
                                    theme="chaos"
                                    value={this.state.executed}
                                    editorProps={props}
                                    showPrintMargin={false}
                                    fontSize={16}
                                    style={style}
                                    lineHeight={2}
                                    onLoad={editor => {
                                        editor.container.style.lineHeight = 2
                                        editor.renderer.updateFontSize()
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App />, document.querySelector(".app"))
