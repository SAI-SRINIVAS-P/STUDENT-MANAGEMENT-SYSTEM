<!--
  Student Management System
  Animated title uses a Markdown-safe GIF from readme-typing-svg.
  The rest of this document is plain GitHub-flavored Markdown.
-->

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&duration=2800&pause=900&color=2563EB&center=true&vCenter=true&width=800&lines=%F0%9F%8E%93+STUDENT+MANAGEMENT+SYSTEM;Organize+students.+Simplify+records.;A+React+%2B+.NET+%2B+SQL+Server+project" alt="Animated Student Management System title" />

  <p><strong>A simple full-stack application for managing student records from one place.</strong></p>

  <p>
    <a href="https://github.com/SAI-SRINIVAS-P/STUDENT-MANAGEMENT-SYSTEM"><img src="https://img.shields.io/badge/Repository-GitHub-181717?logo=github" alt="GitHub repository"></a>
    <img src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=20232A" alt="React 18">
    <img src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Backend-ASP.NET%20Core%208-512BD4?logo=dotnet&logoColor=white" alt="ASP.NET Core 8">
    <img src="https://img.shields.io/badge/Database-SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white" alt="SQL Server">
  </p>

  <p><em>Keep student records tidy: add, find, update, and remove them through a clean web interface.</em></p>

</div>

---

## 📚 Table of contents

