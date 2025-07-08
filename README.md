# Vibespec

> **Software spec definition in the vibe coding era**  

Vibespec is a specification for describing a software application or system, optimized for an LLM for generating code in a consistent and repeatable way. Instead of ad hoc prompting through trial and error, you describe the software you want in one single file. Vibespecs are incredibly flexible and can be as simple or as complex as needed to fully describe the software system. 

## Problem Statement

Building a production-ready application through prompt iteration is cumbersome, chaotic, and non-deterministic, akin to developing an enterprise cloud solution using point and click deployment. As code generation tools and their underlying LLMs evolve, the need for a structured approach to describe software systems that can be generated in a repeatable and deterministic way becomes paramount.

Product requirements documents (PRDs) and software requirements documents (SRDs) are often too high-level and lack the detail needed for effective code generation. Vibespecs combine the best aspects of these documents with a structured format that is optimized for LLMs, enabling developers to describe software systems in a way that can be directly translated into code.

## Design Goals

- **LLM Optimized**: The specification should be designed to maximize the effectiveness of LLMs in generating code. 
- **Infinitely Flexible**: The specification can be as simple or as complex as needed to fully describe the software system.
- **Simple**: The specification should be easy to understand and use, even for those with limited technical expertise.
- **Repeatable**: The specification should allow for the generation of the same code from the same description, ensuring consistency and reliability.
- **Structured**: The specification should provide a clear structure for describing the software system, making it easier to understand and maintain.
- **Multimodal**: The specification should support various types of content, including text, images, code snippets, flow diagrams.

## Getting Started

### Load Instruction File

To get started with Vibespec, you need to load the instruction file named `vibespec-instructions.md` into your coding agent e.g. GitHub Copilot, Claude Code, etc. This file contains the definition of a vibespec and provides guidance on how to use it effectively. 

Validate that the instruction file is loaded correctly in your chat prompt:
```
Are the vibespec instructions loaded correctly?
```

You should get a response like:
```
Yes, the vibespec instructions are loaded correctly. The file vibespec-instructions.md is present in your workspace and contains detailed guidance on the structure, commands, validation, and change management for vibespec files. 
```

### A Basic Vibespec

Although you can (and should) add structured details to your Vibespec, a basic one can be as simple as describing your application in a few sentences. For example:

```markdown
# Tetris Clone

This is a vibespec for a Tetris clone that allows users to play the classic game in their web browser. The game should have a simple UI, support keyboard controls, and keep track of the score. It should be built using vanilla JavaScript and TypeScript.
```

### A More Detailed Vibespec

A more detailed vibespec can include sections for user stories, specifications, and domain-specific terms. For example:

```markdown
# Tetris Clone

This is a vibespec for a Tetris clone that allows users to play the classic game in their web browser. The game should have a simple UI, support keyboard controls, and keep track of the score. It should be built using vanilla JavaScript and TypeScript.

## Specs
- type: web
- frameworks: none
- languages: JavaScript, TypeScript

## Requirements
- The game should have a simple UI with a grid for the Tetris blocks.
- The game should support keyboard controls for moving and rotating the blocks.
- The game should keep track of the score and display it on the screen.
- The game should be responsive and work on different screen sizes.
```

### Validating the Vibespec

With the instruction file loaded, you can now validate your vibespec by prompting your coding agent:
```
Validate the vibespec.
```

### Simulating Code Generation

Once your vibespec is validated, you can simulate code generation by prompting your coding agent to simulate generating code based on the vibespec.
```
Simulate generating code for the Tetris clone based on the vibespec.
```

### Integrating with LLMs

To maximize the effectiveness of LLMs, you need to describe the vibespec specification to your coding agent to generate or modify the code. Once it understands the structure and purpose of the vibespec, it should be able to generate code correctly on the provided description. As you iterate on the vibespec, the agent will detect changes and apply those changes to the existing code.

### Context Windows

LLMs have a limited context window, which means they can only process a certain amount of text at a time. The vibespec instruction file instructs the LLM to read the vibespec in chunks.



### Changelog

When applying changes from a vibespec, the LLM will generate a changelog file named `.vibespeclog` that will track changes made to the codebase based on the vibespec. This file will include a summary of the changes, the date and time of the change, and any relevant details about the modifications.

If the changelog is missing this should be okay. The changelog acts as a sort of cache for the LLM to understand the changes made to the vibespec. If you are using a version control system, you can also use the commit history as a changelog.

**Note**: Verify that `.vibespeclog` is not being ignored in your source control, e.g. in your `.gitignore`.

#### Using Git Commit History

TBD

### GitHub Copilot

TBD, also
Cursor
Windsurf
Claude Code
OpenAI Codex


### Editing Code
The vibespec is a living, breathing doc, but that shouldn't stop you from writing or modifying the generated code. Keep in mind that vibe coding means not touching a line, so it is an expected practice to master crafting your vibespec to minimize the need for manual code changes. 


## Structure


A vibespec is structured as a markdown document with a specific format that includes a title, description, specification, and sections. The structure is designed to be flexible and can be adapted to fit the needs of the software system being described.


### Components

