#!/bin/bash
bash -c "tsc-bundle tsconfig.json --entryPoint main" && echo "compilation done"
printf '%s\n%s' "//# sourceMappingURL=./bundle.js.map" "$(cat ./bin/bundle.js)" >./bin/bundle.js