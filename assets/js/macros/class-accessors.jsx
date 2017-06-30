import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/class-accessors
`

const example1Before = `
class Money {
    <strong>private string $currency {
        get;

        immutable set {</strong>
            if (!in_array($value, ["USD"])) {
                throw new InvalidArgumentException();
            }

            $this->currency = $value;
        <strong>}

        immutable unset;
    }</strong>

    <strong>private float $amount {
        get; immutable set; immutable unset;
    }</strong>
}
`

const example1After = `
class Money {
    <strong>use \\Pre\\ClassAccessors\\ClassAccessorsTrait;</strong>

    private $currency;

    <strong>public function getCurrency(): string {
        return $this->currency;
    }

    public function withCurrency(string $value) {
        $clone = clone $this;

        $bound = \\Closure::bind(function() use ($value) {</strong>
            if (!in_array($value, ["USD"])) {
                throw new InvalidArgumentException();
            }

            $this->currency = $value;
        <strong>}, $clone);

        $bound();

        return $clone;
    }

    public function withoutCurrency() {
        $clone = clone($this);
        unset($clone->currency);
        return $clone;
    }</strong>

    private $amount;

    <strong>public function getAmount(): float {
        return $this->amount;
    }

    public function withAmount(float $value) {
        $clone = clone($this);
        $clone->amount = $value;
        return $clone;
    }

    public function withoutAmount() {
        $clone = clone($this);
        unset($clone->amount);
        return $clone;
    }</strong>
}
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="class-accessors">Class Accessors</h2>
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
