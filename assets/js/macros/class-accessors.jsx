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
    private string $currency {
        get;

        immutable set {
            if (!in_array($value, ["USD"])) {
                throw new InvalidArgumentException();
            }

            $this->currency = $value;
        }

        immutable unset;
    }

    private float $amount {
        get; immutable set; immutable unset;
    }
}
`

const example1After = `
class Money {
    use \\Pre\\ClassAccessors\\ClassAccessorsTrait;

    private $currency;

    public function getCurrency():string {
        return $this->currency;
    }

    public function withCurrency(string $value) {
        $clone = clone $this;

        $bound = \\Closure::bind(function() use ($value) {
            if (!in_array($value, ["USD"])) {
                throw new InvalidArgumentException();
            }

            $this->currency = $value;
        }, $clone);

        $bound();

        return $clone;
    }

    public function withoutCurrency() {
        $clone = clone($this);
        unset($clone->currency);
        return $clone;
    }

    private $amount;

    public function getAmount():float {
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
    }
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
