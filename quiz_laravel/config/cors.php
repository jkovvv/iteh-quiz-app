<?php

return [
    'paths' => ['*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],  // ili samo domen frontend aplikacije, npr. ['http://localhost:3000']
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,

];