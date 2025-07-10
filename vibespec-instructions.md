# Vibespec Instructions

A vibespec is a structured document that describes a software system in a way that can be easily understood and processed by LLMs. Vibespec files should be used in a desired-state configuration model, where the LLM will generate new code or project scaffolding, or update existing codebases based on the state of the vibespec. The LLM can also create a vibespec file from an existing codebase. 

The vibespec file is either: 
- a file named `vibespec` or `vibespec` in the name, with any document extension (e.g., `.md`, `.txt`, `.json`, etc.)
  - examples: `vibespec.md`, `myapp-vibespec.txt`
- any text-based or document file that identifies itself as a vibespec file in its description.

Vibespec files can contain a variety of content, including text, code snippets, images, and diagrams. In markdown, those assets can be on the local filesystem or on the web. Assets and related data may be accessed through urls or MCP servers. 

You are to read the entire vibespec file and process it according to one of the commands and its rules.

## Commands

Commands are issued in natural language in the chat prompt. Each command starts a command flow. Details and rules for these command flows are described in the subsections.

The following commands are supported:
- `validate`: Validate the vibespec for correctness.
- `run`, `generate`, or `update`: Generate or update code and project files based on the vibespec. User may indicate specific sections of the vibespec for partial updates. The agent should always validate, plan, and then execute.
- `setup`: Run the setup per the Setup section if it exists.
- `describe`: Summarize the changes that will be made to the code based on the vibespec.
- `create`: Analyze the codebase and create a vibespec markdown file if one doesn't exist.
- `plan`: Create a new execution plan for implementing the changes described in the vibespec. No code or project files are changed. User may indicate specific sections of the vibespec for a scoped plan.

> Commands are interpreted from natural language. If the user's intent or target command is ambiguous, ask for clarification on which command to run before proceeding. The user may also ask general questions about the vibespec instructions or their own vibespec.

### Validate Flow

When running the `validate` command:
1. Validate the vibespec according to the rules below. If the user specified only specific sections of the vibespec, validate only that section. If this step is part of the setup flow, only validate the setup section.
2. If there are validation errors, provide feedback to the user, and if this flow was initiated by another flow, ask for confirmation before proceeding to the next step in that flow.

#### Rules
- It reasonably follows the correct structure and format.
- It is not so large that it cannot be processed by the LLM over 10 or less iterations.
- It does not contradict itself.
- It is missing key information or sections, or a sections being validated is ambiguous or incomplete.
- It references files or assets that do not exist or are not accessible.

### Run Flow

When running the `run`, `generate` or `update` command:
1. First validate the vibespec by following the **validate flow**.
2. If the `update` command is used but no codebase exists, warn the user and confirm before proceeding.
3. Determine if the user wishes to focus on only certain areas of the vibespec (e.g., "update UI components"). If so, scope the execution plan and code changes to the relevant area(s) only (see "Partial Updates" subsection below). If the target section(s) are ambiguous, missing, or cannot be determined from the user prompt, ask the user for clarification before proceeding.
4. Determine if the project has not be scaffolded yet. If not, prompt the user if they wish to proceed with the setup step, and if so, run the **setup flow** to scaffold the project.
5. Generate a new execution plan document, following the **plan flow**, that describes the changes that will be made to the code based on the vibespec, including any assumptions made during code generation. If the user has requested to re-run the `run`, `generate` or `update` command, reuse the last execution plan and update it to reflect the current state of the codebase and any changes made since the last run.
6. Generate code and project files based on the checklist in the `execution plan` document, prompting the user along the way for clarification on any items.

#### Generating or Updating Code

- If the user has provided special instructions containing code conventions or standards, always follow those instructions. Those should always supersede any default conventions.
- Follow best practices and common conventions for the specified stack. If details are missing (e.g., project structure, build tool, or configuration), use widely accepted defaults (e.g., use Vite for React 19+ projects).
- If any section of the vibespec is ambiguous, incomplete, or missing, use best practices and reasonable assumptions for the given context.
- Warn the user before making significant assumptions or decisions that may impact the generated code or project structure.
- Ensure that generated code is maintainable, secure, and scalable, and that it aligns with the specifications and intent of the vibespec.

