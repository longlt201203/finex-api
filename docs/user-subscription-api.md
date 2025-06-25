# User Subscription APIs

This document describes the API endpoints for managing user subscriptions in the Finex API.

## User Subscription Endpoints

These endpoints are available for regular users to manage their own subscriptions.

### `POST /admin/user-subscription`

Creates a new user subscription.

**Request Body:**
```json
{
  "subscriptionId": "string", // MongoDB ObjectId (required)
  "expiryDate": "string"     // ISO date string (optional)
}
```

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": {
      "id": "string",
      "name": "string",
      "price": "number",
      "currencyUnit": "string",
      "startDate": "string",
      "endDate": "string",
      "active": "boolean",
      "description": "string",
      "createdAt": "string",
      "updatedAt": "string"
    },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Subscription purchased successfully"
}
```

### `GET /admin/user-subscription`

Retrieves a list of user subscriptions with optional filtering.

**Query Parameters:**
- `active` (boolean, optional): Filter by active status
- `subscriptionId` (string, optional): Filter by subscription ID
- `paymentStatus` (string, optional): Filter by payment status ("pending", "completed", "cancelled", "failed")

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "accountId": "string",
      "subscriptionId": "string",
      "subscription": { /* subscription details */ },
      "purchaseDate": "string",
      "expiryDate": "string",
      "active": "boolean",
      "paymentStatus": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "error": null,
  "message": "Success!"
}
```

### `GET /admin/user-subscription/:userSubscriptionId`

Retrieves a specific user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Success!"
}
```

### `PUT /admin/user-subscription/:userSubscriptionId`

Updates an existing user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Request Body:**
```json
{
  "expiryDate": "string",     // ISO date string (optional)
  "active": "boolean",       // (optional)
  "paymentStatus": "string"  // (optional) - "pending", "completed", "cancelled", "failed"
}
```

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Updated successfully"
}
```

### `PATCH /admin/user-subscription/:userSubscriptionId/cancel`

Cancels a user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Subscription cancelled successfully"
}
```

### `PATCH /admin/user-subscription/:userSubscriptionId/renew`

Renews a user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Subscription renewed successfully"
}
```

## Admin User Subscription Endpoints

These endpoints are available for admin users to manage all user subscriptions.

### `GET /admin/user-subscription`

Retrieves a list of all user subscriptions with filtering options.

**Query Parameters:**
- `active` (boolean, optional): Filter by active status
- `subscriptionId` (string, optional): Filter by subscription ID
- `accountId` (string, optional): Filter by account ID
- `paymentStatus` (string, optional): Filter by payment status ("pending", "completed", "cancelled", "failed")

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "accountId": "string",
      "subscriptionId": "string",
      "subscription": { /* subscription details */ },
      "purchaseDate": "string",
      "expiryDate": "string",
      "active": "boolean",
      "paymentStatus": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "error": null,
  "message": "Success!"
}
```

### `GET /admin/user-subscription/statistics`

Retrieves statistics for user subscriptions.

**Response:**
```json
{
  "data": {
    "totalSubscriptions": "number",
    "activeSubscriptions": "number",
    "expiredSubscriptions": "number",
    "expiringSubscriptions": "number"
  },
  "error": null,
  "message": "Statistics retrieved successfully"
}
```

### `GET /admin/user-subscription/:userSubscriptionId`

Retrieves a specific user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Success!"
}
```

### `PUT /admin/user-subscription/:userSubscriptionId`

Updates an existing user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Request Body:**
```json
{
  "expiryDate": "string",     // ISO date string (optional)
  "active": "boolean",       // (optional)
  "paymentStatus": "string"  // (optional) - "pending", "completed", "cancelled", "failed"
}
```

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Updated successfully"
}
```

### `PATCH /admin/user-subscription/:userSubscriptionId/cancel`

Cancels a user subscription by ID.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Subscription cancelled successfully"
}
```

### `PATCH /admin/user-subscription/:userSubscriptionId/renew`

Renews a user subscription by ID with an option to specify the number of months to add.

**Parameters:**
- `userSubscriptionId` (string, required): The ID of the user subscription

**Request Body:**
```json
{
  "monthsToAdd": "number"  // (optional, default: 1) - Number of months to add to the subscription
}
```

**Response:**
```json
{
  "data": {
    "id": "string",
    "accountId": "string",
    "subscriptionId": "string",
    "subscription": { /* subscription details */ },
    "purchaseDate": "string",
    "expiryDate": "string",
    "active": "boolean",
    "paymentStatus": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "error": null,
  "message": "Subscription renewed successfully"
}
```

## Data Models

### User Subscription

| Field         | Type     | Description                                   |
|---------------|----------|-----------------------------------------------|
| id            | string   | Unique identifier for the user subscription   |
| accountId     | string   | ID of the account that owns the subscription  |
| subscriptionId| string   | ID of the subscription plan                   |
| subscription  | object   | Details of the subscription plan (if included)|
| purchaseDate  | date     | Date when the subscription was purchased      |
| expiryDate    | date     | Date when the subscription expires            |
| active        | boolean  | Whether the subscription is currently active  |
| paymentStatus | string   | Status of the payment (pending, completed, cancelled, failed) |
| createdAt     | date     | Date when the record was created              |
| updatedAt     | date     | Date when the record was last updated         |

### Payment Status

The `paymentStatus` field can have the following values:

- `pending`: Payment is pending
- `completed`: Payment is completed
- `cancelled`: Payment is cancelled
- `failed`: Payment has failed

### Subscription Statistics

| Field                | Type   | Description                                      |
|----------------------|--------|--------------------------------------------------|
| totalSubscriptions   | number | Total number of subscriptions                    |
| activeSubscriptions  | number | Number of active subscriptions                   |
| expiredSubscriptions | number | Number of expired subscriptions                  |
| expiringSubscriptions| number | Number of subscriptions that will expire soon    |