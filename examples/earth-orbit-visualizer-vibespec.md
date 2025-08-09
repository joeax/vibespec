# Earth Orbit Visualizer

This document follows the vibespec format and outlines the technical requirements for the Earth Orbit Visualizer web application. The **Earth Orbit Visualizer** is a web application that visualizes Earth's orbit around the Sun in real time. It allows users to interactively explore the orbital mechanics of Earth.

## About
- version: 1
- author: Joe Agster, Patrick Agster
- last updated: 2025-08-05

## Specs
- type: web
- languages: TypeScript, JavaScript, CSS
- frameworks: vanilla JavaScript, three.js, vanilla CSS

### Dependencies
- three.js
- vite

## Requirements
- The application is displayed as a full-screen web application.
- The application must be responsive and adapt to different screen sizes and device orientations.
- Code should be modular and maintainable, using TypeScript for type safety.

## Features
- **Real-Time Visualization**: Displays Earth's orbit relative to the Sun in real time.
- **Single Page Application**: Built using JavaScript and CSS for a lightweight and fast user experience.
- **Responsive Design**: Optimized for all devices - desktop, tablet, and mobile, ensuring usability across different screen sizes.
- **Full-Page Canvas**: Utilizes HTML canvas and three.js to create a visually appealing and immersive experience that spans the full page.
- **Interactive Controls**:
  - **Rotation Control**: Users can rotate the orbital plane by mousing down or holding a finger on the canvas, then dragging.
  - **Time Control**: Users can drag on Earth to reverse or forward time, showing Earth at the selected moment.
  - **Custom Date/Time Selection**: Users can select specific dates and times to visualize Earth's position in its orbit.
- **Orbital Information**: The following information is displayed in a rounded box in the lower right corner:
  - Current date and time
  - Current orbital speed
  - Current orbital acceleration

## Data Model

### OrbitPoint
- An orbit point is represented as a position along the orbit around the Sun.
- Key properties of the orbit point include:
    - **DateTime**: The date and time of the orbit point.
    - **DistanceFromSun**: The distance from the Sun to Earth at that point in the orbit.
    - **OrbitalSpeed**: The speed of Earth at that point in its orbit.
    - **OrbitalAcceleration**: The acceleration of Earth at that point in its orbit.

<!-- 
  - Semi-major axis
  - Eccentricity
  - Inclination
  - Longitude of the ascending node
  - Argument of periapsis
-->

## Folder Structure
- `index.html`: The main HTML file that serves as the entry point for the application.
- `public/`: A directory containing public assets such as images and icons.
- `src/`: A directory containing TypeScript files for the application's logic.
- `src/main.ts`: The main TypeScript file that initializes the application.
- `src/orbit.ts`: Contains the logic for calculating and managing the orbit points.

## Setup
Scaffold the project with vite if it doesn't exist:
```bash
npm create vite@latest . --template vanilla-ts
```

## UI

### Layout
- The canvas will occupy the full viewport.
- If the viewport orientation is portrait, horizontal scrollbars will be added to allow for panning.
- The canvas background will be a midnight blue with a starry sky effect.

#### Canvas Layout
- The orbit ellipse is centered and should take up 75% of the canvas width.
- The Sun is positioned is positioned according to its position relative to Earth's orbit (slightly to the left of center since the perihelion is on the left).
- The perihelion will be on the leftmost side of the orbit and the aphelion will be on the rightmost side.
- The Sun and Earth are not to scale, but the orbit is to scale. The distance from the Sun to Earth will be represented by a dotted line with a label indicating the current distance.
- The default camera angle is top down, looking at the solar system from above.

#### Example
Refer to the image `sun-distances.png` for a visual reference of the UI layout and design. The Sun is represented as a yellow circle with rays, and the Earth is represented as an SVG image that can display any angle of the Earth. Notice how the orbit takes up 75% of the width of the image.

### Components

#### Header
- The header will contain the title "Earth Orbit Visualizer".
- Background is 90% transparent, allowing the starry sky to mostly show through.

##### Date
- In the top right corner will display the current date and time in UTC.
- If the user selects a specific date/time, a second date/time will be displayed underneath the current date/time.
- A date picker to change the orbital date/time.
- A button to reset to the current date/time.

#### Orbit Box
- The Orbit Box will appear in the bottom right, overlayed on top of the canvas. 
- The Orbit Box component displays the properties of Earth's orbit, including:
    - Distance from the Sun
    - Current orbital speed
    - Current orbital acceleration
- The background of the Orbit Box will be a 25% transparent light blue, allowing the starry sky to show through.

#### Orbital Properties

##### Labels
Along the orbit path, labels will be displayed for:
- Perihelion
- Aphelion
- Solstices with exact date/time for the current year
- Equinoxes with exact date/time for the current year

##### Dots
Display dots along the orbit path to indicate:
- Perihelion and Aphelion points (white)
- Solstices and Equinoxes (green, yellow, red, and blue respectively for spring, summer, fall, and winter)

##### Dashed Lines
Dashed lines will connect:
- The Sun to Earth, with a label indicating the distance from the Sun in both km and miles, using a medium font size. Example: "147.1 million km (91.4 million miles)"
- The Sun to the Perihelion and Aphelion points, with labels indicating the distance from the Sun in both km and miles, using a smaller font size.
- The Sun to the seasonal points (March Equinox, June Solstice, September Equinox, December Solstice), with labels indicating the distance from the Sun in both km and miles, using a smaller font size.

#### Earth Image
The Earth will be represented by an SVG image that can display any angle of the Earth. It should incorporate all angles of the Earth. When displaying in orbit, its face should be a real-time representation of the Earth as it rotates. The basis for this is in the  `./sun-distances.png` image.

#### Sun Image
The Sun will be represented by an SVG image. It will be a simple yellow circle with simple rays extending outward. It is static and not animated.

### Events

#### Drag 
- When the user drags the canvas horizontally, the orbit will rotate along the Y-axis.
- When the user drags the canvas vertically, the orbit will rotate along the X-axis.

## Implementation

### Modules

#### Orbit Module
- Contained in `orbit.ts`.
- Responsible for calculating the orbit points, including distance, speed, and acceleration.
- Use mkm (million kilometers) as the unit of measurement for distances.
- Code should be modularized in functions.
- Provide detailed comments around three.js interactions to explain the logic.
- Use TypeScript best practices and specify types for inputs and returns.

## Deployment
- Generate an SVG file for the Sun (sun.svg) and Earth (earth.svg) if they do not exist.
- The application should be deployable on any static file server.

## References
- The base image for the UI design is `./sun-distances.png`.

### External
- [three.js](https://threejs.org/): A JavaScript library for creating 3D graphics in the browser.
- [Time and Date](https://www.timeanddate.com/calendar/december-solstice.html): Information on solstices and equinoxes.
- [Wikipedia - Earth's Orbit](https://en.wikipedia.org/wiki/Earth%27s_orbit): General information about Earth's orbit and related concepts.