#### Partial Updates

- When the user requests a partial update (e.g., "update UI components"), focus only on the specified sections of the vibespec and codebase.
- Scope the execution plan and code changes to the relevant areas only. Do not modify unrelated files or logic.
- If the target sections are ambiguous, missing, or cannot be determined from the user prompt, ask the user for clarification before proceeding.
- After completing the partial update, ensure the rest of the project remains unchanged and functional.

### Setup Flow

When running the `setup` command:
1. First validate the vibespec by following the validate flow.
1. If the Setup section is present, follow the instructions for setting up the project, including any commands or scripts to run.
2. If the Setup section is missing and code is being generated for the first time, ask the user if they wish to scaffold the project before the code generation takes place.
3. If the coding agent does not support curring terminal commands, warn the user then ask if they want to skip setup and proceed with the initial code generation.

#### Rules
- If the Setup section is present, follow the instructions for setting up the project, including any commands or scripts to run. 
- If the Setup section is missing and code is being generated for the first time, ask the user if they wish to scaffold the project before the code generation takes place.
- If the coding agent does not support curring terminal commands, warn the user then ask if they want to proceed with the initial code generation.
- If the Setup section is incomplete, infer and create the smallest working project structure and install only the essential dependencies required for the specified languages and frameworks in the Specifications section (e.g., if React 19 and TypeScript are specified, install React 19, TypeScript, and Vite).
- By default, scaffold the project in the current directory (where the vibespec file resides). An empty folder is not required unless there is a risk of overwriting important existing files during initial setup. Warn the user if any files may be overwritten and request confirmation before proceeding.
- Detect the user's operating system and shell (e.g., PowerShell on Windows, bash/zsh on macOS/Linux) and generate setup commands that are compatible with that environment. If unsure, ask the user to specify their preferred shell.
- The Setup section is only executed on initial code generation, or when setup-related changes are detected in the vibespec. If the project already exists and no setup changes are present, skip the setup steps. If the project already exists but the detected dependencies or configuration conflict with the vibespec, warn the user and ask if they wish to update the dependencies or configuration to match the vibespec.
- Use best practices for the specified languages and frameworks to scaffold the project and install dependencies.

### Describe Flow

When running the `describe` command, the LLM should:
1. Analyze the vibespec and the current codebase to identify the changes that will be made. If the user specified only specific sections of the vibespec, describe only changes that would occur in those sections.
2. Generate a summarized list of the changes, including new features, modifications to existing code, and any assumptions made during the analysis.
3. Present the description to the user for review.

> **Note:** The `describe` command provides a high-level, human-readable summary of intended changes. It does not generate an actionable execution plan or checklist, and does not make any changes to the codebase or project files. For a detailed, actionable plan, use the `plan` command.

### Create Flow

When running the `create` command, the LLM should:
- Analyze the codebase to identify the existing structure, components, and functionality.
- Create a new vibespec markdown file that describes the current state of the codebase, including specifications, architecture, features, requirements, and implementation details.
- If a vibespec file already exists, warn the user and create the new vibespec in the project directory as a separate file using a numbered suffix (e.g., `app-title-vibespec-1.md`).

### Plan Flow

When running the `plan` command, the LLM should:
1. Validate the vibespec by following the validation flow in the previous section, provided it hasn't been validated yet as part of another flow.
2. Generate a new `execution plan` document that describes the changes that will be made to the code based on the vibespec, including any assumptions made during code generation, following the specifications in the "Execution Plan" section of this document.
3. Inform the user that the execution plan is created with the file name.

> **Note:** The `plan` command produces a detailed, actionable execution plan (checklist and implementation notes) that drives code and project changes, but does not itself make any changes to the codebase or project files. For a summary only, use the `describe` command.

## Execution Plan

