This is the prototype app for **Data Analytics as a Service**! 

To run the app:
1. Clone the repo
2. Use `npm install` to install dependencies
3. Run `npm start` to run the app
4. Connect to [http://localhost:3000](http://localhost:3000) to view the app
___

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run storybook`

Launches the Storybook UI.<br>
Open [http://localhost:6006/](http://localhost:6006/) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm install --global surge`

Installs the Surge plugin


### `surge` or `npx surge`

To initiate login to Surge for future updates of the repository


### `node_modules/.bin/surge ./storybook-static https://uxdc-daaas-storybook.surge.sh`

Deploys the repo to 'https://uxdc-daaas-storybook.surge.sh' for external use
Change this link to something more specific when deploying a branch for testing (eg. https://uxdc-daaas-storybook-dialog.surge.sh)


### `node_modules/.bin/surge teardown https://uxdc-daaas-storybook-dialog.surge.sh`

Used for deleting an existing deployed repo
Make sure to specify the corrent link to be torn down that relates to your branch
