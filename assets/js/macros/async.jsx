import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/async
`

const example1Before = `
<strong>async</strong> function highlightFileContents($path) {
    $source = <strong>await</strong> Amp\\File\\get($path);
    return highlight_string($source, true);
}

$highlighted = Amp\\wait(highlightFileContents("helpers.php"));
var_dump($highlighted);
`

const example1After = `
<strong>function highlightFileContents($path): \\Amp\\Promise
{
    return \\Amp\\resolve(function() use (&$path) {</strong>
        $source = yield Amp\\File\\get($path);
        return highlight_string($source, true);
    <strong>});
}</strong>

$highlighted = Amp\wait(highlightFileContents("helpers.php"));
var_dump($highlighted);
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="async">Async</h2>
            </Column>
        </Row>
        <Row>
            <Column>
                PHP was born as a synchronous programming language, but it is
                beginning to change. Projects like <a href="http://amphp.org/">
                AMPHP</a> make writing asynchronous, parallel-execution code
                easy; but asynchronous code is still a second-class citizen in
                the language.
            </Column>
        </Row>
        <Row>
            <Column>
                AMPHP can transform ordinary generators into promise-like
                coroutines. Interruptible functions that can be non-blocking
                while still being as easy to read as blocking code.
            </Column>
        </Row>
        <Row>
            <Column>
                To install the async/await syntax, use:
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
