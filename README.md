# Baloo

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## Deployment
1. Execute `yarn build`
2. Copy bundles _css_ and _js_ into _index.html_
3. Copy _index.html_, _manifest.json_ and _icons.icns_ to /data of webserver project for ESP8266
4. Upload files via _Arduino IDE > Esp8266 Sketch Data Upload_

## Accessing
In Baloo Network access via `https://192.168.4.1`.