# QA Automation Technical Test

This repository contains an automated testing framework built as a technical assignment. The unified project utilizes **TypeScript** and **Playwright** to execute both Web UI and API testing layers.

## Project Architecture
- **Web UI Automation:** Implements the **Page Object Model (POM)** design pattern targeting Swag Labs. Includes Positive, Negative, and Edge case scenarios with comprehensive assertions.
- **API Automation:** Automates the full CRUD lifecycle on the JSONPlaceholder `/posts` endpoint, complete with ID capture, field modification validation, and error handling verification.

## CI/CD Integration
This project includes a fully configured **GitHub Actions** workflow (`.github/workflows/playwright.yml`). Tests trigger automatically on pushes to the main branch and upload the HTML test report as a downloadable artifact.

## Installation & Setup

1. **Clone the repository:**
   git clone [https://github.com/shafirarizal/qa-automation-technical-test.git](https://github.com/shafirarizal/qa-automation-technical-test.git)
   cd qa-automation-technical-test

2. **Install project dependencies & Playwright browsers:**
npm install
npx playwright install

3. **Test Execution**

Run All Tests (UI & API) in Headless Mode: 
**npx playwright test**

Run Only Web UI Tests: 
**npx playwright test tests/ui/**

Run Only API Tests:
**npx playwright test tests/api/**

4. **Viewing the Test Report**

To view the detailed HTML report generated after execution, run:
**npx playwright show-report**
