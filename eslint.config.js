import react from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';

export default [
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false, // Disable requiring a Babel config file
                ecmaVersion: 2020, // Specify ECMAScript version
                sourceType: 'module', // Allow usage of imports
                ecmaFeatures: {
                    jsx: true, // Enable JSX support
                },
            },
        },
        plugins: {
            react,
        },
        rules: {
            'react/prop-types': 'off', // Example rule to disable prop-types check
        },
    },
];
