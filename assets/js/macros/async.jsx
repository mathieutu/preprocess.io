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
function highlightFileContents($path): <strong>\\Amp\\Promise</strong> {
    return <strong>call_user_func(
        PRE_ASYNC_WRAPPER,
        function() use (&$path) {</strong>
            $source = yield Amp\\File\\get($path);
            return highlight_string($source, true);
        <strong>}
    );</strong>
}

$highlighted = Amp\\wait(highlightFileContents("helpers.php"));
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
