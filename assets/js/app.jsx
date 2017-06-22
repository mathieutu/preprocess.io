import "babel-polyfill"

import React, { Component } from "react"
import { render } from "react-dom"
import FontAwesome from "react-fontawesome"

import {
    Column,
    Container,
    Row,
} from "./components"

import {
    Async as AsyncMacro,
    ClassAccessors as ClassAccessorsMacro,
    Collections as CollectionsMacro,
    Deferred as DeferredMacro,
    ImmutableClasses as ImmutableClassesMacro,
    OptionalCatchType as OptionalCatchTypeMacro,
    ParameterLoaders as ParameterLoadersMacro,
    PropertyLoaders as PropertyLoadersMacro,
    ShortClosures as ShortClosuresMacro,
    TrailingCommas as TrailingCommasMacro,
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
                    <Column xs="8">
                        <h1>Pre.</h1>
                    </Column>
                    <Column xs="4" className="text-right">
                        <a href="https://github.com/preprocess">
                            <FontAwesome
                                name="github"
                                size="2x"
                            />
                        </a>
                        <a href="https://twitter.com/assertchris">
                            <FontAwesome
                                name="twitter"
                                size="2x"
                            />
                        </a>
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
                        <AsyncMacro />
                    </Column>
                    <Column sm="12" md="6">
                        <ClassAccessorsMacro />
                    </Column>
                </Row>
                <Row>
                    <Column sm="12" md="6">
                        <CollectionsMacro />
                    </Column>
                    <Column sm="12" md="6">
                        <DeferredMacro />
                    </Column>
                </Row>
                <Row>
                    <Column sm="12" md="6">
                        <ImmutableClassesMacro />
                    </Column>
                    <Column sm="12" md="6">
                        <OptionalCatchTypeMacro />
                    </Column>
                </Row>
                <Row>
                    <Column sm="12" md="6">
                        <ParameterLoadersMacro />
                    </Column>
                    <Column sm="12" md="6">
                        <PropertyLoadersMacro />
                    </Column>
                </Row>
                <Row>
                    <Column sm="12" md="6">
                        <ShortClosuresMacro />
                    </Column>
                    <Column sm="12" md="6">
                        <TrailingCommasMacro />
                    </Column>
                </Row>
            </Container>
        </div>
    </div>
)

render(<App />, document.querySelector(".app"))
