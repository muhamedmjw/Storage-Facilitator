# VueWork - Team Tasks & Scheduling App

## Problem Statement
Small teams often struggle with project management due to complex or expensive tools that don't fit their needs. They need a lightweight, intuitive application that combines task management, scheduling, and collaboration features without overwhelming users with enterprise features they'll never use.

## Target Users
- Small teams (5-20 people)
- Startups and small businesses
- Remote/distributed teams
- Project managers in small organizations
- Teams without dedicated project management resources

## Success Criteria
- Users can create and manage projects from start to finish
- Team members can track their assigned tasks efficiently
- Project progress is visible at a glance through the Kanban board
- Calendar view helps with resource planning and deadline management
- Reduced meeting time needed for status updates
- 90% of team members log in at least 3 times per week

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
- Real-time chat functionality (teams can use existing tools like Slack)
- Advanced reporting and analytics (beyond basic completion trends)
- Time tracking features
- Client billing or invoicing
- Gantt chart views
- Public API
- Mobile native apps (though the web app will be responsive)

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
1. Clone the repository
```
git clone https://github.com/yourusername/vuework.git
cd vuework
```

2. Install dependencies
```
npm install
# or
yarn
```

3. Start the development server
```
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser

## Tech Stack
- Vue 3 with Composition API
- TypeScript for type safety
- Vite for fast development
- Vue Router for navigation
- Pinia for state management
- Axios for API requests
- ESLint + Prettier for code quality