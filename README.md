![Banner](https://i.imgur.com/ykP7NOF.png)

<h1 align="center">Sonic CDN</h1>

<p align="center"> An Electron application for easily uploading files to your content delivery network.
<br /> While not a CDN itself, Sonic CDN simplifies the process of uploading files and managing your CDN.
</p>

## Features

- Simple drag-and-drop file upload or select files using the explorer
- Rename or randomize file names before uploading
- Progress bar to track upload status, with option to cancel uploads
- Generate download links for uploaded files and automatically copy them to clipboard
- File history with options to delete or open uploaded files
- CDN storage space indicator showing used and available storage
- Password protected file uploads

![Screenshots](https://i.imgur.com/zMTracm.png)

## Technologies Used

- TypeScript
- Electron-Vite
- Node.js
- Express
- Tailwind CSS

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Wilzzu/Sonic-CDN.git
   cd Sonic-CDN
   ```

2. **Install dependencies:**

   ```
   # For backend
   cd backend
   npm install

   # For frontend
   cd frontend
   npm install
   ```

3. **Configure environment variables:**
   Rename the `.env.example` files in both `backend` and `frontend` directories to `.env` and fill in the values:

   **Frontend `.env` file:**

   | Variable        | Description                                                                                                  |
   | --------------- | ------------------------------------------------------------------------------------------------------------ |
   | `VITE_API_URL`  | The URL where your backend server is hosted, e.g., `http://localhost:3001`.                                  |
   | `VITE_CDN_URL`  | The URL where your CDN is hosted, e.g., `http://cdn.example.com`.                                            |
   | `VITE_PASSWORD` | Password to authenticate with the backend. Should be the same in both the frontend and backend `.env` files. |

   **Backend `.env` file:**

   | Variable            | Description                                                                                                            |
   | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
   | `PORT`              | The port where the backend server will run, e.g., `3001`.                                                              |
   | `CDN_DIR`           | The directory path where uploaded files will be stored. Can be an absolute or relative path.                           |
   | `CDN_RELATIVE_PATH` | Set to `true` if `CDN_DIR` is a relative path.                                                                         |
   | `PASSWORD`          | Password to authenticate requests from the frontend. Should be the same in both the frontend and backend `.env` files. |

4. **Run the application:**

   ```
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend server
   cd frontend
   npm run dev
   ```

## Build

To build the application for production:

- **Frontend:**

  ```
  cd frontend
  npm run build

  # For Windows
  npm run build:win

  # For Linux
  npm run build:linux

  # For macOS
  npm run build:mac
  ```

- **Backend:**

  ```
  cd backend
  npm run build
  ```

The built application will be in the `dist` directory in the respective folders.

## API Endpoints

All endpoints are protected with a password that must be included in the request body.

- `POST /api/upload` - Upload a file to the CDN.
- `DELETE /api/file/delete` - Remove a file from the CDN.
- `PUT /api/file/rename` - Rename a file on the CDN. _(Not used for now)_
- `GET /api/storage` - Retrieve CDN storage information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
