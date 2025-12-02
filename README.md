# 🚀 NestJS CQRS & Saga Pattern Implementation

A professional, production-ready example of how to implement **CQRS** (Command Query Responsibility Segregation) and the **Saga Pattern** in NestJS to handle distributed transactions and complex workflows.

This repository demonstrates a real-world **Order Processing System** where data consistency is maintained across different stages (Order -> Payment -> Shipping) using Event-Driven Architecture.

## 🌟 Key Features

* **CQRS Architecture:** Clear separation of Commands (Write) and Queries (Read).
* **Saga Pattern (Orchestration):** Managing long-running processes using **RxJS**.
* **Event Sourcing:** Using NestJS `AggregateRoot` to handle domain events.
* **Compensating Transactions:** Automatic rollback mechanism (e.g., cancelling an order if payment fails).
* **Clean Architecture:** Modular folder structure suitable for enterprise applications.

## 🔄 The Workflow (Saga Flow)

The system handles the following scenario:

1.  **User** creates an order (`CreateOrderCommand`).
2.  **System** reserves the order (Status: PENDING) and emits `OrderCreatedEvent`.
3.  **Saga** listens to the event and triggers `ProcessPaymentCommand`.
4.  **Payment Handler** processes the payment:
    * ✅ **Success:** Saga triggers `ShipOrderCommand` (Order Confirmed).
    * ❌ **Failure:** Saga triggers `CancelOrderCommand` (Rollback/Compensate).

## 🛠️ Tech Stack

* [NestJS](https://nestjs.com/) - The progressive Node.js framework.
* [@nestjs/cqrs](https://github.com/nestjs/cqrs) - The official CQRS module.
* [RxJS](https://rxjs.dev/) - For reactive programming and Saga orchestration.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)
cd YOUR-REPO-NAME