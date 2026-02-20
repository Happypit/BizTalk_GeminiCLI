# Product Requirements Document (PRD) - BizTone Converter

## 1. Introduction

### 1.1 Project Name
BizTone Converter - Business Tone Automatic Conversion Solution

### 1.2 Background and Necessity
The modern work environment requires appropriate communication methods depending on various stakeholders (supervisors, colleagues, clients). Employees who are new or unfamiliar with business communication often struggle to use the appropriate tone. This project aims to solve these problems and provide an automated solution to maintain consistent business communication quality and save time.

### 1.3 Goals
*   Convert the user's everyday language into a professional tone suitable for business.
*   Provide customized conversions tailored to the target audience (supervisor/colleague/client).
*   Ensure easy accessibility through an intuitive web interface.
*   Enhance user satisfaction by providing fast response times (average within 3 seconds) and a stable service.

### 1.4 Target Audience
*   New and junior employees in a corporate setting.
*   Employees who have difficulties with business communication.
*   Managers who need to communicate with multiple stakeholders.
*   Sales/CS representatives who require formal communication with external clients.

## 2. Features and Functionality

### 2.1 Core Features
*   **Customized Conversion by Target**: When the user selects a target from 'Supervisor', 'Cross-functional Colleague', or 'Client', the text is converted into a tone appropriate for each audience (Supervisor: honorifics/formal, Colleague: neutral formal, Client: official and polite).
*   **Real-time Conversion Processing**: Provides immediate conversion results, on average within 3 seconds of user input.
*   **Conversion History Comparison**: Supports learning by displaying the original and converted text side-by-side.
*   **Result Copy Function**: Provides a feature to copy the converted text to the clipboard with a single click.
*   **Responsive Design**: Delivers an optimized screen and user experience across various devices such as desktops, tablets, and mobiles.

### 2.2 User Scenarios

#### Scenario 1: New Employee Composing a Report Message to a Supervisor
*   **Situation**: A new employee needs to report a project delay to their supervisor.
*   **Problem**: They are unsure how to convey the message politely.
*   **Solution**: The user inputs "The project might be a bit late" and selects 'Supervisor' as the target. The system converts it to "The project schedule is expected to be slightly delayed. We will do our best to complete it as soon as possible."

#### Scenario 2: Requesting Collaboration with Another Team
*   **Situation**: A manager from Team B needs to request data from Team C.
*   **Problem**: A friendly tone is needed while maintaining an appropriate level of formality.
*   **Solution**: The user inputs "Can you send over this data?" and selects 'Cross-functional Colleague' as the target. The system converts it to "We would appreciate it if you could share the relevant data for our collaboration. It would be a great help if you could send it to us within today."

## 3. System Architecture

### 3.1 Technical Stack

#### Frontend
*   **HTML5**: Structural markup using semantic tags.
*   **CSS3**: Responsive layout using Flexbox/Grid, theme management with CSS variables.
*   **JavaScript (ES6+)**: Asynchronous communication via Fetch API, DOM manipulation, event handling.

#### Backend
*   **Python 3.1.x**: A stable version of the Python environment.
*   **Flask 2.3.x**: Lightweight web framework, providing RESTful API endpoints.
*   **Flask-CORS**: Handling Cross-Origin Resource Sharing (CORS) requests.
*   **python-dotenv**: Environment variable management.

#### AI/ML Integration
*   **Groq AI API**: Natural language conversion processing using the Groq model.

#### Deployment Environment
*   **Git Repository (GitHub)**: Source code version control and collaboration.
*   **Vercel**: Static file hosting and serverless function deployment platform.

### 3.2 System Diagram - Conceptual
```
[User Browser]
       ↓ (HTML/CSS/JS)
[Frontend (Web Application)]
       ↓ (HTTP POST/GET Request)
[Flask Backend API Server]
       ↓ (API Call)
[Groq AI API Service]
       ↓ (Process Response)
[Flask Backend API Server]
       ↓ (Return Response)
[Frontend (Web Application)]
       ↓ (Display Result)
[User Browser]
```

**Component Description**:
1.  **Client Layer**: Provides a responsive web interface to the user.
2.  **API Gateway**: A Flask-based REST API server that handles client requests and communicates with the AI service.
3.  **AI Processing Layer**: Performs the actual natural language conversion using the Groq API.
4.  **Deployment Infrastructure**: Deploys the frontend and backend in a serverless architecture using Vercel.

### 3.3 Data Flow
1.  **User Input**: Collects the original text and the target audience selection (supervisor, colleague, client) via an HTML form.
2.  **Frontend Processing**: Validates the input using JavaScript and serializes the data into JSON format.
3.  **API Request**: Sends a POST request from the frontend to the Flask backend's `/api/convert` endpoint using the Fetch API.
4.  **Backend Processing**: The Flask application constructs the parameters for the Groq API call (original text, prompt based on the target).
5.  **AI Conversion**: Sends the constructed parameters and prompt to the Groq AI API and receives the converted text response.
6.  **Response Return**: Returns the converted text to the client in JSON format.
7.  **Result Display**: JavaScript parses the received JSON response and dynamically renders the conversion result on the screen.

## 4. Detailed Feature Description

