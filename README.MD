# Consolidator

Stylish DevTools embedded into your website.

## Under Development

This package is under development. To run the demo, open a shell in the root directory of the project and run the following:

```
$ npm install
$ npm run dev
```

## Concepts

- `console`: Creating a Consolidator replaces the `window.console` with a Proxy that observes the native console
- `consold`: The old `console` is pushed to `consold`, a stack of previous consoles. Under normal conditions, the native `console` object will be at `consold[0]`.