# Simple CRM Frontend

This is a vibespec for a simple CRM frontend application used by small businesses or teams. It is a bare-bones, minimalistic application that allows users to manage contacts, view contact details, and perform basic CRUD operations. The interface should be simple and intuitive, with a focus on usability.

## About
- version: 2
- author: Joe Agster
- last updated: 2025-07-16

## History
- 2025-07-05: Initial version.
- 2025-07-12: Updated to new Vibespec format.
- 2025-07-16: Added new features and improved documentation.

## Specifications
- type: web
- languages: TypeScript, HTML, CSS
- frameworks: React v19+, Vite, Tailwind CSS
- target platform: browser

### Dependencies
- React Query v5+
- Axios
- React Hook Form
- MSW (Mock Service Worker) ^2.10.3

## Requirements
- The web application must be responsive and work on both desktop and mobile devices.
- Components must have unit tests.
- All TypeScript code must be properly typed.
- Main application components (components, hooks, services) must have JSDoc comments for better understanding and documentation.

### Out of Scope
- Authentication and authorization
- Backend implementation (mock API will be used)

### Future Considerations
- Integration with a real backend API

## Features
- View a list of customers in a table.
- Search for customers by any field and see the results in a table.
- View and edit the details of a customer in a modal when clicking on their name in the table.
- Delete a customer from the table by clicking on a delete button in the table row.

## User Stories
- As a user, I want to be able to view a list of customers in a table.
- As a user, I want to be able to search for customers by any field, and see the results in a table.
- As a user, I want to be able to view and edit the details of a customer in a modal when I click on their name in the table.
- As a user, I want to be able to delete a customer from the table by clicking on a delete button in the table row.
- As a user, I want to be able to add a new customer by clicking on an "Add Customer" button that opens a modal with a form.

## Data Model

### Customer
- id: string
- name: string
- email: string (should contain a '@' symbol)
- phone: string
- address: string
- notes: string

## Folder Structure
The folder structure for the project should be organized as follows:

```
src
├── assets
│   └── (any static assets like images, icons, etc.)
├── components
│   ├── [ComponentName]
│   │   └── index.ts
│   │   └── [ComponentName].tsx
│   │   └── [ComponentName].test.tsx
├── hooks
│   └── useCustomerQuery.ts
├── mocks
│   ├── (files for MSW mock API)
├── services
│   └── CustomerService.ts
├── App.tsx
└── index.tsx
```


## Setup
- Scaffold the project in the current directory.
- Install and/or validate presence of any system prerequisites such as `Node.js` and `npm`.
- Initialize a new React 19 project with TypeScript support using Vite (in the current directory or a new one as needed).
- Use `vite` as the build tool and development server.
- Use `vitest` for unit testing and `React Testing Library` for testing React components.
- Set up a `package.json` file with the appropriate dependencies.
- Initialize and configure Tailwind CSS according to the official documentation.
- Create or update `tsconfig.json` for React + TypeScript.
- Add or update scripts in `package.json` for:
  - `dev` (development server)
  - `build` (production build)
  - `test` (run unit tests)
- Add or update a `.gitignore` file to exclude `node_modules`, build artifacts, and environment files.

## UI
- fonts: Roboto, Ariel, sans-serif
- colors: light mode with a almost-white background and dark text, sunny orange accents

### Layout
- Pages should stretch to fill the entire viewport.
- Header: Contains the title "SimpleCRM" left aligned, "Simple" in orange and "CRM" in darker purple; right-side of the header is a button with + icon to add a new customer.
- Footer: Contains the text "©2025 SimpleCRM" centered at the bottom of the page.

### Pages
There is only one page in this application, which is the main customer management page. The page contains a table of customers.

## API
Since this is the frontend application, it will need to communicate with a backend API to perform CRUD operations on customers. For now, assume that these API endpoints exist:

- `GET /api/customers` - Retrieve a list of customers
- `GET /api/customers/:id` - Retrieve a specific customer by ID
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update an existing customer
- `DELETE /api/customers/:id` - Delete a customer

### Considerations
Do not worry about authentication or error handling for this simple CRM application. The focus is on the frontend implementation and interaction with a mock backend API. This is a demo project and will not be deployed to production.

## Implementation

### Components
- `CustomerTable.tsx`: displays a list of customers in a table format. It should fill the width of its container.
  Columns:
  - ID
  - Name
  - Email
  - Phone
  - Address
  - Notes: Shown as a tooltip when hovering over the text, with a maximum width of 200px.
  - Actions: Edit and Delete buttons for each customer.
- `CustomerRow.tsx`: represents a single row in the customer table, displaying customer details for each field (id, name, email, phone, address, notes) and actions (edit, delete).
- `CustomerForm.tsx`: a form for creating and/or editing customer details. When editing, display the ID field as a label.
- `Modal.tsx`: a reusable modal component for displaying the CustomerForm.

#### Layout Components
- `Header.tsx`: Contains the page title and a button to add a new customer.
- `Footer.tsx`: Contains the footer text.

### Models
- `Customer.ts`: TypeScript interface for the Customer model, defining the structure of customer data.

### Hooks
- `useCustomerQuery.ts`: A custom hook that uses React Query to fetch and manage customer data from the API. It should handle fetching, creating, updating, and deleting customers.

### Services
- `CustomerService.ts`: Contain functions to interact with the backend API using axios. 

Use ReactQuery to manage API calls and state. The mock backend should store customer data in memory (e.g., using an array) and respond to API requests with the appropriate data. It should be seeded with 10 or more sample customers to demonstrate the functionality of the frontend application.

Example of `CustomerService.ts`:

```typescript

export const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCustomerById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCustomer = async (customer: any) => {
  const response = await axios.post(API_URL, customer);
  return response.data;
};

export const updateCustomer = async (id: string, customer: any) => {
  const response = await axios.put(`${API_URL}/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

```

## Testing
- Use Vitest and React Testing Library for unit tests.
- Write unit tests for all components and hooks.
- Do NOT write any integration or e2e tests right now.

## Deployment
This is a demo project and will not be deployed to production.

## Issues
- (IGNORE FOR NOW) After some time, the mock service worker stops responding to requests. This is likely due to the service worker not being properly registered or unregistered. 

## References

### External
- [CRMx](https://github.com/luckyshot/CRMx): A CRM application that has similar UI.
- [Tailwind CSS Installation with Vite](https://tailwindcss.com/docs/installation/using-vite): Instructions for setting up Tailwind CSS with Vite.
- [Mock Service Worker](https://mswjs.io/): API mocking library for browser and Node.js.

