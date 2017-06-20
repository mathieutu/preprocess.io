import React, { Component } from "react"
import { render } from "react-dom"

import "babel-polyfill"

import {
    Editor as EditorSection,
} from "./sections"

const container = document.querySelector(".app")
const rect = container.getBoundingClientRect()

const App = () => (
    <EditorSection hideButtons width={rect.width} height={rect.height - 100} />
)

render(<App />, container)
