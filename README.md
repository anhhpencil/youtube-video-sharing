# Youtube Video Sharing

## Introduction
This project is a web application for sharing YouTube videos. It allows users to register, log in, share YouTube videos, view a list of shared videos, and receive real-time notifications when new videos are shared.

## Key Features
1. **User Registration and Login**: Allow users to create an account and log in.
2. **Sharing YouTube Videos**: Enable users to share YouTube video links.
3. **Viewing Shared Videos**: Display a list of shared videos without up/down vote functionality.
4. **Real-time Notifications**: Notify users in real-time when a new video is shared. The notification should include the video title and the name of the user who shared it, displayed as a pop-up or banner.

## Prerequisites

### Coding environment
- Node.js (v20 or later)
- npm (v10 or later)
- yarn (v1.22 or later)
- Docker (optional)
- Git
- MongoDB (v6 or later) (in case we dont use Docker and want to run in locally)


## Installation & Configuration

**1. Setting a development environtment on your machine (ignore it when you have one)**
- [Intall Node.js & Npm](https://nodejs.org/en/download/package-manager)
- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Install Git](https://git-scm.com/downloads)
- [Install Docker](https://docs.docker.com/compose/install/)
- []

**Note**: Ensure you check and install the appropriate versions of these tools.

**2. Clone the Repository**
```
git clone https://github.com/anhhpencil/youtube-video-sharing.git
```
**3. Configuration**

- Configure environment variables as needed. Refer to sample.env files in the backend and frontend directories.

**4. Database Setup**
- Running Locally: Follow [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/) to set up MongoDB if not using Docker.
- Automatic Schema Setup: All schemas will be initialized when the application starts. This version does not include migration/seed files.

**5. Running the Application**

#### 5.1. Running Locally
#### Manual Commands

- Firstly, navigate to the backend folder:
  - Create an environment file:
    ```
    cp sample.env .env
    ```
  - Install dependencies:
    ```
    yarn 
    ```
   - Start the backend server:
    ```
    yarn start
    ```
  - Run backend tests:
    ```
    yarn test
    ```
- Secondly, navigate to the frontend folder:
    - Create an environment file:
    ```
    cp sample.env .env
    ```
   - TODO
    
Once the frontend server is running, you will be automatically redirected to a web browser, where you can interact with the UI.

**Note** : Ensure MongoDB is running before starting the web servers.

#### 5.2. Running with Docker
- Set up .env files for both backend and frontend as described above.
- Running Servers Separately:
    - Navigate to the backend folder and start backend server:
    ```
    yarn docker:dev
    ```
    - Run backend tests with Docker:
    ```
    yarn docker:test
    ```
    - Navigate to the frontend folder and start frontend server:
    ```
    yarn docker:dev
    ```
    - Run frontend tests with Docker:
    ```
    yarn docker:test
    ```
- All Servers:
    - Navigate to the source folder, and start all servers:
    ```
    yarn docker:web
    ```
    - Run backend tests:
    ```
    yarn docker:web-backend-test
    ```
    - Run frontend tests:
    ```
    yarn docker:web-frontend-test
    ```

#### 5.3. Running in Live Environment
- Provide the URL for the live environment here (TODO)

**6. Docker Deployment**
- Check Docker and Docker Compose files in the source code.
- Build the Docker image
```
docker build -t youtube-sharing .
```
- Run docker containers
```
docker-compose up
```
- Access to the app, open the brower then:
```
http://localhost:[port]
```
Check the port in the .env file configured for the frontend.

**7. Usage**

#### 7.1. How to use
##### Set Up
  - Follow steps from #5 or #6 based on your preference. Open a web browser and navigate to http://localhost:[port]
  - If accessing the live environment, visit the provided URL (TODO)

##### How to use the app
   - Register or Log In: Go to the registration or login page and follow the prompts.
   - Share Videos: Use the “Share Video” feature to submit a valid YouTube link.
   - View Shared Videos: You can see all shared videos once logged in.
   - Notifications: Test real-time notifications by creating two accounts and accessing the app in different browsers.

#### 7.2. Features and Functionality
   - User Registration and Login: Register with a valid email and strong password. Log in to access the application.
   - Sharing YouTube Videos: Share YouTube videos by submitting a valid link.
   - Viewing Shared Videos: View a list of shared videos including titles and sharing users.
   - Real-time Notifications: Receive notifications with video titles and sharer names in real-time after logging in.

**8. Troubleshooting**
- If Docker Compose is missing, install it from the [Docker offical page](https://docs.docker.com/compose/install/)