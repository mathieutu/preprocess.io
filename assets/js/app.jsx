import React, { Component } from "react"
import { render } from "react-dom"

import "babel-polyfill"

import {
    Column,
    Container,
    Row,
} from "./components"

import {
    ShortClosures as ShortClosuresMacro,
} from "./macros"

import {
    Editor as EditorSection,
    Intro as IntroSection,
    Links as LinksSection,
} from "./sections"

const App = () => (
    <div>
        <div className="header">
            <Container>
                <Row>
                    <Column>
                        <h1>Pre.</h1>
                    </Column>
                </Row>
            </Container>
        </div>
        <div className="feature">
            <Container>
                <EditorSection />
            </Container>
        </div>
        <div className="content">
            <Container>
                <IntroSection />
                <hr />
                <LinksSection />
                <hr />
                <Row>
                    <Column sm="12" md="6">
                        <ShortClosuresMacro />
                    </Column>
                </Row>
            </Container>
        </div>
    </div>
)

render(<App />, document.querySelector(".app"))
