import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/deferred
`

const example1Before = `
print "first" . PHP_EOL;

defer {
    print "last" . PHP_EOL;
}

print "in between" . PHP_EOL;
`

const example1After = `
print "first" . PHP_EOL;

$deferred·cfcd2084 = new \\Pre\\Deferred\\Deferred(
    call_user_func(function($context·cfcd2084) {
        return function() use ($context·cfcd2084) {
            extract($context·cfcd2084);
            print "last" . PHP_EOL;
        };
    } , get_defined_vars())
);

print "in between" . PHP_EOL;
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="deferred">Deferred</h2>
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
