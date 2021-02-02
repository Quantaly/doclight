# Doclight

A PDF scanning app that does not suck.

There are plenty of other apps out there that can create PDFs using images captured from a device camera. Many of them have advanced features like automatic cropping and contrast adjustment. However, these features can sometimes be annoying &mdash; especially when they get things wrong. (No, auto-crop, the focus of this image is not the lower-left corner!) Doclight dispenses with all of these fancy value additions to deliver the core, simple experience of "take pictures -> have PDF" without any unnecessary frills.

The goal is not to compete with other, feature-rich scanning apps; it is to deliver an alternative experience for people who don't need or want all those features.

## Building

In order to build Doclight, you must have `cargo`, `npm`, and `wasm-pack` installed. You will also need the `wasm32-unknown-unknown` Cargo target installed.

First, build the Wasm library:

```
cd wasm-lib
wasm-pack build
```

The Vue build process will eventually complain if the resulting package does not have an ESLint configuration, so add a basic `.eslintrc.js`:

```
echo 'module.exports = {};' > pkg/.eslintrc.js
```

Now install the Vue app dependencies:

```
cd ../app
npm install
```

At this point, use `npm run serve` to serve a development build and `npm run build` to create a production build.
