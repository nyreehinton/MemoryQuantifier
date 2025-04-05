# Memory Quantifier Project Setup Guide

## Project Overview
Memory Quantifier is a full-stack web application built with TypeScript, React, Express, and PostgreSQL. The application helps track and manage adverse actions, credit reports, damages, tasks, and activities.

## Project Structure
```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared types and utilities
├── attached_assets/  # Static assets
├── migrations/       # Database migrations
└── project-setup/    # Project documentation
```

## Technology Stack
- **Frontend**: React with Vite, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Type Safety**: TypeScript
- **API**: RESTful with WebSocket support

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL 16
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```
4. Run database migrations:
   ```bash
   npm run db:push
   ```

### Development
Start the development server:
```bash
npm run dev
```
The server will run on port 8080 by default.

## Data Models

### Users
Basic user authentication system with username/password.

### Adverse Actions
Track credit-related adverse actions with details including:
- Document source and index
- Sender and recipient information
- Action type and details
- Credit report agency information
- Credit score details

### Credit Reports
Manage credit report requests and status:
- Report need tracking
- Credit reporting agency (CRA) information
- Status tracking (Outstanding, Requested, Satisfied, etc.)
- Document linking

### Damages
Track different types of damages:
- Pecuniary damages (payments, costs, fees, deposits)
- Non-pecuniary damages (emotional distress, reputational harm)
- Document requirements and verification
- Claimed values and status

### Tasks
Manage project-related tasks:
- Priority levels (High, Medium, Low)
- Status tracking (To Do, In Progress, Complete)
- Due dates and completion tracking
- Related item linking

### Activities
Log system activities:
- Activity types (Added, Updated, Created, etc.)
- Timestamps
- Related item references
- Detailed descriptions

## Adding Data

### 1. Adverse Actions
Add adverse actions through the API:
- Required fields: document_index, document_source, sender_name, recipient_name, date, action_type, reasons
- Optional fields: addresses, email, credit report details

Example:
```typescript
const adverseAction = {
  document_index: 1,
  document_source: "Credit Report",
  sender_name: "Bank XYZ",
  recipient_name: "John Doe",
  date: "2024-04-05",
  action_type: "Credit Limit Reduction",
  reasons: ["Payment History", "Credit Utilization"],
  credit_report_agency: "Experian"
};
```

### 2. Credit Reports
Create credit report requests:
- Required fields: report_need_id, cra, date_range, reason_needed, status
- Link documents and update status as needed

Example:
```typescript
const creditReport = {
  report_need_id: "CR001",
  cra: "Experian",
  date_range: "2023-04 to 2024-04",
  reason_needed: "Verify Credit Score",
  status: "Requested",
  linked_docs: [1, 2]
};
```

### 3. Damages
Document damages with:
- Required fields: id, title, category, status, description
- Add required documents and verification status
- Track claimed values and dates

Example:
```typescript
const damage = {
  id: "DMG001",
  title: "Increased Interest Rate",
  category: "PEC-COST",
  status: "Verified",
  description: "Additional interest charges due to credit limit reduction",
  claimed_value: 500.00,
  required_documents: [
    {
      doc_id: "DOC001",
      name: "Interest Rate Statement",
      status: "Received"
    }
  ]
};
```

### 4. Tasks
Create tasks to track work items:
- Required fields: id, title, description, priority, status, due_date
- Optional: related item references
- Update status as work progresses

Example:
```typescript
const task = {
  id: "TSK001",
  title: "Request Credit Report",
  description: "Submit request for updated credit report",
  priority: "High",
  status: "To Do",
  due_date: "2024-04-12",
  related_item: "CR001"
};
```

### 5. Activities
Activities are automatically logged for most system actions, but can also be manually created:
- Required fields: id, type, description, details, timestamp
- Optional: related item reference

Example:
```typescript
const activity = {
  id: "ACT001",
  type: "Created",
  description: "New credit report request",
  details: "Submitted request to Experian",
  timestamp: "2024-04-05T10:30:00Z",
  related_item: "CR001"
};
```

## Development Guidelines

### Code Organization
- Keep shared types in `shared/` directory
- Place API routes in `server/routes/`
- Frontend components go in `client/components/`
- Use TypeScript for type safety

### Database Operations
- Use Drizzle ORM for database operations
- Create migrations for schema changes
- Validate data using Zod schemas

### Error Handling
- Use the global error handler in Express
- Log errors appropriately
- Return proper HTTP status codes

### Security
- Use environment variables for sensitive data
- Implement proper authentication
- Validate user input
- Follow security best practices

## Troubleshooting

### Common Issues
1. Port already in use:
   - Check for other processes using port 8080
   - Kill conflicting processes or change port

2. Database connection issues:
   - Verify DATABASE_URL environment variable
   - Check PostgreSQL service status
   - Verify database credentials

3. TypeScript errors:
   - Run `npm run check` to verify types
   - Update type definitions as needed

### Getting Help
- Check the error logs
- Review the documentation
- Contact the development team

## Deployment
The application can be deployed using the following methods:
1. Traditional hosting:
   - Build frontend: `npm run build`
   - Start production server: `npm run start`

2. Container deployment:
   - Use provided configuration
   - Set environment variables
   - Ensure database connectivity