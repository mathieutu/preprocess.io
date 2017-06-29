export default [
`<?php

$user = {
    "email" => "cgpitt@gmail.com",
    "password" => "R3a77y.53cuRe!",
    "created_at" => "2017-01-01 00:00:00",
}
    ->map(($value, $key) => {
        return preg_match("/_at$/", $key)
            ? new Carbon\\Carbon($value)
            : $value;
    })
    ->filter(($value, $key) => {
        return $key !== "password";
    });

var_dump($user->toArray());`,
`<?php

async function highlightFileContents($path) {
    $source = await Amp\\File\\get($path);
    return highlight_string($source, true);
}

$highlighted = Amp\\wait(highlightFileContents("helpers.php"));
var_dump($highlighted);`,
`<?php

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
}`,
`<?php

$data = [
    "front" => "react",
    "back" => "php",
    "virtualization" => "docker",
];

{ $front, $back, $virtualization } = $data;

var_dump($front);
var_dump($back);
var_dump($virtualization);`,
`<?php

macro ·recursion {
    ·ns()·name
    -> new
    ·chain(
        ·token("("),
        ·optional(·layer()),
        ·token(")")
    )·parameters
} >> {
    (new ·name ·parameters)
}

$object = stdClass->new();
var_dump($object);
`,
`<?php

macro {
    ·chain(
        ·token(T_CONSTANT_ENCAPSED_STRING)·template,
        ·token("%"),
        ·token("["),
        ·layer()·values,
        ·token("]")
    )
} >> {··trim(
    call_user_func_array("sprintf", [·template, ·values])
)}

$columns = ["email", "password"];
$placeholders = [":email", ":password"];

var_dump("INSERT INTO users (%s) VALUES (%s)" % [join(", ", $columns), join(", ", $placeholders)]);`,
`<?php

print "first" . PHP_EOL;

defer {
    print "last" . PHP_EOL;
}

print "in between" . PHP_EOL;`,
`<?php

immutable class Money {
    private $currency;
    private $amount;
}

$old = new Money();
$new = $old->withCurrency("USD");

var_dump($old !== $new);`,
`<?php

class Proxy {
    private $factory = app("factory");

    private $formatter = new ProxyFormatter("default");

    public function execute() {
        $instance = $this->factory->make();
        return $this->formatter->format($instance->execute());
    }
}`,
`<?php

class Proxy {
    private $factory;

    private $formatter;

    public function __construct(
        Factory $factory = app("factory"),
        Formatter $formatter = new ProxyFormatter("default")
    ) {
        $this->factory = $factory;
        $this->formatter = $formatter;
    }
}`,
`<?php

var_dump(
    "one",
    "two",
    "three",
);
`
]
