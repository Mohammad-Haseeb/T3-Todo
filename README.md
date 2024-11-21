# Task Management Application

## Overview

This is a modern, responsive Task Management Application built with React and TypeScript. It allows users to create, edit, delete, and mark tasks as complete. The application uses tRPC for type-safe API calls and Zustand for state management.

## Features

- Create new tasks
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Responsive design for both desktop and mobile screens
- Real-time updates using React Query
- Type-safe API calls with tRPC
- State management with Zustand

## Technologies Used

- React
- TypeScript
- tRPC
- Zustand
- React Query
- Tailwind CSS
- PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/task-management-app.git
   ```

2. Navigate to the project directory:

   ```
   cd todo-assessment
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Setting up .env file

   Create a file named `.env` in the root directory of the project.
   Add the following variables to `.env` file:

```
     DATABASE_URL="postgres://postgres:password@localhost:5 432/dbName?schema=public"
     NEXT_PUBLIC_URL= "http://localhost:3000"
```

5. Start the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

6. Open your browser and visit `http://localhost:3000`

## Project Structure

```
.
├── app
│   ├── api
│   │   └── trpc
│   │       └── [trpc]
│   │           └── route.ts
│   ├── components
│   │   ├── AddTaskForm
│   │   │   ├── AddTaskForm.tsx
│   │   │   ├── taskSchema.ts
│   │   │   ├── types.ts
│   │   │   └── useTaskSubmission.tsx
│   │   ├── ClientToastContainer.tsx
│   │   ├── ErrorMessage
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── types.ts
│   │   ├── LoadingSpinner
│   │   │   └── LoadingSpinner.tsx
│   │   └── TaskList
│   │       ├── EditTaskForm.tsx
│   │       ├── TaskItem.tsx
│   │       ├── TaskList.tsx
│   │       └── types.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20240816194255_task
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── next.svg
│   └── vercel.svg
├── README.md
├── src
│   ├── lib
│   │   └── prisma.ts
│   ├── server
│   │   ├── routers
│   │   │   ├── _app.ts
│   │   │   ├── taskOperations.ts
│   │   │   └── task.ts
│   │   └── trpc.ts
│   ├── store
│   │   └── taskStore.ts
│   ├── types
│   │   └── task.ts
│   └── utils
│       ├── taskUtils.ts
│       └── trpc.ts
├── tailwind.config.ts
└── tsconfig.json

20 directories, 39 files

```

## Usage

- To add a new task, use the input field at the top of the page and press Enter.
- To edit a task, click the "Edit" button next to the task and modify the text in the input field that appears.
- To mark a task as complete, click the checkbox next to the task.
- To delete a task, click the "Delete" button next to the task.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators and maintainers of React, TypeScript, tRPC, Zustand, and all other open-source libraries used in this project.
