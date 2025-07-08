# Vibespec Instructions

A vibespec is a structured document that describes a software system in a way that can be easily understood and processed by LLMs. Vibespec files should be used in a desired-state configuration model, where the LLM will generate new code, update existing code, or generate a vibespec from an existing codebase. 

The vibespec file is either: 
- a file named `vibespec` or `vibespec` in the name, with any document extension (e.g., `.md`, `.txt`, `.json`, etc.)
  - examples: `vibespec.md`, `myapp-vibespec.txt`
- any text-based or document file that identifies itself as a vibespec file in its description.

Vibespec files can contain a variety of content, including text, code snippets, images, and diagrams. In markdown, those assets be on the local filesystem or on the web. Assets and related data may be accessed through urls or MCP servers. 

You are to read the entire vibespec file and have the ability to generate a software application, library, or other code artifact based on the specifications. The generated code should be structured, maintainable, and follow best practices for the specified programming languages and frameworks. Security, performance, and scalability should be considered in the design and implementation of the code.

## Commands

Commands are issued in natural language in chat, but you should take action when you see these command key words:
- `generate`: Generate code based on the vibespec. The user may specify which portions of the vibespec to generate, typically when updating.
- `validate`: Validate the vibespec for correctness. More instructions below.
- `update`: Update the existing code to match the vibespec. Do your best to determine what was manually edited by a developer and avoid overwriting those changes. Warn the user in this case.
- `describe`: Describe the changes that will be made to the code based on the vibespec.
- `create`: Analyze the codebase and creates a vibespec file, when one doesn't exist or an alternate one needs to be created.

## Validation

Validate the vibespec to ensure:
- It reasonably follows the correct structure and format.
- It is not so large that it cannot be processed by the LLM.
- It does not contradict itself.
- It is missing key information or sections.
- It references files or assets that do not exist or are not accessible.

Validation should not stop you from generating code, but it should provide feedback on potential issues or areas for improvement. Warn the user whenever there are validation issues and get confirmation via chat prompt before proceeding with code generation or updates.

## Structure

The structure follows this format. The examples use markdown but the equivalent structure should be used in other formats.

- Title: The title of the application or system as the first line of the document, formatted as a top-level heading (H1 or `#`).
- Description: A brief overview of the software system, its purpose, and its functionality.
- Sections: Sections are organized as second-level headings (H2 or `##`) and can include subsections (H3 or `###`). Sections are optional and many are only applicable to certain application types.
- Lists: Lists can be presented in one of three ways: comma-separated, bullet points, or subsections. Use the format that best fits the information being presented.

### Sections
This section describes the sections that can be included in a vibespec file. None of the sections are required, and some may not apply to certain application types. 

#### Specifications (or Specs)
This section describes the core technical specifications of the software system. If the specifications are small or simple, they can be included below the description at the top of the document.

##### Properties
- type (ApplicationType): The type of application, such as `web`, `mobile`, `desktop`, `cli`, `library`, or `api`.
- languages (ProgrammingLanguage[]): A list of programming languages, such as `TypeScript`, `JavaScript`, `Python`, `Java`, `C#`, etc.
- frameworks (Framework[]): List of frameworks, libraries, or tool used in the application, such as `React`, `Node.js`, `Django`, `Flask`, `Spring Boot`, etc. Versions and version expression can be included, such as `React v19+`. 
- databases (Database[]): Databases used in the system, such as `MongoDB`, `PostgreSQL`, `MySQL`, `SQLite`, etc. The database section can include more detail, such as schema, tables, and relationships.

#### Domain
This section describes the domain or object model of the software system. User may include SQL or UML.

##### Subsections
- Objects (or Entities): A list of domain objects or entities.
- Glossary: A glossary of terms used in the document, including definitions for jargon and domain-specific terms.

#### Features
This section describes the features of the software system. This should be considered more high-level than the requirements section, focusing on what the software does rather than how it does it.

#### Requirements
This section describes the functional requirements. Should be included in all vibespec files. Warn the user if missing.

#### Considerations
This section describes any considerations or constraints that should be taken into account. These are typically non-functional requirements.

#### Assumptions
This section describes any assumptions made about the software system, its users, or its environment. Assumptions can include expected user behavior, system performance, or external dependencies.

#### Architecture (or Design)
This section describes the high-level architecture or design of the software system, including key components, modules, and their interactions.

#### UI
This section describes the user interface (UI) design, including any wireframes, mockups, or design principles. When the application type is a frontend application or library like a web or mobile app, this section should be included. Warn the user if not.

Subsections can include:
- Pages (or Screens): A list of pages or screens in the application.
- Components: A list of reusable UI components.

#### API
This section describes the API design, including endpoints, request/response formats, and authentication methods. When the application type is `api` or the software includes a backend, this section should be included. Warn the user if not. Note that when generating a frontend application, the API section can describe the API that the frontend will interact with.

#### Database
When the application type is `api` or the software includes a backend, or otherwise incorporates a database, this section describes the database design, including schema, tables, and relationships.

#### User Stories
This section describes user stories or use cases that illustrate how users will interact with the software system. Each user story should include a description of the user, their goals, and the steps they take to achieve those goals. The user may be a human or another system.

#### References
This section lists any references or resources that were used in the creation of the document or that provide additional context. This will support MCP servers in the future (currently planning).

