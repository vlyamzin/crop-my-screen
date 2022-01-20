# CropMyScreen

CropMyScreen is a zero dependency plugin written completely with vanilla javascript. It helps you share only that part of the screen that you want to show and cut all other sensitive information off. And do it right from your browser.

## How it works

You give the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) object to the plugin. CropMyScreen puts that stream into the HTMLVideoElement and renders this video on canvas. The part of the canvas is extracted according to the constraints that you provided by options or after the manual selection. This part is your cropped stream that the plugin outputs to you.

<!-- Add diagram here -->

## How to use
Add `crop-my-screen.min.js` file to your HTML page. Create an instance of the plugin somewhere in your code.

```javascript
const cropper = new CropMyScren(options)
```
Get MediaStream object

```javascript
const stream = await navigator.mediaDevices.getDisplayMedia();
```

Put the obtained stream into the plugin

```javascript
cropper.start(stream)
```

This method returns Promise. The Promise resolves with a new cropped stream after you define the limits.
