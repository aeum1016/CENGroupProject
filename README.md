# Political Resource Hub (PRH)
The PRH aims to present the politcally curious with different materials that provide more information on politics. Utilizing the Google Civic Information API, the PRH can give users information on elections, polling locations, representatives, and candidates based on their home address.

## Setup
1. Clone the repo
2. Run `git checkout -b <branch-name>` to start a branch for what you're working on
3. If you're working on the same thing as somebody else it may be usful to create a branch for the task and sub branches for each member
4. [Install node.js](https://nodejs.org/en/download/) if you haven't
5. Run `npm i` in the top level, frontend, and backend directories
6. In the top level directory of the project create a file named ".env"
7. Define the environment variables in .env PORT (5500 is what I use) and CIVIC_INFO_API_KEY **Note:** Here's a helpful [link](https://github.com/motdotla/dotenv)

## Important files and directories
There are a couple of files that may be easily described here. Generally, you'll notice that the application has the root directory, a frontend directory, and a backend directory. Each directory has a .gitignore, package.json, and package-lock.json. This was intentional due to each part of the application having different dependencies, scripts, etc. Because of this make sure...
- **When doing anything with git make sure you are working in the root directory of the project.**
- **When installing npm packages make sure you're in the appropriate directory (ask if you're not sure)**
### Frontend
- The frontend folder contains the React app created using create-react-app
- The frontend will make HTTP requests to the backend api using [axios](https://axios-http.com/docs/intro) (a library that makes HTTP requests easier)
- **frontend > src > components > pages** - components for the different pages the application can display (i.e., landing, information, and account pages)
- **frontend > src > components > assets** - components that we intend to reuse for styling consistency (e.g., buttons, boxes, text, etc.)
    - **Note:** The frontend library [Material UI (MUI)](https://mui.com/) will help us achieve styling consistency but we may (or may not) end up wrapping groupings of MUI components in our own assests
- **App.js** - the highest level component of our application that is parent to all our other components
    - **Note:** Generally App.js should reamin untouched so that the "lower level" components can remain abstracted
### Backend
- The backend folder contains the server code which will make calls to the civic information api and expose the data to our apllication via an internal api
- **backend > .env** - contains environment variables that are appended to the system's variables using the [dotenv](https://www.npmjs.com/package/dotenv) npm package
- **backend > authentication.js** - this is ideally where we'll be able to isolate our authentication functionality for later use but this may need to be moved depending on the functional requirements of the authentication