### 4.1 Input Interface
*   **Intuitive Form Design**: Designed to allow checking all inputs and results on a single page.
*   **Target Selection Dropdown**: Provides a dropdown menu to select one of 'Supervisor', 'Cross-functional Colleague', or 'Client', with 'Supervisor' as the default.
*   **Text Input Area**: Provides a multi-line input field for the user to enter the original text. A maximum of 500 characters is allowed, and the current character count is displayed in real-time.
*   **Input Guide**: Provides tooltips with recommended input examples for each target to help user understanding.
*   **Accessibility Consideration**: Improves accessibility by including ARIA labels and supporting keyboard navigation.

### 4.2 Tone Conversion Engine
*   **Groq API Prompt Engineering**: Designs and sends optimized system prompts for each target (supervisor, colleague, client) to the Groq API.
    *   **Supervisor**: "Please convert the following sentence into a formal and respectful tone suitable for a supervisor..."
    *   **Colleague**: "Please convert the following sentence into a neutral but polite business tone suitable for a cross-functional colleague..."
    *   **Client**: "Please convert the following sentence into a formal and polite business tone suitable for a client..."
*   **Error Handling**: In case of a Groq API call failure, it displays a user-friendly error message and provides a retry option.
*   **Logging System**: Records logs for conversion requests but excludes personal information, collecting only the information necessary for service operation and improvement.

### 4.3 Output Interface
*   **Dual Panel Layout**: Visually separates the original text on the left and the conversion result on the right.
*   **Morpheme Highlighting**: Highlights major changes (words, phrases) compared to the original to help the user easily recognize and learn from the conversion. (Optional feature, to be decided after considering technical difficulty).
*   **Result Copy Button**: Provides a button to copy the converted text to the clipboard, with visual feedback for success/failure.
*   **Additional Options (Feedback)**: Provides a feature to collect user feedback on the conversion results (e.g., 'Helpful'/'Not Helpful') to be used for service improvement.
*   **Responsive Display**: In a mobile environment, the dual-panel layout automatically switches to a vertical stack layout to ensure readability.

## 5. Project Structure

The project is managed with a monorepo structure where the frontend and backend are separated.

```
.
├── .github/                       # GitHub Actions (CI/CD workflows)
│   └── workflows/
│       └── main.yml               # CI/CD pipeline definition
├── src/
│   ├── frontend/                  # Frontend application source code
│   │   ├── public/                # Static files (index.html, favicon, etc.)
│   │   ├── src/                   # React or Vanilla JS/CSS source
│   │   │   ├── components/        # Reusable UI components
│   │   │   ├── styles/            # Global and component-scoped CSS
│   │   │   └── main.js            # Frontend entry point
│   │   ├── package.json           # Frontend dependencies and scripts
│   │   └── .env.example           # Frontend environment variable examples
│   └── backend/                   # Flask backend application source code
│       ├── app.py                 # Flask application entry point
│       ├── routes.py              # API endpoint definitions
│       ├── services/              # Business logic (e.g., Groq AI API integration)
│       ├── config.py              # Backend configuration (logging, API key management, etc.)
│       ├── requirements.txt       # Python dependencies
│       └── .env.example           # Backend environment variable examples
├── .gitignore                     # List of files to be excluded from Git version control
├── PRD.md                         # Product Requirements Document (Korean)
├── README.md                      # Project overview and setup guide
└── vercel.json                    # Vercel deployment configuration file
```

## 6. Development and Deployment Plan

### 6.1 Development Phases
1.  **Phase 1: Basic UI Implementation**
    *   Design and implement HTML5 semantic structure.
    *   Implement responsive layout using CSS3 (Flexbox/Grid).
    *   Develop basic interactions using JavaScript (DOM manipulation, event handling).
    *   Implement temporary storage for user input using local storage.
2.  **Phase 2: Flask Backend Server Setup**
    *   Design and configure the basic structure of the Flask application.
    *   Design and implement REST API endpoints (e.g., `/api/convert`, `/health`).
    *   Implement CORS settings and basic error handling logic.
    *   Set up a local development server.
3.  **Phase 3: Groq AI API Integration**
    *   Implement Groq API authentication and call logic.
    *   Optimize prompt templates for each target audience.
    *   Complete API response parsing and error handling logic.
    *   Implement request limiting and rate-limiting management.
4.  **Phase 4: Integration Testing and Debugging**
    *   Perform integration tests between frontend and backend.
    *   Create and verify test cases for various inputs.
5.  **Phase 5: Vercel Deployment and Optimization**
    *   Configure the Vercel project.
    *   Securely configure environment variables (e.g., API keys).

### 6.2 Deployment Strategy
*   **Git Version Control Strategy**:
    *   Apply a `main` (production), `develop`, and `feature` branch strategy.
    *   Mandate code reviews through Pull Requests to maintain code quality.
    *   Apply a meaningful commit message convention.
*   **Vercel CI/CD Automation**:
    *   Link the GitHub repository with the Vercel project.
    *   Trigger automatic deployment on push to the `main` branch.
    *   Provide a preview deployment for testing during development.
    *   Manage variables separately for each environment (production, preview).
*   **Environment Variable Management**:
    *   Manage sensitive information like API keys as Vercel environment variables.
    *   Set up server-side only access so that the frontend cannot access them.
