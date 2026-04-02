# QA Technical Test

## Overview
This repository contains automated tests for Web UI (Swag Labs) and API (JSONPlaceholder) using Playwright and TypeScript.

## Setup Instructions
1. Clone the repository: `git clone https://github.com/shafirarizal/qa-automation-technical-test.git`
2. Run `npm install` to install dependencies.
3. Run `npx playwright install` to install browsers.

## How to Run Tests
* Run all tests: `npx playwright test`
* View Report: `npx playwright show-report`

## Project Structure
* `pages/`: Page Object Models for UI tests.
* `tests/ui/`: UI automation scripts.
* `tests/api/`: API automation scripts.

## Test Scenarios Covered

### 1. Web UI (Swag Labs)
| Type | Scenario | Description |
| :--- | :--- | :--- |
| **Positive** | **End-to-End Purchase** | Login -> Add to Cart -> Checkout -> Validate Success Message. |
| **Negative** | **Locked Out User** | Attempt login with `locked_out_user` and verify error message. |
| **Edge** | **Missing Postal Code** | Attempt to continue checkout with a blank postal code to verify required field validation. |

### 2. API (JSONPlaceholder)
| Type | Method | Description |
| :--- | :--- | :--- |
| **Positive** | **CRUD Lifecycle** | Executes full flow (POST -> GET -> PATCH -> GET -> DELETE -> GET 404) ensuring data persistence and modification. |
| **Negative** | **GET** | Attempt to fetch a non-existent ID (e.g., `999999`) and verify a `404 Not Found` status. |
| **Edge** | **POST** | Send an empty data payload `{}` to test API robustness and edge-case handling. |

## Test Execution Results
Here is a snapshot of the local test execution showing all positive, negative, and edge cases passing successfully:

![test-report](https://github.com/user-attachments/assets/dbafe6b7-4b3e-42bf-95f7-b5e75a963bbe)

## CI/CD Status
This project uses GitHub Actions to run the full suite of 6 tests in a clean Ubuntu environment. This ensures code quality and state validation before any merge.
