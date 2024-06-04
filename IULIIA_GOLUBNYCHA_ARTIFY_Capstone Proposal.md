

# Project Title

**Artifý**

## Overview

**What is your app?**  
Artifý is a web application that educates users about various art styles and their history. It also features a basic AI tool that generates artwork based on the chosen art style, allowing users to explore and create in the styles they learn about.

### Problem

**Why is your app needed?**  
Art enthusiasts and students often seek to learn about different art styles and techniques, but accessing comprehensive and interactive resources can be challenging. This app addresses the need for an engaging educational platform that combines learning with creativity.

### User Profile

**Who will use your app?**  
- Art students and educators
- Art enthusiasts and hobbyists
- Artists looking to explore new styles and techniques
- Anyone interested in learning about art history

**How will they use it?**  
Users will explore various art styles and their histories and use the AI tool to generate basic artwork in the styles they learn about.

### Features

1. **Explore Art Styles:** Browse and learn about different art styles, their history, and key characteristics.
2. **Basic Artwork Generation:** Create basic artwork based on chosen art styles using OpenAI API.

## Implementation

### Tech Stack

- **Front-end:** React, Vite, Sass
- **Back-end:** Node.js, Express
- **API Requests:** Axios
- **Hosting:** Heroku (Back-end), Netlify (Front-end)

### APIs

- **OpenAI API:** To generate artwork based on user input.
  - [OpenAI API](https://platform.openai.com/docs/guides/images)

- **Art Styles API:**
  - **Metropolitan Museum of Art Collection API:**
    - Provides access to a vast collection of artwork data, including detailed metadata about art styles, artists, and artworks.
    - [Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)

  - **Harvard Art Museums API:**
    - Offers access to JSON-formatted data about the museum’s collections, including objects, people, exhibitions, publications, and galleries.
    - [Harvard Art Museums API](https://harvardartmuseums.org/collections/api)

  - **Art Institute of Chicago API:**
    - Provides access to all their public data, including detailed information on their collections.
    - [Art Institute of Chicago API](https://www.artic.edu/open-access/public-api)

### Sitemap

- **Home:** Overview of the app.
- **Explore Styles:** Interface to browse and learn about different art styles using the chosen art styles API.
- **Generate Artwork:** Interface to select an art style, input keywords, and generate artwork using the OpenAI API.

### Mockups

#### Home Page (Sublime Art Escapes)
- **Subheading:** Sublime Art Escapes
- **Body Text:** "Uncover the richness of art styles and history. Let our AI help you create stunning artworks inspired by the great masters."
- **Button:** **[Discover Now]**
- **Right Upper Corner:**
  - **Explore Art**
  - **Generative Artwork**
- **Stats (Underneath Discover Now Button):**
  - Explore 100+ Art Styles
  - Create Your Masterpiece with AI

#### Discover Now Page (Discover Art)
- **Heading:** DISCOVER ARTISTS
- **Search Bar:** "Search for art styles, artists, and their works..."
- **Search Button**
- **Found Art Section:**
  - Placeholder 1: Image of Artwork, Title of Artwork, Artist Name, Brief Description or Period/Style
  - Placeholder 2: Image of Artwork, Title of Artwork, Artist Name, Brief Description or Period/Style
  - Placeholder 3: Image of Artwork, Title of Artwork, Artist Name, Brief Description or Period/Style

#### Generative AI Page (Create Your Masterpiece)
- **Heading:** Create Your Masterpiece
- **Instruction Section:** "Select an art style, provide keywords or upload an image, and let our AI generate a unique artwork for you."
- **Form Section:**
  - Select Art Style: Dropdown menu for art styles
  - Input Keywords: Text input for keywords
  - Upload Image (Optional): File input for images
  - Generate Button: **[Generate Artwork]**
- **Generated Artwork Section:**
  - Loading Indicator: Spinner or progress bar during generation
  - Artwork Display: Generated artwork shown below with options to download or share

### Endpoints

- **/api/artstyles:** GET - Retrieve information about different art styles.
  - **Response:** List of art styles
- **/api/openai/art:** POST - Generate artwork using OpenAI API.
  - **Parameters:** styleId, keywords, parameters
  - **Response:** Generated artwork details

## Roadmap

### Day 1: Project Setup and Initial Development
- **Project Setup:**
  - Set up the project repository and make the initial commit.
  - Set up the development environment.
- **Basic UI:**
  - Create a basic UI structure for the Home page.
  - Implement basic navigation between pages (Home, Explore Styles, Generate Artwork).

### Days 2-3: Explore Art Styles Feature
- **Explore Styles Page:**
  - Design and implement the UI for the Explore Styles page.
  - Integrate the selected art styles API (e.g., Met Museum API) to fetch and display art styles with their history and key characteristics.
- **Styling:**
  - Apply CSS/Sass to style the Explore Styles page.

### Days 4-5: Artwork Generation Feature
- **Generate Artwork Page:**
  - Design and implement the UI for the Generate Artwork page.
  - Integrate the OpenAI API for generating artwork based on selected art styles and user input.
  - Provide options for users to input keywords and select parameters.
- **Artwork Display:**
  - Display the generated artwork on the page.
  - Implement loading indicators and error handling.

### Day 6: Integration and Testing
- **Integration:**
  - Ensure smooth navigation and data flow between the Explore Styles and Generate Artwork pages.
  - Integrate the front-end and back-end APIs.
- **Testing:**
  - Test the application for functionality and fix any bugs.
  - Conduct user testing to ensure the UI is intuitive and user-friendly.

### Day 7: Finalization and Deployment
- **Final Touches:**
  - Apply final styling adjustments and ensure responsiveness.
  - Optimize the application for performance.
- **Deployment:**
  - Deploy the back-end to Heroku.
  - Deploy the front-end to Netlify.
- **Documentation:**
  - Finalize the documentation, including a README file with instructions on how to use the app.
  - Prepare for the presentation.

## Nice-to-haves

- **User Authentication:** Secure login and user profile management.
- **Save Artworks:** Save generated artworks and organize them within the app.
- **Hosting:** Host the app on a dedicated server.
- **Social Sharing:** Share artworks on social media platforms.

