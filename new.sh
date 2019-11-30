mkdir imports/ui/components/$1
mkdir imports/ui/components/$1/client
touch imports/ui/components/$1/$1.js
touch imports/ui/components/$1/$1.html
touch imports/ui/components/$1/client/$1.test.js

cat <<EOT >> imports/ui/components/$1/$1.js
import angular from 'angular';

import template from './$1.html';

class $1Controller {}
export const name = '$1';

export default angular.module(name, []).component(name, {
  template,
  controller: $1Controller,
  controllerAs: name,
});

EOT
