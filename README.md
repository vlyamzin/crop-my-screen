# CropMyScreen ✂️

CropMyScreen is a zero dependency plugin written completely with vanilla javascript. It helps you share only that part of the screen that you want to show and cut all other sensitive information off. And do it right from your browser.

**[Try it out in the demo →](https://vlyamzin.github.io/crop-my-screen/)**

## How it works 🚀

You give the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) object to the plugin. CropMyScreen puts that stream into the HTMLVideoElement. The part of the video is extracted into the canvas according to the constraints that you provided by options or after the manual selection. In the end, the canvas outputs your new cropped stream.

![Workflow diagram](https://github.com/vlyamzin/crop-my-screen/blob/main/diagram.png?raw=true)

## How to use 🔧
Install from npm

```bash
npm install crop-my-screen
```

import in your code

```javascript
import CropMyScreen from 'crop-my-screen';
```

Also, you can simply add a minified file to your HTML page. 
```html
<script src="https://unpkg.com/crop-my-screen@1.0.3/dist/crop-my-screen.min.js"></script>
```

Create an instance of the plugin somewhere in your code.

```javascript
const cropper = new CropMyScreen(options)
```
Get MediaStream object

```javascript
const stream = await navigator.mediaDevices.getDisplayMedia();
```

Put the obtained stream into the plugin

```javascript
cropper.start(stream)
  .then(croppedStream => {
    // work with cropped stream
  })
  .catch(error => {...})
```

This method returns Promise. The Promise resolves with a new cropped stream after you define the limits. You can take this stream and send it through [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API), download it locally via [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) or modify it in any other way.

## Options ⚙️
#### **previewerClass**
Add CSS class to the main container of the preview window for the additional customization.
* Type: `String`
* Default value: `null`
* Example:
```javascript
const options = {
   previewerClass: 'my-class',  // <div id="crms-container" class="my-class">...</div>
   ...
}
```

#### **cropX**
The starting point of the cropping rectangle. X-asis coordinate.
* Type: `Number`
* Default value: 0
* Example:
```javascript
const options = {
   cropX: 100,
   ...
}
```

#### **cropY**
The starting point of the cropping rectangle. Y-asis coordinate.
* Type: `Number`
* Default value: 0
* Example:
```javascript
const options = {
   cropY: 100,
   ...
}
```

#### **cropW**
The width of the cropping rectangle.
* Type: `Number`
* Default value: 640
* Example:
```javascript
const options = {
   cropW: 500,
   ...
}
```

#### **cropH**
The height of the cropping rectangle.
* Type: `Number`
* Default value: 480
* Example:
```javascript
const options = {
   cropH: 400,
   ...
}
```


#### **backdropColor**
The backdrop color of the area selection tool in HEX format with alpha chanel.
* Type: `String`
* Default value: '#00000073'
* Example:
```javascript
const options = {
   backdropColor: '#ffffff90',
   ...
}
```

## Methods 💡
#### **start(stream)**
Show preview window.
* Parameters: 
    * stream - *MediaStream object you want to crop*
* Returns Promise which resolves with new cropped stream
* Example:
```javascript
cropper.start(stream)
  .then(croppedStream => {
    // work with cropped stream
  })
  .catch(error => {...});
```

#### **stop()**
Stop cropping the stream. Hide UI elements if visible.
* Returns void
* Example:
```javascript
cropper.stop();
```

#### **destroy()**
Clean up all plugin related stuff
* Returns void
* Example:
```javascript
cropper.destroy();
```

## Known issues and limitations 😿
Unfortunately, nothing is ideal in this world, and CropMyScreen is no exception. Due to some browser limitations or/and Screenshare API youth, some issues cannot be solved right now.

#### Issue #1
CropMyScreen works the best while capturing the whole screen/monitor. There is an option to capture only the browser window in Chromium-based and Firefox browsers. Even though this solution will work, the preferable way is still 'Entire screen'.

#### Issue #2
CropMyScreen can understand where the browser window is placed on the screen and excludes offsets automatically. The plugin subtracts the browser top bar with tabs and other panels via the formula
```javascript
const browserHeaderSize = window.outerHeight - window.innerHeight;
```
But the calculation fails if the browser has the bottom bar opened. Try to close Dev Tool or other panels located at the bottom of the browser.

#### Issue #3
CropMyScreen works only with the main desktop. Take it into account in case you have a multiscreen setup. 

#### Issue #4
The performance of the cropped stream is not ideal. Usually, it is around 4 FPS. There is no possibility right now to overpass this limitation. But there is hope that [WebCodec API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) will solve this problem soon. Instead of using HTMLVideoElement as MediaStream keeper, we will be able to pass the stream through the [MediaStreamTrackProcessor](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackProcessor) and paste it directly into the Canvas element. That must improve performance drastically. But for now, all we can do is wait for better browser support.


