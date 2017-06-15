import React, { Component } from "react"
import { render } from "react-dom"
import AceEditor from "react-ace"
import lettera from "lettera"
import examples from "./examples"
import "brace/mode/php"
import "brace/theme/chaos"
import "babel-polyfill"

const encode = data => Object.keys(data).map((key) =>
    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
).join("&")

const decode = (value) => {
    const document = new DOMParser().parseFromString(value, "text/html")
    return document.documentElement.textContent
}

class App extends Component {
    constructor(...params) {
        super(...params)

        this.state = {
            "tab": 0,
            "code": "<?php\n\n",
            "compiled": "",
            "executed": "",
            "isProcessing": false,
            "isShowingExample": false,
            "showTabWarning": false,
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

        this.setState({
            "tab": 1,
            "compiled": data.compileResult.stdout,
            "executed": data.executeResult ? data.executeResult.stdout : "",
            "isProcessing": false,
        })
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
            <div>
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1>Pre.</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feature">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
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
                                                editor.setOptions({
                                                    "fontFamily": "Fira Mono",
                                                })

                                                editor.container.style.lineHeight = 1.65
                                                editor.renderer.updateFontSize()

                                                this.editor = editor
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
                                </div>
                                <div className="buttons">
                                    <button className={this.state.isShowingExample ? "example busy" : "example"} disabled={this.state.isShowingExample || this.state.isProcessing} onClick={e => this.type()}>
                                        {this.state.isShowingExample ? "Showing..." : "Show me an example"}
                                    </button>
                                    <button className={this.state.isProcessing ? "process busy" : "process"} disabled={this.state.isShowingExample || this.state.isProcessing} onClick={e => this.process()}>
                                        {this.state.isProcessing ? "Processing..." : "Process my code"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>What is Pre?</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">Pre is a PHP preprocessor, designed to make adding new syntax effortless. It's also a collection of pre-built macros, which we use because they make our code clearer and simpler.</div>
                            <div className="col-sm-6">If you've ever wanted to use your own syntax, but stopped short of building your own compiler: Pre is for you. It requires no extensions or configuration. It's 100% opt-in and produces valid PHP.</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>How do I use Pre?</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">Pre libraries are installed with <a href="https://getcomposer.org">Composer</a>. PHP files can be preprocessed by changing their extension to <code>.pre</code> (for PSR-4 auto-loaded files), or by calling <code>Pre\Plugin\process("file.pre")</code>.</div>
                            <div className="col-sm-6">New syntax is defined, in macro files, which Pre plugins automatically register. You can add your own macro files, by calling <code>Pre\Plugin\addMacroPath("macros.yay")</code>.</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                <ol>
                                    <li><a href="#short-closures">Short Closures</a></li>
                                    <li>More to come...</li>
                                </ol>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 id="short-closures">Short Closures</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">PHP functions are verbose. This makes functional programming less attractive, and adds variable scope complexity. Pre short closures look like Javascript arrow functions but they differ slightly due to how PHP handles <code>$this</code>.</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">The automatically bind external variables (by reference). To install the short closures syntax, use:</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="code-wrapper">
                                    <code>{`composer require pre/short-closures`}</code>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">Then, use them in your code:</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="code-wrapper">
                                    <code dangerouslySetInnerHTML={{__html: `
$fruit = ["apple", "orange", "pear"];

$exclude = ["orange"];
$amplify = ["pear"];

$amplified = array_map(<strong>($fruit) => {
    return in_array($fruit, $amplify)
        ? strtoupper($fruit)
        : $fruit;
}</strong>, $fruit);

$filtered = array_filter($amplifed, <strong>($fruit) => {
    return !in_array($fruit, $exclude);
}</strong>);
                                    `.trim()}} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">This compiles to code resembling:</div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="code-wrapper">
                                        <code dangerouslySetInnerHTML={{__html: `
$fruit = ["apple", "orange", "pear"];

$exclude = ["orange"];
$amplify = ["pear"];

$amplified = array_map(<strong>[
    $amplify = $amplify ?? null,
    "fn" => function ($fruit) use (&$amplify) {
        return in_array($fruit, $amplify)
            ? strtoupper($fruit)
            : $fruit;
    }
]["fn"]</strong>, $fruit);

$filtered = array_filter($amplifed, <strong>[
    $exclude = $exclude ?? null,
    "fn" => function ($fruit) use (&$exclude) {
        return !in_array($fruit, $exclude);
    }
]["fn"]</strong>);
                                        `.trim()}} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">If no variables are bound, a normal function is returned. So you don't pay the cost of automatically binding variables if you don't use them. </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App />, document.querySelector(".app"))
