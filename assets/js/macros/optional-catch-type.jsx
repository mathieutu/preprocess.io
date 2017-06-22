import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/optional-catch-type
`

const example1Before = `
try {
    throw new Exception("Oh no!");
} catch (<strong>$e</strong>) {
    print $e->getMessage();
}
`

const example1After = `
try {
    throw new Exception("Oh no!");
} catch (<strong>\Exception $e</strong>) {
    print $e->getMessage();
}
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="optional-catch-type">Optional Catch Type</h2>
            </Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={install} />
            </Column>
        </Row>
        <Row>
            <Column>Then, use it in your code:</Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={example1Before} />
            </Column>
        </Row>
        <Row>
            <Column>This compiles to code resembling:</Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={example1After} />
            </Column>
        </Row>
    </div>
)
