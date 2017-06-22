import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/immutable-classes
`

const example1Before = `
immutable class Money {
    private $currency;
    private $amount;
}

$old = new Money();
$new = $old->withCurrency("USD");

var_dump($old !== $new);
`

const example1After = `
class Money   {
    use \\Pre\\ImmutableClasses\\ImmutableClassesTrait;

    private $currency;
    private $amount;
}

$old = new Money();
$new = $old->withCurrency("USD");

var_dump($old !== $new);
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="immutable-classes">Immutable Classes</h2>
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
