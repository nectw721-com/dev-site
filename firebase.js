/**
 * The Firebase config is typically managed in firebase.json. However, this JSON
 * file is a pain to manage because several hosting environments share the same
 * config options.
 *
 * This file generates a firebase.json file when running the following commands:
 *    `yarn deploy`
 *    `yarn deploy:ci`
 *    `yarn serve`
 */

const fs = require('fs');

const hostingConfig = {
  ignore: [
    'content',
    'firebase.js',
    'firebase.json',
    'gatsby-*.js',
    'package.json',
    'src',
    'tsconfig.json',
    'yarn.lock',
    '**/.*',
    '**/node_modules/**',
  ],
  public: 'public',
  redirects: [
    {
      destination: '/',
      source: '/foo',
      type: 302,
    },
  ],
};

fs.writeFileSync(
  'firebase.json',
  JSON.stringify({
    hosting: [
      {
        ...hostingConfig,
        target: 'local',
      },
      {
        ...hostingConfig,
        target: 'production',
      },
      {
        ...hostingConfig,
        target: 'staging',
      },
    ],
  }, null, 2),
  'utf8'
);