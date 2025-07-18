# Title of Application

This is a vibespec. This description provides a brief overview of the software system, its purpose, and its functionality. It should be placed immediately after the title and can be one sentence to a few paragraphs. It should be concise and require just enough information for the LLM to understand the system's intent.

## About
- version: 1 *[Use your preferred versioning scheme: simple numbers, semantic versioning, dated versions]*
- author: Your Name
- last updated: yyyy-mm-dd

## Change History | Changelog | History
- yyyy-mm-dd: Initial version.
- yyyy-mm-dd: Updated to new Vibespec format.

*[Note: Always use yyyy-mm-dd format for dates throughout the vibespec. Never use mm/dd/yyyy as this is ambiguous across locales.]*

## Specifications | Specs
- type: The type of application (web | mobile | desktop).
- languages: The primary programming language used (e.g., JavaScript, Python, Java).
- frameworks: The frameworks and libraries used in the application (e.g., React, Angular, Django).
- target platform: The platform the application is intended to run on (e.g., browser, mobile device, desktop).

### Dependencies
- Foo
- Bar v13.0.1+
- Baz ^2.2.1

## Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

<!-- Note: This section can overlap with User Stories, but is focused on high-level features rather than user interactions. -->

## Requirements
[Lists universal requirements for the software system. Includes functional requirements. This can include non-functional requirements such as performance, security, and compliance. It can also include any specific constraints or limitations that should be considered during development.]
- [Functional Requirement 1]
- [Functional Requirement 2]
- [Technical Requirement 1]
- [Technical Requirement 2]

### Out of Scope
[Explicitly list what will NOT be included in this version]

### Future Considerations
[Requirements planned for later versions. This will help steer the code generation to be forwards compatible.]

## Considerations
[Outlines any specific considerations, constraints, or limitations that should be taken into account when developing or using the software system.]
- This system will be deployed out to small set of users for usability testing before being released to 10,000+ users across the organization.
- The system will be used by [user type].
- The system will be deployed on [platform/environment].

## User Stories
As a [user type], I want to [action] so that [benefit].
As a [user type], I want to [action] so that [benefit].
[Continue with all core user stories]

### User Flow
1. [Step 1 of primary user journey]
2. [Step 2 of primary user journey]
3. [Step 3 of primary user journey]

### Acceptance Criteria
- [ ] [Specific, testable criteria]
- [ ] [Specific, testable criteria]

## Architecture | Application | Application Design | Application Design | System Design
[Describes the high-level structure of the software system, including its components, modules, and their interactions. Should include diagrams, such as component diagrams, sequence diagrams, or deployment diagrams, to illustrate the architecture. Describes software patterns like facade, inversion of control/dependency injection, etc.]

## Data | Data Model | Data Design | Domain
[Describes the entities, relationships, and data structures used in the software system. It can include details about the database schema, data models, or any other relevant data design aspects.]

### Entities

#### [Entity1]
- id: string
- name: string
- email: string (should contain a '@' symbol)
- phone: string
- address: string
- notes: string

#### [Entity2]
- id: string

### Relationships
- Entity1 has a one-to-many relationship with Entity2.

[This section can include diagrams, such as ER diagrams or UML class diagrams, to visually represent the data model.]

## Folder Structure
[Describes the folder structure of the project. Use a tree view (below) or nested list.]
```
.
├── src
│   ├── main.py
│   └── utils.py
├── tests
│   ├── test_main.py
│   └── test_utils.py
└── .env
```

## Setup
[List of project installation and setup instructions.]
- Install dependencies using X.
- Generate build scripts using Y.
- Create a `.env` file to store environment variables.

### Validation
- Validate the setup by running command `xyz` and ensure it completes without errors.

## UI
[Describes the user interface components, their layout, and interactions at a conceptual level. It can include wireframes, mockups, or detailed descriptions of UI elements.]

*[Note: This section should include detailed descriptions of UI elements, their behavior, and interactions at a conceptual level. And implementation details should be included in the Implementation section below.]*

### Layout
Description of the layout structure, including grid systems, spacing, and alignment.

### Pages
List of pages in the application, for web applications.

### Screens
List of screens in the application, for desktop or mobile applications.

## API
[Describes the application programming interfaces (APIs) used in the software system at a conceptual level. It can include details about RESTful APIs, GraphQL APIs, or any other type of API. For a frontend application, this help the backend that will be developed later. For a backend or full-stack application, this can steer how controllers/routes will be generated.]

### Endpoints
[List of API endpoints, including HTTP methods, paths, and descriptions. This can be formatted as a table or a list.]
- **GET /api/resource**: Retrieves a list of resources.
- **POST /api/resource**: Creates a new resource.
- **PUT /api/resource/{id}**: Updates an existing resource.
- **DELETE /api/resource/{id}**: Deletes a resource.

