# Project Architecture

## 1. Frontend structure

The frontend should use a clear folder structure so the project can grow without becoming hard to manage.

Recommended structure:

```text
frontend/
  src/
    api/
    router/
    pages/
    components/
    tests/
```

### `router/`

- The `router/` folder handles page navigation.
- This keeps route logic in one place.
- When the project grows, new pages can be added easily without changing many files.
- This is good for the 3 main pages:
  - Login
  - Dashboard
  - Overview

### `api/`

- The `api/` folder keeps all frontend API code in one place.
- Pages and components should not call backend URLs directly.
- This makes the code cleaner and easier to update.
- If the backend URL or request format changes, only the API layer needs to be updated.

### `pages/`

- Each page has its own responsibility.
- Example:
  - `LoginPage` for login UI
  - `DashboardPage` for summary and quick access
  - `OverviewPage` for task list and task actions

### `components/`

- The frontend is component-based.
- Shared UI parts should stay inside `components/`.
- This makes every area easier to edit without breaking the whole page.
- Example shared component:
  - bottom navigator bar

This approach improves:

- reusability
- readability
- easy maintenance
- easy scaling

## 2. Backend structure

The backend uses a three-layer architecture:

```text
Controller -> Service -> DB/Repository
```

### Controller layer

- The controller handles HTTP requests and responses.
- It exposes the API endpoints.
- It should not contain heavy business logic.

### Service layer

- The service contains the business logic.
- This is the main place for task rules and application behavior.
- Keeping logic here makes the system easier to test and maintain.

### DB/Repository layer

- The DB layer handles data storage.
- Right now, the project uses in-memory storage.
- The repository layer hides storage details from the rest of the system.

## 3. Design pattern for database flexibility

The backend should use an interface-based repository design.

Example idea:

- `TaskRepository` as the interface
- `InMemoryTaskRepository` as the current implementation

Why this is useful:

- the service depends on the interface, not on a specific database
- later, the project can add another implementation such as MySQL, PostgreSQL, or MongoDB
- the main controller and service code will need very little change

This follows the dependency inversion idea:

- high-level logic should not depend on low-level storage details
- both should depend on an abstraction

## 4. Why this architecture is maintainable

This structure helps the project in the long term:

- frontend routing stays organized in one folder
- frontend API code stays organized in one folder
- component-based pages are easier to update area by area
- controller layer stays focused on API handling
- service layer stays focused on business logic
- repository layer stays focused on storage
- database changes can be handled with minimal impact to the main code

## 5. Summary

This project should follow these rules:

1. Frontend uses `router/` for navigation.
2. Frontend uses `api/` for API request code.
3. Frontend pages are built with reusable components.
4. Backend uses `controller -> service -> repository`.
5. Backend uses repository interfaces so the database can be changed easily later.
