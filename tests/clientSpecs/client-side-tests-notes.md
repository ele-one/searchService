# Client Side Tests

## Karma + Mocha

### Setup Karma

### Step 1

##### Way 1:
- Install Karma-CLI globally `npm install -g karma-cli` AND Install Karma locallay `npm install --save-dev karma`

##### Way 2
- Dont install karma-cli globally on;y install karma locally and make your own command in package.json as `"karma-start":"./node_modules/karma/bin/karma start"`


### Step 2
1- `karma init`
2- Choose 'mocha' as your framework (up arrow key)
  - as we are using Mocha (ecpect wont work, b/c it doesnot have assertion baked into it; unlike jasmine). So we need to install chain `npm install chai --save-dev`
<!--  - Also:
    - `npm install karma-mocha --save-dev`
    - `npm install mocha --save-dev` -->

3- Add require.js (What? RequireJS is a JavaScript file and module loader. Why? Using a modular script loader like RequireJS will improve the speed and quality of your code.)

### Step 3
- Install headless browser phantom `npm install phantomjs`
- To see how well the tests are covering the codebase, `npm install karma-coverage --save-dev`

- Optional (not installed at this point)
  - npm install karma-phantomjs-launcher --save-dev (if phantomjs is installed)
  - npm install karma-chrome-launcher --save-dev



### Run Karma
  - `karma start karma.conf.js`








