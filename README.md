 # Recipes Galore

Recipes Galore is a collaborative project by Alex, Tersia and Chris. It's designed to help you discover and manage your favorite recipes effortlessly.

## Features

- **Recipe Retrieval:** Retrieve recipes from the database by name or ingredients.
- **Recipe Submission:** Add your own recipes to the database.

## Getting Started

Before you begin, ensure you have the following prerequisites installed:

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

<!-- START OF UBUNTU 22.04 LOCAL PROJECT SETUP -->
## Installation (Ubuntu 22.04)

Fork the repository - [How to fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository)   

Clone your forked repository to your local machine - [How-to-clone-your-forked-repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository)

```
git clone https://github.com/YOUR-USERNAME/RecipesGalore.git
```

Navigate to the project directory
```
cd RecipesGalore 
```
Install Backend dependencies
```
npm i
```
Start the Node Express API
```
npm start
```

Open another terminal window  
Navigate to the React App directory
```
cd frontend
```
Install React App dependencies
```
npm i
```

## In your terminal, after running the command above, if you encounter the error below
```bash
code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: react-google-login@5.2.2
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!   peer react@"^16.8.0 || ^17.0.0-rc.1 || ^18.0.0" from @react-aria/ssr@3.9.1
npm ERR!   node_modules/@react-aria/ssr
npm ERR!     @react-aria/ssr@"^3.5.0" from @restart/ui@1.6.6
npm ERR!     node_modules/@restart/ui
npm ERR!       @restart/ui@"^1.6.6" from react-bootstrap@2.10.0
npm ERR!       node_modules/react-bootstrap
npm ERR!         react-bootstrap@"^2.10.0" from the root project
npm ERR!   11 more (@react-oauth/google, @restart/hooks, @restart/ui, ...)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16 || ^17" from react-google-login@5.2.2
npm ERR! node_modules/react-google-login
npm ERR!   react-google-login@"^5.2.2" from the root project
npm ERR! 
npm ERR! Conflicting peer dependency: react@17.0.2
npm ERR! node_modules/react
npm ERR!   peer react@"^16 || ^17" from react-google-login@5.2.2
npm ERR!   node_modules/react-google-login
npm ERR!     react-google-login@"^5.2.2" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! 
npm ERR! For a full report see:
npm ERR! /home/douglas/.npm/_logs/2024-02-27T21_39_25_522Z-eresolve-report.txt
```
Try forcing the dependency resolution by running the command below
```bash
npm i --legacy-peer-deps
```
Start the React App
```
npm start
```
<!-- END OF UBUNTU 22.04 SETUP -->

### 

``bash
cd Copy code
cd recipes-galore
Install the project dependencies:

bash
Copy code
npm install
Usage
Start the development server:

bash
Copy code
npm start
Open your web browser and visit http://localhost:3000 to access Recipes Galore.

Contributing
We welcome contributions! If you'd like to contribute to this project, please follow the guidelines in our CONTRIBUTING.md file.

License
This project is licensed under the MIT License - see the LICENSE file for details.

vbnet
Copy code

In this revised README, we've added a "Features" section to briefly explain what the project does and improved the "Getting Started" section to list the prerequisites. We've also included more detailed installation and usage instructions. Additionally, we mentioned the "Contributing" and "License" sections, which are common in open-source projects, to make it clear how users can get involved and what the licensing terms are.