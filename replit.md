# Overview

ProConnect is a professional networking web application built as a LinkedIn-inspired social platform. The application enables users to create profiles, share posts, and connect with other professionals. It features a modern React frontend with a Node.js/Express backend, utilizing Firebase for authentication and PostgreSQL for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## August 2, 2025 - Authentication System Complete
- Successfully implemented Firebase Authentication with email/password signup and login
- Fixed sign-in issues caused by in-memory storage resets
- Added automatic user profile creation from Firebase data during authentication
- Resolved TypeScript errors in authentication middleware
- Authentication system now fully functional with proper error handling

# System Architecture

## Frontend Architecture
The client-side application is built with React and TypeScript, using Vite as the build tool. The architecture follows a component-based approach with:
- **UI Framework**: Radix UI components with shadcn/ui styling system for consistent design
- **Styling**: Tailwind CSS with custom LinkedIn-inspired color scheme and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Firebase Authentication SDK integrated with custom auth hooks

The application uses a three-column layout pattern typical of social media platforms, with navigation header, main content feed, and sidebar components. Component structure is organized with reusable UI components, page components, and custom hooks for business logic.

## Backend Architecture
The server follows a RESTful API pattern built with Express.js:
- **Framework**: Express.js with TypeScript for type safety
- **Authentication**: Firebase Admin SDK for token verification
- **API Design**: Route-based organization with middleware for authentication
- **Development**: Vite integration for hot module replacement in development
- **Storage Layer**: Abstracted storage interface allowing for both in-memory and database implementations

The server implements a repository pattern through the storage interface, enabling easy switching between different data persistence strategies.

## Data Storage Solutions
The application uses a dual-storage approach:
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for rapid development and testing
- **Connection**: Neon database service for cloud PostgreSQL hosting

The database schema includes users and posts tables with proper relationships and indexing. The storage abstraction allows the application to run with either persistent database storage or in-memory storage for development.

## Authentication and Authorization
Authentication is handled through Firebase Authentication:
- **Client Authentication**: Firebase Auth SDK with email/password authentication
- **Server Verification**: Firebase Admin SDK verifies JWT tokens on protected routes
- **User Management**: Custom user profiles stored in PostgreSQL linked to Firebase UIDs
- **Session Management**: JWT tokens passed via Authorization headers
- **Route Protection**: Middleware-based authentication checks for API endpoints

The system separates Firebase authentication from application user data, allowing for extended user profiles while leveraging Firebase's robust authentication infrastructure.

## External Dependencies

### Core Technologies
- **Frontend**: React 18, TypeScript, Vite for build tooling
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM and Drizzle Kit
- **Authentication**: Firebase Authentication and Admin SDK

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation

### Development and Deployment
- **Database Hosting**: Neon serverless PostgreSQL
- **Development**: Replit platform integration with cartographer plugin
- **Date Handling**: date-fns for date formatting and manipulation
- **Build Tools**: ESBuild for production bundling