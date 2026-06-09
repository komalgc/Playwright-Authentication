# Playwright API Authentication Recipes

This repository demonstrates different ways to handle authentication in Playwright using UI login, API login, storage state, multiple accounts, user roles, and request interception.

The goal of this project is to show practical authentication strategies that can make Playwright tests faster, more reliable, and easier to scale.

---

## 📌 Project Overview

Authentication is one of the most common challenges in test automation. Instead of logging in through the UI for every test, Playwright allows us to save and reuse authenticated browser state.

This project contains multiple authentication recipes, starting from simple UI-based login reuse to advanced API-based authentication with multiple roles and request interception.

---

## 🛠 Tech Stack

* Playwright
* TypeScript
* Node.js
* Playwright Test Runner
* API Authentication
* Storage State
* Request Interception

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run a Specific Test File

```bash
npx playwright test tests/Recipe3.spec.ts
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

---

## 📊 View HTML Report

After test execution, generate and view the Playwright report:

```bash
npx playwright show-report
```

---

## 📁 Project Structure

```bash
.
├── tests
│   ├── Recipe1.spec.ts
│   ├── Recipe2.spec.ts
│   ├── Recipe3.spec.ts
│   ├── Recipe4.spec.ts
│   ├── Recipe5.spec.ts
│   ├── Recipe6.spec.ts
│   └── Recipe7.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🔐 Authentication Recipes

### Recipe 1: UI Login Once and Reuse Storage State

**Approach:**
Authenticate once through the UI and save the login session as a storage state file.

**When to use:**
Use this when all tests can safely run with the same user account and do not affect each other.

**Example scenario:**
Validating pages that only require a logged-in user, such as dashboard, profile, or order history.

---

### Recipe 2: UI Login with Multiple Accounts

**Approach:**
Authenticate through the UI using multiple accounts and save separate storage state files for each account.

**When to use:**
Use this when tests need different users running at the same time without session conflict.

**Example scenario:**
Running tests in parallel where each test needs a separate customer account.

---

### Recipe 3: UI Login with Multiple Accounts and Roles

**Approach:**
Authenticate multiple users with different roles through the UI and reuse their storage states.

**When to use:**
Use this when the application has role-based access, such as admin, manager, and customer.

**Example scenario:**
Validating that an admin can access user management, but a normal user cannot.

---

### Recipe 4: API Login and Reuse Storage State

**Approach:**
Authenticate directly through the API, create the browser storage state, and reuse it in tests.

**When to use:**
Use this when you want faster and more stable authentication without depending on the UI login flow.

**Example scenario:**
Bypassing the login screen and directly testing authenticated pages.

---

### Recipe 5: API Login with Multiple Accounts

**Approach:**
Authenticate multiple users through the API and save separate storage state files.

**When to use:**
Use this when multiple test users are needed and UI login would slow down execution.

**Example scenario:**
Running parallel tests where each worker gets a unique authenticated account.

---

### Recipe 6: API Login with Multiple Accounts and Roles

**Approach:**
Authenticate users with different roles through the API and reuse their storage states.

**When to use:**
Use this when testing role-based access control in a faster and scalable way.

**Example scenario:**
Testing admin, seller, and buyer workflows without logging in through the UI every time.

---

### Recipe 7: API Login with Request Interception

**Approach:**
Authenticate through the API and use Playwright request interception to control or modify network behavior.

**When to use:**
Use this when you need to mock, modify, block, or validate API requests during authenticated test execution.

**Example scenario:**
Testing how the application behaves when a user API returns a specific role, permission, or error response.

---

## ✅ Test Files

| Test File               | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `tests/Recipe1.spec.ts` | UI authentication using single storage state        |
| `tests/Recipe2.spec.ts` | UI authentication with multiple accounts            |
| `tests/Recipe3.spec.ts` | UI authentication with multiple accounts and roles  |
| `tests/Recipe4.spec.ts` | API authentication using storage state              |
| `tests/Recipe5.spec.ts` | API authentication with multiple accounts           |
| `tests/Recipe6.spec.ts` | API authentication with multiple accounts and roles |
| `tests/Recipe7.spec.ts` | API authentication with request interception        |

---

## ⭐ Why Reuse Authentication State?

Reusing authentication state helps to:

* Reduce repeated login steps
* Make tests faster
* Avoid unnecessary dependency on the login UI
* Improve test stability
* Support parallel execution
* Support multiple users and roles
* Keep authentication setup separate from actual test logic

---

---

## 🔐 Environment Variables

It is recommended to store credentials in a `.env` file.

Example:

```bash
BASE_URL=https://your-app-url.com
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=yourPassword
USER_USERNAME=user@example.com
USER_PASSWORD=yourPassword
```

Make sure `.env` is added to `.gitignore`.

```bash
.env
auth/
storage-state/
```
---

## 👩‍💻 Author Komal Chowdhary

Created as part of a Playwright authentication strategy learning project.

This repository is useful for testers, automation engineers, and quality engineers who want to understand practical authentication patterns in Playwright.