## Database
[Describes the database used in the software system, including the type of databases (e.g., SQL, NoSQL), the data model, and any relevant database technologies. This section may list out details about tables, collections, or schemas used in the database, when needed to guide the implementation. For a backend or full-stack solution, drives the implementation of database access code.]

*[Note: This section discusses the databases themselves. For the data design, refer to the Data section above.]*

## Implementation
[Describes the concrete implementation details, the "how" of the software system. It can include details about the specific code artifacts used in the implementation. **This section is primarily for developers who understand code. For non-developers, the sections above should provide enough information to understand the system's functionality without needing to direct the implementation details.**]

### [Code Artifact]
Artifacts in this list should be specified as direct subsections of the Implementation section, with one or more of these as applicable to your implementation:
- **Actions**: Functions or methods that perform specific tasks.
- **Activities**: In the context of state management, such as in Redux or MobX.
- **Actors**: In the context of actor-based systems or frameworks.
- **Adapters**: Interfaces or adapters for integrating with external systems.
- **Attributes**: Specific attributes or properties of a class or object.
- **Blocs**: Flutter blocs or similar state management patterns.
- **Classes**: Object-oriented classes or data structures.
- **Components**: Such as in React, Vue, or other frontend frameworks.
- **Controllers**: Backend controllers or route handlers.
- **Controls**: UI controls or widgets.
- **Converters**: Functions or classes that convert data from one format to another.
- **DTOs**: Data Transfer Objects (DTOs) used for data exchange.
- **Endpoints**: API endpoints or routes.
- **Enums**: Enumerations or constants used in the codebase.
- **Events**: Event definitions in event-driven architectures.
- **Functions**: Standalone functions or methods.
- **Guards**: Security or validation guards in frameworks like Angular.
- **Handlers**: Event handlers or request handlers.
- **Hooks**: Custom hooks in React or similar frameworks.
- **Interceptors**: Middleware or interceptors in backend frameworks.
- **Interfaces**: C#, Java, TypeScript interfaces or contracts.
- **Middleware**: Backend middleware functions.
- **Models**: Data models or ORM entities.
- **Modules**: Backend modules or libraries.
- **Namespaces**: In languages that support namespaces (e.g., C#, Java).
- **Pages**: Frontend pages or views. (Note: These are concrete implementations of pages vs conceptual page described in the UI section.)
- **Plugins**: Extensible components or plugins.
- **Providers**: Dependency injection providers or React context providers.
- **Repositories**: Data access layers or repositories.
- **Routes**: Routing definitions in web applications.
- **Services**: Backend services or APIs.
- **Stored Procedures | Stored Procs**: Database stored procedures.
- **Stores**: State management stores (e.g., Redux, MobX).
- **Tables**: Database tables or data structures.
- **Templates**: HTML templates or UI templates.
- **Themes**: UI themes or styles.
- **Types**: Type definitions in TypeScript or similar languages.
- **Utilities**: Helper functions or libraries.
- **Views**: Frontend views or pages.
- **View Controllers**: Controllers that manage the view logic.
- **View Models**: MVVM pattern view models.
- **Widgets**: Reusable UI components.
- **Windows**: Desktop application windows or frames.
- **Workers**: Background workers or tasks.

**This list is non-exhaustive and can be extended based on the specific needs of the software system.**

Artifacts should be specified as direct subsections of the Implementation section, with each artifact having its own subsection. 

#### Example

```markdown
### Components
- [Component1]: Description of component 1.
- [Component2]: Description of component 2.

### Controllers
- [Controller1.java]: Description of controller 1.
- [Controller2.java]: Description of controller 2.

### Pages
- [Page1.aspx]: Description of page 1.
- [Page2.aspx]: Description of page 2.
```

## Testing

### Unit Tests
[Describes the unit tests for the software system, including the testing framework used, test cases, and any specific testing considerations.]

### Integration Tests
[Describes the integration tests for the software system, including how different components interact and any specific integration testing strategies.]

### End-to-End Tests
[Describes the end-to-end tests for the software system, including how the entire system is tested from the user's perspective, covering all user flows and interactions.]

## Deployment
[Describes how the software system is deployed, including the environment setup, deployment scripts, and any specific deployment considerations.]
- Deployment environment: [e.g., AWS, Azure, on-premises]

## Issues
[Lists all known issues of the code that was generated, including bugs, performance concerns, or areas needing improvement.]
- In `useCustomers.ts`, when the API returns a 401, the error is not handled properly, leading to an unhandled promise rejection.

## Glossary
[Defines any technical terms, jargon, or acronyms used in the vibespec.]

## References
[Lists of references, such as documentation, external resources, or related projects.]

### Related
- [Link to child vibespec](./path/to/child-vibespec.md)
- [Link to parent vibespec](./path/to/parent-vibespec.md)

### External | Online
- [Link to related document or resource](https://example.com)
