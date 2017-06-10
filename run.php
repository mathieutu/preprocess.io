<?php

require_once __DIR__ . "/vendor/autoload.php";

use Amp\Process;
use function Amp\wait;

// $_GET["code"]

$pre = base64_encode(trim('

<?php

$callback = ($x) => {
    return "hello " . $x;
};

print $callback("world");

'));

$expand = base64_encode(trim('

require __DIR__ . "/vendor/autoload.php";
print Pre\Plugin\expand(base64_decode("' . $pre . '"));

'));

$eval = 'eval(base64_decode("' . $expand . '"));';

$command = 'docker run preprocess timeout 1 php -r "' . addslashes($eval) . '"';

$process = new Process($command);
$result = wait($process->exec(Process::BUFFER_ALL));

if ($result->exit === 124) {
    print "Compile timed out" . PHP_EOL;
    exit;
}

// $_GET["execute"]

if (true) {
    $code = join("\n", array_slice(explode("\n", $result->stdout), 1));
    $code = base64_encode($code);

    $eval = 'eval(base64_decode("' . $code . '"));';

    $command = 'docker run preprocess timeout 1 php -r "' . addslashes($eval) . '"';

    $process = new Process($command);
    $result = wait($process->exec(Process::BUFFER_ALL));

    if ($result->exit === 124) {
        print "Execute timed out" . PHP_EOL;
        exit;
    }
}

print $result->stdout . PHP_EOL;
