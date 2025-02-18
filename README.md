# Student Detail Manager

This project is a Student Detail Manager application built with React, TypeScript, Firebase, and Material-UI. It allows users to manage student details, including adding, editing, viewing, and deleting student records.

## Features

- User authentication with Firebase
- Add, edit, view, and delete student records
- Responsive design with Material-UI
- Routing with React Router

## Project Structure

```
. 
├── public/ 
│   ├── assets/ 
│   ├── favicon.ico 
├── src/ 
│   ├── components/ 
│   │   └── Sidebar.jsx 
│   ├── pages/ 
│   │   ├── LoginPage.jsx 
│   │   └── StudentsPage.jsx 
│   ├── App.jsx 
│   ├── firebaseConfig.js 
│   ├── index.jsx 
│   ├── main.tsx 
├── .eslintignore 
├── .eslintrc.cjs 
├── .eslintrc.json 
├── .prettierignore 
├── .prettier.config.mjs 
├── package.json 
├── tsconfig.json 
├── tsconfig.node.json 
├── vite.config.ts 
├── vercel.json 
├── README.md
```

## Getting Started

### Prerequisites

- Node.js 20.x
- Yarn 1.22.22

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/student-detail-manager.git
   cd student-detail-manager
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```sh
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

