# **Car Rental System - Software Life Cycle Management**

## **Objective**

This project implements a comprehensive **Car Rental System** with separate interfaces for customers and rental agents. The system follows core Object-Oriented Programming principles and incorporates multiple design patterns to ensure maintainability, scalability, and reusability.

The project was developed using a systematic approach, including requirements analysis, UI/UX design with Figma, and implementation of design patterns. The team collaborated effectively using GitHub for version control and applied thorough API testing using Postman.

---

This project was developed as part of IFN636: Software Life Cycle Management course.

Team Members:
- Alex Yoo
- Hang Chi Lee
- Yen-Ling Liu

## **1. Real-World Application**

* The Car Rental System addresses common pain points in vehicle rental processes:
  * Customers forgetting pickup and return dates due to lack of reminders
  * Customers needing a channel to report issues like vehicle malfunction or lost items
  * Rental agents lacking centralized dashboard for real-time business insights
  * Need for efficient vehicle management

## **2. Project Structure**

```
carrentalsystem/
├── package.json          # Root package.json for project-wide scripts
├── frontend/            # React frontend application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/             # Node.js Express backend API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── server.js
│   └── package.json
└── README.md            # This file
```

## **3.Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/CarRentalManagementSystem/carrentalsystem.git
   cd carrentalsystem
   ```

2. Install dependencies for all parts of the application:
   ```bash
   npm run install-all
   ```


## **4. Core Features**

* **For Customers:**
  * Search and browse vehicles with filtering by type, fuel, brand
  * Book vehicles with specified rental duration
  * Receive automated pickup and return reminders
  * Cancel bookings when needed
  * Report issues to rental agents
  * Manage profile information

* **For Rental Agents:**
  * View dashboard with business analytics (revenue, rental status, customer counts)
  * Manage vehicle inventory (add, update, delete)
  * View and resolve customer issue reports
  * Monitor rental status and mark rentals as completed

## **5. Technology Stack**

### **Frontend:**
* React.js
* TailwindCSS
* Recharts (for data visualization)
* Material UI (cleaner UI components)
* dayjs (for formatting rental date and return date)
* lucide-react (for icons used in figma design)
* Various React libraries (axios, react-router-dom)

### **Backend:**
* Node.js + Express
* MongoDB (database)
* JWT for authentication
* Bcrypt for password encryption
* Mongoose for database modeling

## **5. Design Patterns Implemented**

* **Observer Pattern:** For notification system when issues are reported
* **Factory Pattern:** Creating different navigation components based on user role
* **Composite Pattern:** For generating structured vehicle card components
* **Chain of Responsibility:** Managing the booking flow process
* **Facade Pattern:** Simplifying complex dashboard data aggregation logics in the dashboard controller
* **Strategy Pattern:** For implementing different timeframe filtering strategies of dashboard

## **6. OOP Principles Applied**

* **Classes & Objects:** Implemented User, Vehicle, Rental, Issue, and Notification classes
* **Inheritance:** Navigation bars inherit from GeneralNavbar
* **Encapsulation:** Internal filtering logic hidden from component files
* **Polymorphism:** Different form classes implementing same methods with different behaviors

## **7. Authentication & Authorization**

* Role-based access control (customer vs agent)
* Secure password management
* JWT-based authentication

## **8. API Testing**

Link to postman API testing: 

* Thorough API testing performed using Postman
* Test cases include:
  * User authentication (login/logout)
  * Vehicle management operations
  * Rental submission and completion
  * Issue reporting and resolution
  * Notification delivery
  * Dashboard statistics fetching

### API Documentation : 

* Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/allName` - Get all user names
- `PUT /api/auth/profile` - Update user profile

* Vehicle Endpoints
- `GET /api/vehicles` - Get all available vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles/add` - Add a new vehicle (admin only)
- `PUT /api/vehicles/update/:id` - Update vehicle details (admin only)
- `DELETE /api/vehicles/delete/:id` - Delete a vehicle (admin only)

* Rental Endpoints
- `GET /api/rentals` - Get all user bookings
- `POST /api/rentals` - Create a new booking
- `PATCH /api/rentals/cancel/:id` - Cancel booking
- `PUT /api/rentals/:id` - Update booking (admin only)
- `DELETE /api/rentals/:id` - Delete booking details

* Issue Report Endpoints
- `GET /api/issues` - Get all issues (admin only)
- `POST /api/issues` - Report a new issue (customer)
- `PUT /api/issues/:id` - Update issue status (admin only)

* Notification Endpoints
- `GET /api/notification` - Get all notifications
- `POST /api/notification` - Create a notification

* Dashboard Endpoint
- `GET /api/dashboard/statistics` - Get all issues (admin only)


## **9. UI/UX Design**

Link to Figma production ready version: 

* Clean, intuitive interface designed with Figma
* Role-specific views for customers and agents
* Dashboard interface for agents with data visualization
* Consistent color scheme and typography
