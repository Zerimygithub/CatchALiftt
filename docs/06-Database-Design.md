# 🗄️ CatchALiftt Database Design

---

# Purpose

This document defines the complete database structure for the CatchALiftt platform.

It describes:

- Database entities
- Relationships
- Primary keys
- Foreign keys
- Required fields
- Future scalability

---

# Database Type

Database Engine:
PostgreSQL

Reason:

- Fast
- Reliable
- Open Source
- Excellent GIS support
- Easy scaling

---

# Main Tables

1. Users
2. Hosts
3. Travellers
4. Vehicles
5. Rides
6. Bookings
7. Wallet
8. Transactions
9. Ratings
10. Notifications
11. Penalties
12. SOS Reports
13. Rewards
14. Referral Program
15. Route History
16. AI Suggestions

---

# Entity Relationship

User
│
├── Host Profile
├── Traveller Profile
├── Wallet
├── Notifications
├── Rewards
└── Ratings

Host
│
├── Vehicle
├── Rides
├── Earnings
└── Route History

Ride
│
├── Bookings
├── Pickup
├── Drop
├── AI Suggestions
└── Navigation

Booking
│
├── Traveller
├── Ride
├── Payment
└── Status

---

# Primary Keys

Every table will use

UUID

instead of Auto Increment IDs.

Reason:

- Globally unique
- Better security
- Easier scaling

---

# Naming Convention

Tables

snake_case

Example

ride_booking

Columns

snake_case

Example

pickup_location

Foreign Keys

tablename_id

Example

ride_id

---

# Indexing Strategy

Index

- Mobile Number
- Email
- Ride Date
- Route
- Status
- Booking Status

---

# Future Expansion

Database designed for

- Corporate Accounts
- Subscription Plans
- AI Recommendation Engine
- Multiple Cities
- International Expansion
- Electric Vehicles
- Fleet Management

---

Status

Planning
