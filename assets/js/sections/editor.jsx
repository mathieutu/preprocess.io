import React, { Component } from "react"
import AceEditor from "react-ace"
import lettera from "lettera"

import examples from "../examples"

import {
    Column,
    Row,
} from "../components"

import "brace/mode/php"
import "brace/theme/chaos"

const encode = data => Object.keys(data).map((key) =>
    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
).join("&")

const decode = (value) => {
    const document = new DOMParser().parseFromString(value, "text/html")
    return document.documentElement.textContent
}

export default class extends Component {
    constructor(...params) {
        super(...params)

        let code = "<?php\n\n";

        if (this.props.showHashCode) {
            code = window.location.hash ? atob(window.location.hash.substr(1)) : "<?php\n\n";
        }

        this.state = {
            "tab": 0,
            code,
            "compiled": "",
            "executed": "",
            "encoded": "",
            "isProcessing": false,
            "isShowingExample": false,
            "showTabWarning": false,
            "showEncodedTab": false,
        }
    }

    type() {
        const example = examples[Math.floor(Math.random() * examples.length)]

        this.setState({
            "tab": 0,
            "isShowingExample": true,
        })

        let element = document.createElement("div")

        let effect = lettera.init({
            "element": element,
            "string": example,
            "maxDelay": 30,
        })

        const typeInterval = setInterval(() => {
            this.setState({ "code": decode(element.innerHTML) })

            if (this.editor) {
                const row = this.editor.session.getLength() - 1
                const column = this.editor.session.getLine(row).length
                this.editor.gotoLine(row + 1, column)
            }
        }, 50)

        const checkInterval = setInterval(() => {
            if (example.trim().length <= this.state.code.trim().length) {
                clearTimeout(typeInterval)
                clearTimeout(checkInterval)

                element = null
                effect = null

                this.setState({ "isShowingExample": false })
                this.process()
            }
        }, 250)

        effect.start()
    }

    async process() {
        this.setState({ "isProcessing": true })

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

        const options = {
            "tab": 1,
            "compiled": data.compileResult.stdout,
            "executed": data.executeResult ? data.executeResult.stdout : "",
            "isProcessing": false,
        }

        if (this.props.hideProcessors) {
            options["tab"] = 2;
        }

        this.setState(options)
    }

    componentDidMount() {
        window.addEventListener("keydown", e => {
            if (this.state.tab !== 0) {
                this.setState({ "showTabWarning": true })

                clearTimeout(this.warningTimeout)

                this.warningTimeout = setTimeout(() => {
                    this.setState({ "showTabWarning": false })
                }, 2500)
            }

            if ((e.key == "s" || e.key == "S" ) && (e.ctrlKey || e.metaKey)) {
                this.process()
                e.preventDefault()
                return false
            }

            if (e.key === "Alt") {
                this.setState({ "showEncodedTab": true })
            }

            return true
        })

        window.addEventListener("keyup", e => {
            if (e.key === "Alt") {
                this.setState({ "showEncodedTab": false })
            }
        });
    }

    render() {
        const props = {
            "$blockScrolling": Infinity,
        }

        const style = {
            "width": this.props.width || "100%",
            "height": this.props.height || 450,
        }

        return (
            <Row>
                <Column>
                    <div className="editor">
                        {this.state.showTabWarning && (
                            <div className="tab-warning">
                                Switch tabs to change the code
                            </div>
                        )}
                        <div className="controls">
                            <span className="control-close"></span>
                            <span className="control-minimise"></span>
                            <span className="control-maximise"></span>
                        </div>
                        <div className="tabs">
                            <button className={this.state.tab === 0 ? "selected" : ""} onClick={e => this.setState({ "tab": 0, "showTabWarning": false })}>
                                {this.props.hideProcessors && (
                                    <span>code.php</span>
                                )}
                                {!this.props.hideProcessors && (
                                    <span>code.pre</span>
                                )}
                                {this.state.isProcessing && (
                                  <span className="indicator"></span>
                                )}
                            </button>
                            {!this.props.hideProcessors && (
                                <button className={this.state.tab === 1 ? "selected" : ""} onClick={e => this.setState({ "tab": 1 })}>
                                    code.php
                                </button>
                            )}
                            <button className={this.state.tab === 2 ? "selected" : ""} onClick={e => this.setState({ "tab": 2 })}>
                                output
                            </button>
                            {this.state.showEncodedTab && (
                                <button onClick={e => this.setState({ "tab": 3 })}>
                                    encoded
                                </button>
                            )}
                        </div>
                        {this.state.tab === 0 && (
                            <AceEditor
                                focus={!this.props.dontFocus}
                                mode="php"
                                theme="chaos"
                                value={this.state.code}
                                onChange={code => this.setState({
                                  code,
                                  "encoded": btoa(code),
                                })}
                                editorProps={props}
                                showPrintMargin={false}
                                fontSize={16}
                                style={style}
                                lineHeight={2}
                                onLoad={editor => {
                                    editor.setOptions({
                                        "fontFamily": "Fira Mono",
                                    })

                                    editor.container.style.lineHeight = 1.65
                                    editor.renderer.updateFontSize()

                                    this.editor = editor
                                }}
                            />
                        )}
                        {(this.state.tab === 1 && !this.props.hideProcessors) && (
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
                                    editor.setReadOnly(true)

                                    editor.setOptions({
                                        "fontFamily": "Fira Mono",
                                    })

                                    editor.container.style.lineHeight = 1.65
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
                                    editor.setReadOnly(true)

                                    editor.setOptions({
                                        "fontFamily": "Fira Mono",
                                    })

                                    editor.container.style.lineHeight = 1.65
                                    editor.renderer.updateFontSize()
                                }}
                            />
                        )}
                        {this.state.tab === 3 && (
                            <AceEditor
                                focus={true}
                                mode="text"
                                theme="chaos"
                                value={this.state.encoded}
                                editorProps={props}
                                showPrintMargin={false}
                                fontSize={16}
                                style={style}
                                lineHeight={2}
                                onLoad={editor => {
                                    editor.setOptions({
                                        "fontFamily": "Fira Mono",
                                    })

                                    editor.container.style.lineHeight = 1.65
                                    editor.renderer.updateFontSize()
                                }}
                            />
                        )}
                    </div>
                    {!this.props.hideButtons && (
                      <div className="buttons">
                          <button className={this.state.isShowingExample ? "example busy" : "example"} disabled={this.state.isShowingExample || this.state.isProcessing} onClick={e => this.type()}>
                              {this.state.isShowingExample ? "Showing..." : "Show me an example"}
                          </button>
                          <button className={this.state.isProcessing ? "process busy" : "process"} disabled={this.state.isShowingExample || this.state.isProcessing} onClick={e => this.process()}>
                              {this.state.isProcessing ? "Processing..." : "Process my code"}
                          </button>
                      </div>
                    )}
                </Column>
            </Row>
        )
    }
}
