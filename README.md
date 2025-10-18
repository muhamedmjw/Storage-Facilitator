# VueWork - Team Tasks & Scheduling App

## Problem Statement
Small teams often struggle with project management due to complex or expensive tools that don't fit their needs. They need a lightweight, intuitive application that combines task management, scheduling, and collaboration features without overwhelming users with enterprise features they'll never use.

## Target Users
- Small teams (5-15 people)
- Startups and small businesses
- Project managers in small organizations
- Teams without dedicated project management resources

## Success Criteria
- Users can create and manage projects from start to finish
- Team members can track their assigned tasks efficiently
- Project progress is visible at a glance through the Kanban board
- Calendar view helps with resource planning and deadline management
- Average task completion time tracked and improving monthly
- User satisfaction score of 4/5 or higher

## User Stories

1. As a team lead, I want to create new projects with descriptions and deadlines so that my team knows what we're working on and when it's due.

2. As a team member, I want to view all my assigned tasks across projects in one place so I can prioritize my work efficiently.

3. As a project manager, I want to move tasks between status columns (To-Do/In-Progress/Done) so I can track progress visually.

4. As a team member, I want to add comments to tasks so I can clarify requirements or provide updates without scheduling a meeting.

5. As a team lead, I want to assign tasks to specific team members so everyone knows their responsibilities.

6. As a user, I want to filter tasks by label, assignee, or due date so I can focus on relevant information.

7. As a team member, I want to view a calendar of all project deadlines and task due dates so I can plan my work schedule.

8. As an admin, I want to manage user roles so I can control who has permission to create projects or modify settings.

9. As a stakeholder, I want to view basic analytics about project progress so I can report on team performance.

10. As a user, I want to receive notifications about tasks assigned to me or upcoming deadlines so I don't miss important information.

## Non-Goals

- Real-time chat functionality
- Advanced reporting and analytics
- Time tracking features
- Client billing or invoicing
- Gantt chart views
- Public API (for Milestone 1)
- Mobile native apps (though the web app will be responsive)

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/muhamedmjw/Web-Application-Milestone-Project
cd Web-Application-Milestone-Project
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint and fix code

## Tech Stack
- Vue 3 with Composition API
- TypeScript for type safety
- Vite for fast development
- Vue Router for navigation
- Pinia for state management
- Axios for API requests
- ESLint + Prettier for code quality

## Project Structure
```
src/
├── assets/          # Styles and static assets
├── components/      # Reusable Vue components
│   └── layout/      # Layout components (Header, Sidebar, Footer)
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
├── views/           # Page components
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## License
MIT