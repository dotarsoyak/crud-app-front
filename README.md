<div align="center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular Logo" width="100"/>
  <h1 style="color:#dd0031; font-family:Arial, sans-serif; margin-top: 0.5em;">
  </h1>
  <p>
    <a target="_blank" href="https://dotarsoyak.github.io/crud-app-front/home"><img src="https://img.shields.io/badge/CRUD-Homepage-blue?style=flat-square" alt="Homepage"/></a>
    <a target="_blank" href="https://developer.mozilla.org/es/docs/Web/API/Window/localStorage"><img src="https://img.shields.io/badge/LocalStorage-Enabled-green?style=flat-square" alt="LocalStorage"/></a>
    <a target="_blank" href="https://v16.angular.io/docs"><img alt="Angular-16" src="https://img.shields.io/badge/Angular-Framework-dd0031?style=flat-square&logo=angular&logoColor=white"/></a>
  </p>
</div>

# CRUD App Front 

## Overview

This project is an Angular-based front-end application designed to manage employee insurance policies. It provides a user-friendly interface for creating, listing, viewing, and deleting insurance policies associated with employees. The application simulates backend operations using the browser's localStorage, making it easy to test and demonstrate CRUD (Create, Read, Update, Delete) operations without a real backend.

## Approach

- **Component-Based Architecture:**  
  The application is structured using Angular components for modularity and maintainability. Each feature (such as listing policies, creating a new policy, and viewing policy details) is encapsulated in its own component.

- **LocalStorage as Data Source:**  
  Instead of connecting to a backend API, the app uses the browser's localStorage to persist and retrieve data. This allows for rapid prototyping and easy testing without server dependencies.

- **Material Design:**  
  Angular Material components are used for dialogs, tables, buttons, and forms, providing a modern and responsive user interface.

- **Dialog-Driven Actions:**  
  Actions like deleting a policy or viewing policy details are handled through modal dialogs, improving user experience and keeping the UI clean.

- **TypeScript Interfaces:**  
  The data models (such as `PolizaModelResponse`, `EmpleadoModelResponse`, and `DetalleArticuloModelResponse`) are strictly typed using TypeScript interfaces, ensuring type safety and clarity throughout the codebase.

## Features

- **Employee Policy Management:**  
  - List all policies for a selected employee.
  - Create new policies with detailed items (SKU, quantity).
  - View detailed information for each policy.
  - Delete policies with confirmation dialogs.

- **Reusable Services:**  
  Angular services handle all data operations, abstracting the logic for interacting with localStorage and providing observables for reactive UI updates.

- **Routing and Navigation:**  
  The app uses Angular's routing to navigate between different views and components.

## Usage

1. **Install dependencies:**  
   Run `npm install` to install all required packages.

2. **Run the application:**  
   Use `ng serve` to start the development server.  
   Open your browser at `http://localhost:4200`.

3. **Interact with the UI:**  
   - Add, view, and delete employee policies.
   - All changes are stored in your browser's localStorage.

## Purpose

This project serves as a demonstration of Angular best practices for CRUD operations, component communication, and state management using localStorage. It is ideal for learning, prototyping, or as a foundation for more complex applications that may later integrate with real backend APIs.

---
```# CRUD App Front

## Overview

This project is an Angular-based front-end application designed to manage employee insurance policies. It provides a user-friendly interface for creating, listing, viewing, and deleting insurance policies associated with employees. The application simulates backend operations using the browser's localStorage, making it easy to test and demonstrate CRUD (Create, Read, Update, Delete) operations without a real backend.

## Approach

- **Component-Based Architecture:**  
  The application is structured using Angular components for modularity and maintainability. Each feature (such as listing policies, creating a new policy, and viewing policy details) is encapsulated in its own component.

- **LocalStorage as Data Source:**  
  Instead of connecting to a backend API, the app uses the browser's localStorage to persist and retrieve data. This allows for rapid prototyping and easy testing without server dependencies.

- **Material Design:**  
  Angular Material components are used for dialogs, tables, buttons, and forms, providing a modern and responsive user interface.

- **Dialog-Driven Actions:**  
  Actions like deleting a policy or viewing policy details are handled through modal dialogs, improving user experience and keeping the UI clean.

- **TypeScript Interfaces:**  
  The data models (such as `PolizaModelResponse`, `EmpleadoModelResponse`, and `DetalleArticuloModelResponse`) are strictly typed using TypeScript interfaces, ensuring type safety and clarity throughout the codebase.

## Features

- **Employee Policy Management:**  
  - List all policies for a selected employee.
  - Create new policies with detailed items (SKU, quantity).
  - View detailed information for each policy.
  - Delete policies with confirmation dialogs.

- **Reusable Services:**  
  Angular services handle all data operations, abstracting the logic for interacting with localStorage and providing observables for reactive UI updates.

- **Routing and Navigation:**  
  The app uses Angular's routing to navigate between different views and components.

## Usage

1. **Install dependencies:**  
   Run `npm install` to install all required packages.

2. **Run the application:**  
   Use `ng serve` to start the development server.  
   Open your browser at `http://localhost:4200`.

3. **Interact with the UI:**  
   - Add, view, and delete employee policies.
   - All changes are stored in your browser's localStorage.

## Purpose

This project serves as a demonstration of Angular best practices for CRUD operations, component communication, and state management using localStorage. It is ideal for learning, prototyping, or as a foundation for more complex applications that may later integrate with real backend APIs.