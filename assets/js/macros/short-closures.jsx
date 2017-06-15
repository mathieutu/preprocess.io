import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/short-closures
`

const example1Before = `
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
`

const example1After = `
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
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="short-closures">Short Closures</h2>
            </Column>
        </Row>
        <Row>
            <Column>
                PHP functions are verbose. This makes functional programming
                less attractive, and adds variable scope complexity. Pre short
                closures look like Javascript arrow functions but they differ
                slightly due to how PHP handles <code>$this</code>.
            </Column>
        </Row>
        <Row>
            <Column>
                The automatically bind external variables (by reference). To
                install the short closures syntax, use:
            </Column>
        </Row>
        <Row>
            <Column>
                <CodeBlock code={install} />
            </Column>
        </Row>
        <Row>
            <Column>Then, use them in your code:</Column>
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
        <Row>
            <Column>
                If no variables are bound, a normal function is returned. So
                you don't pay the cost of automatically binding variables if
                you don't use them.
            </Column>
        </Row>
    </div>
)
