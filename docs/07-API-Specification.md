# 🌐 CatchALiftt API Specification

---

# Purpose

This document defines all backend REST APIs required for the CatchALiftt platform.

It serves as the communication contract between:

- Frontend
- Backend
- Mobile App
- Admin Panel
- AI Engine

---

# API Standard

Architecture

REST API

Data Format

JSON

Authentication

JWT Access Token

Transport

HTTPS

Version

v1

Base URL

/api/v1

---

# Authentication APIs

## Register

POST

/api/v1/auth/register

Purpose

Create a new account.

---

## Login

POST

/api/v1/auth/login

Purpose

Authenticate user.

---

## Logout

POST

/api/v1/auth/logout

Purpose

End current session.

---

## Refresh Token

POST

/api/v1/auth/refresh

Purpose

Generate new access token.

---

## Verify OTP

POST

/api/v1/auth/verify-otp

Purpose

Verify mobile number.

---

# User APIs

## Get Profile

GET

/api/v1/users/profile

---

## Update Profile

PUT

/api/v1/users/profile

---

## Upload Profile Photo

POST

/api/v1/users/photo

---

## Delete Account

DELETE

/api/v1/users

---

# Host APIs

## Become Host

POST

/api/v1/hosts/register

---

## Update Vehicle

PUT

/api/v1/hosts/vehicle

---

## Host Dashboard

GET

/api/v1/hosts/dashboard

---

# Ride APIs

## Create Ride

POST

/api/v1/rides

---

## Search Ride

POST

/api/v1/rides/search

---

## Ride Details

GET

/api/v1/rides/{rideId}

---

## Edit Ride

PUT

/api/v1/rides/{rideId}

---

## Cancel Ride

DELETE

/api/v1/rides/{rideId}

---

## Complete Ride

POST

/api/v1/rides/{rideId}/complete

---

# Booking APIs

## Book Ride

POST

/api/v1/bookings

---

## Accept Booking

POST

/api/v1/bookings/{bookingId}/accept

---

## Reject Booking

POST

/api/v1/bookings/{bookingId}/reject

---

## Cancel Booking

DELETE

/api/v1/bookings/{bookingId}

---

# Wallet APIs

## Wallet Balance

GET

/api/v1/wallet

---

## Add Money

POST

/api/v1/wallet/deposit

---

## Withdraw

POST

/api/v1/wallet/withdraw

---

## Transaction History

GET

/api/v1/wallet/transactions

---

# AI APIs

## Smart Pickup

POST

/api/v1/ai/pickup

---

## Route Optimization

POST

/api/v1/ai/route

---

## Ride Recommendation

POST

/api/v1/ai/recommendation

---

## Demand Prediction

GET

/api/v1/ai/demand

---

# Navigation APIs

## Live Navigation

GET

/api/v1/navigation/live

---

## ETA

GET

/api/v1/navigation/eta

---

## Route Refresh

POST

/api/v1/navigation/update

---

# Notification APIs

## Get Notifications

GET

/api/v1/notifications

---

## Mark As Read

POST

/api/v1/notifications/read

---

# Rating APIs

## Submit Rating

POST

/api/v1/ratings

---

## Get User Ratings

GET

/api/v1/ratings/{userId}

---

# Admin APIs

## Dashboard

GET

/api/v1/admin/dashboard

---

## User Management

GET

/api/v1/admin/users

---

## Ride Monitoring

GET

/api/v1/admin/rides

---

## Wallet Reports

GET

/api/v1/admin/wallet

---

## SOS Reports

GET

/api/v1/admin/sos

---

# Response Format

Every API will return

Success

{
"success": true,
"data": {}
}

Failure

{
"success": false,
"message": "Error description"
}

---

# HTTP Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

---

# Future APIs

- Corporate Accounts
- Subscription Plans
- Referral System
- Coupons
- AI Analytics
- Fleet Management
- Carbon Credit Tracking
- Smart Parking
- Voice Assistant

---

Status

Planning