An execution plan is a structured document that bridges the gap between the vibespec and the actual codebase. It is generated in a two-phase process:
1. **Parse and Plan:** Parse the entire vibespec and the current codebase, extract all requirements, features, and implementation details, and create a comprehensive checklist and summary of changes. This plan should be as complete as possible, traversing every section of the vibespec, not just the first or most prominent ones.
2. **Iterative Execution:** Execute the plan in manageable steps, updating the checklist and implementation notes as each item is addressed. If the LLM context window is exceeded, pause, notify the user, and resume after user confirmation or context adjustment.

### Execution Plan Template

Output the execution plan to a file named `{vibespec title}-execution-plan-{yyyymmdd}-{#}.log.md` in the `.vibespec` subfolder of the same directory as the vibespec. Increment `{#}` for each new plan on the same day. The plan must include:

```markdown
# Execution Plan

## Summary of Changes
- List all major changes, features, and requirements to be implemented, as extracted from the entire vibespec.

### Checklist
- [ ] List every actionable requirement, feature, or change, including those from all sections (UI, API, Database, Testing, etc.).
- [ ] Mark items as complete, deferred, or requiring clarification as you progress.

### Implementation Notes
- Document any assumptions, clarifications, or reasons for deferring/skipping items. If an item is skipped or deferred, notify the user and request confirmation before proceeding.
- If the context window is exceeded, pause execution, notify the user, and resume after user input.

### Describing Existing Code
- Summarize the current state of the codebase, highlighting which requirements are already met, which are partially implemented, and which are missing. This helps track progress and avoid redundant work.
```

### Additional Guidance
- Always traverse the entire vibespec or user-specified sections or subsections, and update the plan as new requirements or ambiguities are discovered.
- Notify the user before making significant assumptions or skipping requirements.
- Use the execution plan as a living document, updating it after each phase or major change.
- If the LLM context window is a limitation, break the execution into smaller phases, updating the plan and checklist after each phase.

### Describing Existing Code

When creating a vibespec from an existing codebase, include a section that describes the current state of the code. This helps ensure the vibespec accurately reflects the implementation and supports future updates or migrations.

#### What to Include
- **Project Structure:** List main directories and files, especially those containing core logic, components, services, or configuration.
- **Key Components/Modules:** Briefly describe the purpose of major components, modules, or services.
- **Dependencies:** List important libraries, frameworks, and tools used (with versions if possible).
- **Custom Logic:** Note any custom algorithms, business logic, or patterns that are central to the application.
- **Configuration:** Summarize key configuration files (e.g., environment variables, build configs).
- **Known Issues or Limitations:** Document any known bugs, technical debt, or areas needing improvement.

#### Example
```markdown
## Existing Code Overview

- **Structure:**
  - src/components/: React components for UI
  - src/services/: API and data services
  - src/mocks/: Mock API handlers (MSW)
  - public/: Static assets and service worker
- **Key Components:**
  - Header: App header and navigation
  - CustomerTable: Displays customer data
  - CustomerForm: Add/edit customer info
- **Dependencies:** React 19, TypeScript, Axios, MSW
- **Custom Logic:**
  - CustomerService handles all API requests and error handling
  - Modal component for confirmations and forms
- **Configuration:**
  - Vite for build and dev server
  - MSW for local API mocking
- **Known Issues:**
  - No authentication implemented
  - Minimal test coverage
```

Include this overview as a section in the vibespec when reverse-engineering or documenting an existing project. This supports the DSC and execution plan workflow by making the current state explicit and actionable.

## Structure

The vibespec file structure follows this format. The examples use markdown but the equivalent structure should be used in other formats.

- Title: The title of the application or system as the first line of the document, formatted as a top-level heading (H1 or `#`).
- Description: A brief overview of the software system, its purpose, and its functionality, placed directly below the title.
- Sections: Sections are organized as second-level headings (H2 or `##`) and can include subsections (H3 or `###`). Sections are optional and many are only applicable to certain application types.
- Lists: Lists can be presented in one of three ways: comma-separated, bullet points, or subsections. 

### Sections

This section describes the sections that can be included in a vibespec file. None of the sections are explicitly required, and some may not apply to certain application types. Alternate names for sections are provided in parentheses. The LLM should be able to understand these alternate names and treat them as equivalent. Some sections have well-defined subsections, which are described with each Section definition.

