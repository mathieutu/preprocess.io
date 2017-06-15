import React from "react"

import {
    Column,
    Row,
} from "../components"

export default () => (
    <div>
        <Row>
            <Column>
                <h2>What is Pre?</h2>
            </Column>
        </Row>
        <Row>
            <Column sm="6">
                Pre is a PHP preprocessor, designed to make adding new syntax
                effortless. It's also a collection of pre-built macros, which
                we use because they make our code clearer and simpler.
            </Column>
            <Column sm="6">
                If you've ever wanted to use your own syntax, but stopped short
                of building your own compiler: Pre is for you. It requires no
                extensions or configuration. It's 100% opt-in and produces
                valid PHP.
            </Column>
        </Row>
        <Row>
            <Column>
                <h2>How do I use Pre?</h2>
            </Column>
        </Row>
        <Row>
            <Column sm="6">
                Pre libraries are installed with Composer. PHP files can be
                preprocessed by changing their extension to <code>.pre</code>
                (for PSR-4 auto-loaded files), or by calling
                <code>Pre\Plugin\process("file.pre")</code>.
            </Column>
            <Column sm="6">
                New syntax is defined, in macro files, which Pre plugins
                automatically register. You can add your own macro files, by
                calling <code>Pre\Plugin\addMacroPath("macros.yay")</code>.
            </Column>
        </Row>
    </div>
)