- [About the project](#-about-the-project)
- [Features](#-features)
- [Technology stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Run the project](#-run-the-project)
- [Demo login](#-demo-login)
- [API endpoints](#-api-endpoints)
- [Project structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Security notes](#-security-notes)
- [Project description](#-project-description)

## 🎯 About the project

**Student Management System** is a full-stack CRUD web application built to demonstrate a practical student-record management workflow. The React interface communicates with an ASP.NET Core Web API, and the API reads and writes student records through Entity Framework Core and Microsoft SQL Server.

Each student record contains a name, email address, course, and age. The interface provides a dashboard-style directory with a total-student count, search, and actions to add, edit, or delete records.

> This repository currently implements student record management. It does not include a production identity system, role-based access control, attendance, fee payment, or grade-management modules.

## ✨ Features

- **Student CRUD:** create student records, view the directory, edit existing records, and delete entries.
- **Student directory:** display saved records in a table with a student ID, name, email, course, age, and action controls.
- **Live search:** filter displayed students by name, email, or course.
- **Form validation:** browser and API validation for required fields, email format, string lengths, and age range.
- **Login screen:** a demo sign-in page to gate the UI during local demonstrations.
- **API documentation:** Swagger UI is configured for the API in the ASP.NET Core Development environment.
- **Persistent storage:** SQL Server stores records beyond a browser refresh.

## 🧰 Technology stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React 18 | UI components and application state |
| Frontend tooling | Vite 5 | Local development server and production build |
| Backend | ASP.NET Core Web API on .NET 8 | HTTP API for student records |
| Data access | Entity Framework Core 8 | ORM and SQL Server integration |
| Database | Microsoft SQL Server | Persistent student data |
| API docs | Swashbuckle / Swagger | Interactive endpoint documentation |

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│ Browser                     │
│ React + Vite                │
│ http://localhost:5173       │
└──────────────┬──────────────┘
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│ ASP.NET Core Web API (.NET 8│
│ http://localhost:5000       │
│ /api/students               │
└──────────────┬──────────────┘
               │ Entity Framework Core
               ▼
┌─────────────────────────────┐
│ Microsoft SQL Server        │
│ StudentManagementDB         │
└─────────────────────────────┘
```

The frontend's `VITE_API_BASE_URL` setting determines the API origin. The API's configured CORS policy currently allows the Vite development origin `http://localhost:5173`.

## ✅ Prerequisites

Install these tools before running the application.

| Requirement | Recommended / expected | Download |
| --- | --- | --- |
| Git | Recent version | [git-scm.com/downloads](https://git-scm.com/downloads) |
| Node.js + npm | Node.js LTS; npm is bundled with Node.js | [nodejs.org](https://nodejs.org/en/download) |
| .NET SDK | **.NET 8 SDK** | [dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) |
| SQL Server | SQL Server Express or another SQL Server instance | [SQL Server downloads](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) |
| SQL Server management UI (optional) | SQL Server Management Studio (SSMS) | [SSMS download](https://learn.microsoft.com/en-us/ssms/install/install) |
| Editor (optional) | Visual Studio Code or Visual Studio | [VS Code](https://code.visualstudio.com/Download) · [Visual Studio](https://visualstudio.microsoft.com/downloads/) |

### System checklist

- A supported Windows, macOS, or Linux environment for the SDKs and tools you choose. **The checked-in database connection string is Windows/SQL Express-oriented**; update it when using a different SQL Server setup.
- Network access to download npm and NuGet packages on the first run.
- A SQL Server instance running and reachable from the backend.
- Available local ports for the frontend (Vite defaults to `5173`) and backend (the README commands use `5000`).

Verify the installations from a terminal:

```bash
git --version
node --version
npm --version
dotnet --info
```

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/SAI-SRINIVAS-P/STUDENT-MANAGEMENT-SYSTEM.git
cd STUDENT-MANAGEMENT-SYSTEM
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

The repository includes a `package-lock.json`; `npm install` installs the dependencies declared by `package.json`.

### 3. Configure SQL Server

The current `backend/appsettings.json` connection string is:

```text
Server=.\\SQLEXPRESS;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;
```

This expects a local SQL Server Express instance named `SQLEXPRESS` and Windows integrated authentication. Make sure that instance is installed, started, and configured to accept local connections.

If your SQL Server instance is different, update `ConnectionStrings:DefaultConnection` in `backend/appsettings.json` to match your own environment. Examples:

**Local SQL Server Express (Windows integrated authentication):**

```text
Server=.\\SQLEXPRESS;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;
```

**Local default SQL Server instance (Windows integrated authentication):**

```text
Server=localhost;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;
```

Use a connection string appropriate to your platform and authentication method. Do not commit real database passwords or production secrets to source control.

### 4. Apply the database migration

The repository includes an Entity Framework Core initial migration that creates the `Students` table. From the repository root, run:

```bash
cd backend
dotnet tool install --global dotnet-ef --version 8.0.11
dotnet restore
dotnet ef database update
cd ..
```

If `dotnet-ef` is already installed globally, update it or skip the install command. The EF tool and runtime packages should use compatible major versions.

If you prefer not to install the EF tool globally, see the official [EF Core CLI documentation](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) for local-tool setup.

## ⚙️ Configuration

### Frontend API URL

The frontend uses `frontend/.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

Keep the value aligned with the address where the backend is listening. Restart Vite after changing environment variables.

### Backend connection string

Update `backend/appsettings.json` under `ConnectionStrings:DefaultConnection` for your SQL Server instance. The checked-in default uses SQL Server Express with integrated authentication.

### Backend port

The frontend is configured for port `5000`. Run the backend with an explicit URL to keep both sides aligned:

```bash
dotnet run --urls http://localhost:5000
```

When running the API in Development mode, Swagger UI is normally available at:

- API documentation: [http://localhost:5000/swagger](http://localhost:5000/swagger)

## ▶️ Run the project

Run the frontend and backend in **two separate terminals**. Start SQL Server before launching the API.

### Terminal 1: start the backend API

```bash
cd STUDENT-MANAGEMENT-SYSTEM/backend
dotnet restore
dotnet run --urls http://localhost:5000
```

Keep this terminal open. The API will be available at `http://localhost:5000` if the configured port is free.

### Terminal 2: start the React frontend

```bash
cd STUDENT-MANAGEMENT-SYSTEM/frontend
npm install
npm run dev
```

Open the local URL Vite prints in the terminal, normally [http://localhost:5173](http://localhost:5173).

### Production frontend build

To verify/build the frontend bundle:

```bash
cd frontend
npm run build
```

To preview the built bundle locally:

```bash
npm run preview
```

> **Important:** the current CORS policy allows only `http://localhost:5173`. If you change the frontend origin or deploy it, update the backend CORS policy accordingly. Do not use the development configuration as-is for a public production deployment.

## 🔐 Demo login

The current frontend login is a **hard-coded demo check**, not server-side authentication.

| Field | Demo value |
| --- | --- |
| Email | `admin@students.com` |
| Password | `Admin@123` |

After successful login, the UI records a flag in browser `sessionStorage`. These demo credentials are visible in the client source code and must **not** be used as real security credentials or deployed as an authentication solution.

## 🔌 API endpoints

Base URL: `http://localhost:5000/api/students`

| Method | Endpoint | Description | Typical response |
| --- | --- | --- | --- |
| `GET` | `/api/students` | List all students, ordered by name | `200 OK` |
| `GET` | `/api/students/{id}` | Get one student by ID | `200 OK` or `404 Not Found` |
| `POST` | `/api/students` | Create a student | `201 Created` |
| `PUT` | `/api/students/{id}` | Update a student | `204 No Content` |
| `DELETE` | `/api/students/{id}` | Delete a student | `204 No Content` |

### Student payload example

```json
{
  "name": "Asha Kumar",
  "email": "asha@example.com",
  "course": "Computer Science",
  "age": 20
}
```

The API model requires a name, valid email, and course. Name and course are limited to 80 characters, email to 120 characters, and age must be between 1 and 120.

Example request (with the API running):

```bash
curl http://localhost:5000/api/students
```

## 🗂️ Project structure

```text
STUDENT-MANAGEMENT-SYSTEM/
├── backend/
│   ├── Controllers/
│   │   └── StudentsController.cs    # Student CRUD API endpoints
│   ├── Data/
│   │   └── StudentDbContext.cs      # Entity Framework Core context
│   ├── Migrations/                  # SQL Server schema migration
│   ├── Models/
│   │   └── Student.cs               # Student data model and validation
│   ├── Program.cs                   # API services, CORS, Swagger
│   ├── StudentManagement.Api.csproj
│   └── appsettings.json              # Database connection settings
└── frontend/
    ├── src/
    │   ├── App.jsx                   # Student directory and CRUD UI
    │   ├── Login.jsx                 # Demo login screen
    │   ├── Root.jsx                  # Login / app routing state
    │   ├── Login.css
    │   ├── styles.css
    │   ├── index.css
    │   └── main.jsx
    ├── .env                          # Frontend API URL
    ├── package.json
    └── package-lock.json
```

## 🛠️ Troubleshooting

### The API cannot connect to SQL Server

- Confirm the SQL Server service/instance is running.
- Verify the instance name in `DefaultConnection` (the default expects `SQLEXPRESS`).
- Confirm your Windows account has access when using integrated authentication.
- Apply the initial migration with `dotnet ef database update`.

### The browser reports a network error or CORS issue

- Start the backend at `http://localhost:5000`.
- Confirm `frontend/.env` sets `VITE_API_BASE_URL=http://localhost:5000`.
- Confirm the frontend uses `http://localhost:5173`; the API's configured CORS policy allows that exact origin.
- Restart the frontend after changing `.env`.

### Port 5000 is already in use

Choose a free port and update both backend startup and `VITE_API_BASE_URL` to match. If the port or frontend origin changes, also review the CORS configuration.

### Swagger does not open

Swagger is enabled only when the ASP.NET Core environment is Development. Ensure the app is running in that environment, then open `/swagger` at the backend URL.

### The frontend says there are no students

An empty directory can be normal on first run. Add a student from the form, or send a `POST` request to `/api/students`. If loading fails rather than returning an empty list, check the API console and database connection.

## 🔒 Security notes

- The included login is intended only for demonstration. Credentials are hard-coded in JavaScript, and the UI state is stored in session storage. This is not authentication or authorization that protects API data.
- The API currently calls `UseAuthorization()` but does not configure an authentication scheme or enforce authenticated access to the student endpoints.
- Before production use, add server-side authentication and authorization, move secrets to environment variables or a secret store, enforce HTTPS, restrict CORS to trusted origins, and validate operational/back-up requirements for the database.
- Do not put private connection strings, access tokens, or real passwords in source control.

## 📝 Project description

**Student Management System** is a full-stack web application for organizing student information through a web-based dashboard. The React 18 frontend, bundled and served during development with Vite, provides a demo login screen and a searchable student directory. Users can add new students, view saved records, edit student details, and delete entries. Each record stores a student's name, email address, course, and age.

The ASP.NET Core 8 Web API exposes REST endpoints for the student CRUD operations. Entity Framework Core maps the student model to Microsoft SQL Server, and the initial migration creates the database table. The project is suitable as a learning project for React, REST API design, .NET, EF Core, SQL Server integration, and the basics of connecting a frontend to a backend.

---

<div align="center">

  **Made to keep student records organized 🎓**

  <sub>Repository: <a href="https://github.com/SAI-SRINIVAS-P/STUDENT-MANAGEMENT-SYSTEM">STUDENT-MANAGEMENT-SYSTEM</a></sub>

</div>