There are 2 types of sections:
- Descriptive: Sections that describe the system i.e. "the what". Includes: Specifications, Architecture, Features, Requirements, Considerations, Assumptions, User Stories, References.
- Implementation: Sections that describe the implementation details i.e. "the how". Setup, UI, API, Database, Testing, Deployment. Treat all requirements in these sections as first-class requirements, not as optional or "nice-to-have."

#### Specifications (or Specs)

This section describes the core technical specifications of the software system. If the specifications are small or simple, they can be included below the description at the top of the document.

##### Properties

- type (ApplicationType): The type of application, such as `web`, `mobile`, `desktop`, `cli`, `library`, or `api`.
- languages (ProgrammingLanguage[]): A list of programming languages, such as `TypeScript`, `JavaScript`, `Python`, `Java`, `C#`, etc.
- frameworks (Framework[]): List of frameworks, libraries, or tool used in the application, such as `React`, `Node.js`, `Django`, `Flask`, `Spring Boot`, etc. Versions and version expression can be included, such as `React v19+`. 
- databases (Database[]): Databases used in the system, such as `MongoDB`, `PostgreSQL`, `MySQL`, `SQLite`, etc. The database section can include more detail, such as schema, tables, and relationships.

#### Architecture (or Design)

This section describes the high-level architecture or design of the software system, including key components, modules, and their interactions.

##### Subsections

- Components: A description of the key components or modules in the system, including their responsibilities and interactions.
- Diagrams: Any architectural diagrams or flowcharts that illustrate the system's design, such as UML diagrams, sequence diagrams, or component diagrams. Diagrams may also be included in other subsections.
- Data Model (or Domain): A description of the data model, including any entities, relationships, and attributes. This can include database schema, object models, or data structures. User may include SQL or UML examples.
- Data Flow: A description of how data flows through the system, including any external APIs or services that are used.
- Interfaces: A description of the interfaces between components, including any APIs, protocols, or message formats used for communication.
- Design Patterns (or Patterns): Any design patterns or architectural styles used in the system, such as MVC, microservices, event-driven architecture, etc.
- Glossary: A glossary of terms used in the document, including definitions for jargon and domain-specific terms.

#### Features

This section describes the features of the software system. This should be considered more high-level than the requirements section, focusing on what the software does rather than how it does it. This section is lower priority, and more for the benefit of human readers than the LLM.

#### Requirements

This section describes the functional requirements. These requirements describe what the system should do, whereas the implementation sections (UI, API, Database, Testing) Should be included in all vibespec files. Warn the user if missing.

#### Considerations

This section describes any considerations or constraints that should be taken into account. These are typically non-functional requirements. When generating code, the LLM should consider these constraints and ensure that the generated code adheres to them.

#### Assumptions

This section describes any assumptions made about the software system, its users, or its environment. Assumptions can include expected user behavior, system performance, or external dependencies. In many cases, this section can be omitted, as assumptions can be inferred from user stories, requirements, and other sections.

#### User Stories

This section describes user stories or use cases that illustrate how users will interact with the software system. Each user story should include a description of the user, their goals, and the steps they take to achieve those goals. The user may be a human or another system.

#### Setup

This section describes the project setup instructions for the software system. This section is highly recommended for all vibespec files, especially when generating code for the first time. It provides the necessary steps to scaffold the project and install dependencies.

It can include:
- **Prerequisites:** Software or tools required to run the application (e.g., Node.js, npm, Docker).
- **Installation:** Step-by-step instructions for installing dependencies and scaffolding the project, including commands or scripts.
- **Configuration:** Instructions for configuring the software, such as environment variables, configuration files, or command-line options.

#### UI

This section describes the user interface (UI) design, including any wireframes, mockups, or design principles. Implement all described UI/UX features, even if only mentioned in passing (e.g., tooltips, color schemes, modal behavior). When the application type is a frontend application or library like a web or mobile app, this section should be included, otherwise Warn the user.

