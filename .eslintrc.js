module.exports = {
    root: true,
    rules: {
        'no-console': 'off',
        "parser": "babel-eslint"
    },
    parserOptions: {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    env: {
        "browser": true,
        "node": true,
        "es6": true
    }

};