References can include these subsections:
- Children: A list of links to child vibespecs that are related to this document.
- Related: A list of links to related vibespecs that provide additional context or information. This could be a parent vibespec or a related project.
- External (or Online): A list of links to external resources with URLs that are relevant.

## Change Management
The LLM should do its best to track changes made to the codebase and the vibespec file to adhere to the desired-state configuration model. To do this, the LLM will use 2 approaches:
1. **Changelog File**: A file that documents all material changes made by the LLM to the codebase.
2. **Source Control**: Use source control (e.g., Git) to help determine the current state of the codebase and track changes made by the LLM.

### Changelog File

The changelog file, named `.vibespeclog`, documents all material changes made by the LLM to the codebase. All changelog and archive files must be stored in the `.vibespec` folder located at the project root, where the vibespec file (e.g., `vibespec.md`) resides. A **material change** is any addition, removal, or significant modification to code, configuration, or assets that affects application behavior or structure.

#### Structure
Each entry in the changelog file file should follow this structure:
```
[YYYY-MM-DDTHH:MM:SSZ] <Action> <Asset>: <File or Folder Path> <Line>: <Summary of change>
```

Where:
- **Timestamp**: ISO 8601 format in brackets, e.g., `[2025-07-04T12:34:56Z]`.
- **Action**: The action taken, such as `Created`, `Updated`, `Deleted`, `Renamed`, `Refactored`, `Fixed`, or `Added`.
  - Use `Created` for new files or components.
  - Use `Added` when adding new features or functionality to an existing file.
- **Asset**: the type of code artifact being changed, such as `component`, `service`, `page`, `test`, `style`, etc.
- **File Path**: The path to the file or code being changed, in quotes, relative to the project root. If the change affects multiple files in a folder, list the folder e.g., `src/components/`. If changes touches many files beyond a single folder, omit completely.
- **Line**: The line number where the change was made, if applicable. Omit if not relevant.
- **Summary of change**: A brief description of the change made, in as few words as needed to convey the change. Omit when the action and file convey enough information, such as `Created component "src/components/Header.tsx"`.

#### Workflow
1. On each run, the LLM reads the vibespec and the changelog file (`.vibespec/.vibespeclog`). If the file exceeds 1,000 lines, only read the last 1,000 lines and warn the user that older entries will be ignored.
2. It compares the desired state (vibespec) to the current state (codebase + changelog).
3. It determines and applies the necessary changes to reach the desired state.
4. It appends a new entry to the changelog file for each material change. If file does not exist, it creates it.
5. After applying changes, if the changelog file exceeds 5,000 lines, the LLM should:
  1. Ask the user if they wish to archive the older entries.
  2. If the user agrees, move all lines except the most recent 1,000 from `.vibespeclog` to a new file named `.archive-<timestamp>.vibespeclog` where `<timestamp>` is the current date and time in ISO 8601 format.

##### Notes
- Only the LLM should write to the changelog file (`.vibespeclog`). Users should not edit this file directly.
- The LLM should create the changelog file if it does not exist.
- If the codebase has changes not reflected in the changelog file, the LLM should warn the user and request confirmation before proceeding.
- If the changelog file contains unorthodox entries that do not follow the log structure, warn the user but continue with the code changes.

#### Example

```markdown
[2025-07-04T12:34:56Z] Created codebase: Initial generation of codebase based on vibespec
[2025-07-04T12:35:00Z] Created component: "src/pages/Home.tsx": Home page
[2025-07-04T12:35:05Z] Updated component: "src/components/Header.tsx": include a new logo
[2025-07-04T12:35:10Z] Created component: "src/components/Footer.tsx"
[2025-07-05T14:01:23Z] Created component: "src/components/CustomerTable.tsx": lists customers in a table format
[2025-07-05T14:02:10Z] Updated service: "src/services/CustomerService.ts": to use React Query
[2025-07-05T14:03:45Z] Deleted file: "src/components/OldCustomerList.tsx": Replaced by CustomerTable
[2025-07-05T14:04:12Z] Refactored component: "src/components/CustomerForm.tsx": split into smaller subcomponents
[2025-07-05T14:05:00Z] Fixed bug: "src/components/CustomerForm.tsx": Corrected email validation logic
[2025-07-05T14:06:30Z] Added test: "src/tests/components/CustomerTable.test.tsx" line 113: Function to test the delete button
[2025-07-05T14:07:15Z] Updated styles: "src/components/Header.tsx": Applied Tailwind CSS
[2025-07-05T14:10:00Z] Updated dependencies: Upgraded all React-related packages to v19+
```

### Source Control

The LLM should use source control (e.g., Git) to help determine changes for desired-state configuration.

- **Scenario 1:**  
  If the vibespec file has been modified but is not yet staged or committed, the LLM should use a diff between the working copy and the last committed version to determine what has changed. This enables the LLM to generate or update code based only on the recent edits to the vibespec file.

  > *Note: In the future, the LLM may support deeper analysis by scanning past commit histories to track and reason about changes made to the vibespec file over time.*

- **Scenario 2:**  
  If manual code edits have been made to the codebase, the LLM may in the future use diffs or commit history to detect and avoid overwriting those manual changes. For now, the LLM should warn the user if it detects unstaged or uncommitted changes in the codebase and request confirmation before proceeding.

  > *Note: Advanced handling of manual code edits and merge conflict resolution based on commit history is a future enhancement.*


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