##### Subsections
- Pages (or Screens): A list of pages or screens in the application.
- Components: A list of reusable UI components.
- Layout: A description of the overall layout of the application, including header, footer, sidebar, and main content areas.
- Styles: A description of the styles or design system used in the application, including colors, fonts, and other visual elements.
- Assets: A list of assets used in the application, such as images, icons, or fonts. This can include links to external resources or local files.

Note: This list is non-comprehensive and can be extended with additional subsections as needed.

#### API
This section describes the API design, including endpoints, request/response formats, and authentication methods. When the application type is `api` or the software includes a backend, this section should be included. Warn the user if not. Note that when generating a frontend application, the API section can describe the API that the frontend will interact with.

##### Subsections
- Endpoints: A list of API endpoints, including HTTP methods (GET, POST, PUT, DELETE) and paths.
- Request/Response Formats: A description of the request and response formats, including headers, query parameters, and body formats.
- Authentication: A description of the authentication methods used, such as API keys, OAuth, or JWT.
- Error Handling: A description of how errors are handled in the API, including error codes and messages.

Note: This list is non-comprehensive and can be extended with additional subsections as needed.

#### Database
When the application type is `api` or the software includes a backend, or otherwise incorporates a database, this section describes the database design, including schema, tables, and relationships.

#### Testing (or Tests)
This section describes the testing strategy for the software system, including unit tests, integration tests, and end-to-end tests.

##### Subsections
- Unit Tests: A description of the unit testing strategy, including any frameworks or libraries used, such as `Jest`, `Mocha`, or `JUnit`.
- Integration Tests: A description of the integration testing strategy, including how components or services interact with each other and any tools used, such as `Cypress`, `Postman`, or `Supertest`.
- End-to-End Tests (or E2E Tests): A description of the end-to-end testing strategy, including how the entire application is tested from the user's perspective and any tools used, such as `Cypress`, `Selenium`, or `Playwright`.
- Test Frameworks: A list of testing frameworks and libraries used in the project, such as `Jest`, `Mocha`, or `Cypress`.
- Test Coverage: A description of the test coverage strategy, including any tools used to measure coverage, such as `Istanbul` or `Codecov`.

Note: This list is non-comprehensive and can be extended with additional subsections as needed.

#### Deployment
This section describes how the software system will be deployed, including any deployment environments, tools, or
processes. 

Note: This section is a work in progress and will be updated in the future.

##### Subsections
- Environments: A list of deployment environments, such as `development`, `staging`, or `production`.
- Tools: A list of tools or services used for deployment, such as `Docker`, `Kubernetes`
- Deployment Targets: Specifics on where code artifacts will be deployed, such as `AWS`, `Azure`, `GCP`, etc.
- DevOps: A description of the DevOps practices in place.
Note: This list is non-comprehensive and can be extended with additional subsections as needed.

#### References
This section lists any references or resources that were used in the creation of the document or that provide additional context. This will support MCP servers in the future (currently planning).

##### Subsections
- Children: A list of links to child vibespecs that are related to this document.
- Related: A list of links to related vibespecs that provide additional context or information. This could be a parent vibespec or a related project.
- External (or Online): A list of links to external resources with URLs that are relevant.


## Example

```markdown
# Todo App

This is a vibespec for a simple web-based todo application. Allows users to create, read, update, and delete tasks. Interface should be beautiful and modern, with nice fonts and appeasing colors.

## Specifications
- type: web
- languages: TypeScript, HTML, CSS
- frameworks: React, Node.js
- database: MongoDB

## Domain

### Objects
- User
  - id: string
  - name: string
  - email: string (should contain a '@' symbol)  
- Task
  - id: string
  - title: string
  - description: string
  - completed: boolean
  - dateCreated: datetime
  - dateCompleted: datetime

## UI

### Pages
- Home
- Login
- Register
- Dashboard
- Settings

### Components
- Header
- Footer
- Sidebar
- TaskList
- TaskItem

## References

### External
- [Example Todo App](https://github.com/drehimself/todo-react)
```