- **Title**: The title for the software system is the first line.
- **Description**: A brief description of the software system follows the title, providing an overview of its purpose and functionality.
  - **Vibespec Identification**: Within the description you must identify the document as being a vibespec. Example `This is a vibespec for a Tetris clone.`
- **Specification**: A bulleted-list of name/value pairs that describe the overall specification of the software system, such as application type, programming language, frameworks, and libraries.
-- **Sections**: Each section should be clearly defined and can include additional details about the software system, such as user stories, features, and technical requirements.

### Sections

In a vibespec, not all sections need to be defined. For example, if you are defining a backend service, you should not need a `User Stories` section. 

- **Domain**: This section describes the domain of the software system, including any specific jargon or domain-specific terms that are relevant.
- **User Stories**: This section outlines the user stories that describe how users will interact with
- **Specifications (or Specs)**: This section describes the core specifications of the software system. You can omit this section if needed (or small) and simply place this under the description at the top of the document.

### Subsections

Within each section, you can define subsections to provide more detailed information. Each Section has its own subsection structure. However, some subsections can be expressed as bulleted lists, while others may require more detailed descriptions.

As an example, let's take a closer look at the `Specs` section. Using the Tetris clone example, the `Specs` section can be omitted entirely and put in the description, like so:

```markdown
# Tetris Clone
...
- type: web
- frameworks: vanilla JavaScript, vanilla CSS
```

or, I can define a  `Specs` section and just comma delimit the frameworks for example:

```markdown
...
## Specs
- type: web
- frameworks: vanilla JavaScript, vanilla CSS
```

or, I want to break out frameworks into its own subsection and provide more complex details:

```markdown
## Specs
- type: web

### Frameworks
- vanilla JavaScript
- Tailwind CSS
- three.js v0.178.0+
```

## Artifacts

### Images
You can include images in your vibespec to provide visual context or diagrams related to the software system. Images can be included using standard markdown syntax.

### Embedded Content
Include diagrams, flowcharts, or other visual representations of the software system using embedded content. This can help clarify complex structures or workflows.

### MCP Servers
TBD

### Code Snippets
You can include code snippets in your vibespec to provide examples of specific functionalities or implementations. You can also point to external code repositories or files for more extensive code examples.


## Examples

- Tetris clone example
- Simple CRM web app example
- Figma MCP example
- Reddit clone example
- Full-stack web+API+database example


## Best Practices

- Start with a basic vibespec that describes your software system in a few sentences, add sections with more detail, and iterate.
- Ask the LLM to validate your vibespec and describe the changes it will make before implementing them. This will help you troubleshoot your vibespec (i.e. if context window is exceeded) before executing on it.
- Define jargon and domain-specific terms in the glossary of the `Domain `section. Place the `Domain` section at the top of the document, immediately after the description.
- The sections are defined to have some overlap by design, however it is best to avoid repeating information. Use intra-document links to reference other sections or subsections when needed.
- Split complex systems into multiple vibespecs using references, each focusing on a specific aspect of the system. This allows for better organization and easier management of the specifications.
- Place all your vibespec files in a common folder e.g. `docs/`. This allows you to easily reference other vibespecs in your project.
- Commit code changes by the LLM often. Better yet, commit vibespec changes and code changes together. This allows the LLM to understand the context of the changes better.
- Although you can put special code instructions in the vibespec, it is best to keep the vibespec focused on the software system and its specifications. Use your coding agent's instruction files/system prompts to outline coding conventions. For example, for GitHub Copilot, use the `.github/copilot-instructions.md`.

## Extending

Extending the vibespec specification is possible by adding new sections, subsections, or properties to existing sections. This allows you to customize the vibespec to fit the specific needs of your team or project.

Update the `vibespec-instructions.md` file.


## Exercise

### 1 - Ask ChatGPT or Claude to generate a SRD for a Reddit clone.

```
Generate a sample, simplified SRD for Reddit. 
Assume I am building a Reddit clone for the first time so this is version 1.0. 
Also assume there is only a web version for now.
```

### 2 - Convert the SRD into a Vibespec

First, think about what frontend framework you want to use i.e. React, Vue, Svelte, etc. Then, convert the SRD into a vibespec by following the structure outlined above.

```
Convert the SRD into a vibespec for a Reddit clone. A vibespec is a specification for describing a software application or system.
I have attached the vibespec definition.
```

### 3 - Ask the LLM to generate code from the Vibespec

Open Claude Code. TBD


## FAQ

### Why can I just write an SRD and have the LLM generate code from it?
An SRD (Software Requirements Document) is typically a high-level document that outlines the requirements and functionalities of a software system. While it provides a good foundation, it often lacks the detailed structure and specific instructions needed for an LLM to generate code effectively. Vibespec aims to bridge this gap by providing a more structured and detailed specification that can be directly translated into code.

### Isn't using a vibespec to build a software system like going back to waterfall-based development?
Not necessarily. While Vibespec does provide a structured approach, it is designed to be flexible and iterative. It allows for continuous refinement and adaptation of the software system as requirements evolve, similar to agile methodologies. The key difference is that Vibespec is optimized for LLMs, enabling more efficient code generation and reducing the need for extensive manual coding.