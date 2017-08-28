import "babel-polyfill"

import React, { Component } from "react"
import { render } from "react-dom"

import {
    Editor as EditorSection,
} from "./sections"

const container = document.querySelector(".app")
const rect = container.getBoundingClientRect()

const App = () => (
    <EditorSection dontFocus hideButtons width={rect.width} height={rect.height - 84} showHashCode />
)

render(<App />, container)
