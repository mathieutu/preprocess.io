import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/trailing-commas
`

const example1Before = `
var_dump(
    "one",
    "two",
    "three"<strong>,</strong>
);
`

const example1After = `
var_dump(
    "one",
    "two",
    "three"
);
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="trailing-commas">Trailing Commas</h2>
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
