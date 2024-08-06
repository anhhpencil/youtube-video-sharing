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
- npm (v10 or later)
- yarn (v1.22 or later)
- Docker (optional)
- Git

### Backend
- Node.js (v20 or later)
- MongoDB (v6 or later)

### Frontend


## Project Structure

### Backend
```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files (Ignore on this project)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

### Frontend

## APIs


## Installation & Configuration