import React from "react"

import {
    CodeBlock,
    Column,
    Row,
} from "../components"

const install = `
composer require pre/collections
`

const example1Before = `
$user = <strong>{
    "email" => "cgpitt@gmail.com",
    "password" => "R3a77y.53cuRe!",
    "created_at" => "2017-01-01 00:00:00",
}
    ->map(($value, $key) => {</strong>
        return preg_match("/_at$/", $key)
            ? new Carbon\\Carbon($value)
            : $value;
    <strong>})
    ->filter(($value, $key) => {</strong>
        return $key !== "password";
    <strong>});</strong>

var_dump(<strong>$user->toArray()</strong>);
`

const example1After = `
$user = <strong>(new \\Pre\\Collections\\Collection([
    "email" => "cgpitt@gmail.com",
    "password" => "R3a77y.53cuRe!",
    "created_at" => "2017-01-01 00:00:00",
]))
    ->map(function($value, $key) {</strong>
        return preg_match("/_at$/", $key)
            ? new Carbon\\Carbon($value)
            : $value;
    <strong>})
    ->filter(function($value, $key) {</strong>
        return $key !== "password";
    <strong>});</strong>

var_dump(<strong>$user->toArray()</strong>);
`

export default () => (
    <div>
        <Row>
            <Column>
                <h2 id="collections">Collections</h2>
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
