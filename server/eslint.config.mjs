import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "script",
        "ecmaFeatures": {
            "jsx": false,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "node": true,
        "commonjs": true,
        "mongo": true
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "handle-callback-err": [
            "error"
        ]
    }
}
];