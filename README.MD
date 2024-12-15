# Consolidator

Stylish DevTools embedded into your website.

## Under Development

This package is under development. You can use the npm package `http-server` to run the demo. Just run the following from the project's root directory:

```bash
$ http-server
```

## Concepts

- `console`: Creating a Consolidator replaces the `window.console` with a Proxy that observes the native console
- `consold`: The old `console` is pushed to `consold`, a stack of previous consoles. Under normal conditions, the native `console` object will be at `consold[0]`.