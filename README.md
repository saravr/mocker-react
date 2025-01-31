# What is this?

This is a companion web app to manage API mocks used by the Everand Android app.

Using this app, you can
- Create mocks
- View/edit the response payload JSON
- Clone the mocks
- Rename the mocks

# Setup

Until the app is hosted internally, the following steps are required to run the app.

One-time setup:
1. Install npm `brew install npm` on your Macbook
2. Install `npm install -g serve`
3. Clone this repository, cd `mocker-app`
4. Install the app `npm install --legacy-peer-deps`

Once completed successfully, the app can be launched with the command `serve -s build`.
The output of this command will show the URL to use to launch the app (e.g., http://localhost:3000).
If port 3000 is already in use, choose your own port by passing -p <port#> option to serve command.

Note: Mock names are all shared, feel free to add your username to the names of the mock.