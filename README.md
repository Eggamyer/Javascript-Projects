# 🐣 EggBuilds - Automation Metrics Dashboard

An interactive test automation showcase demonstrating DevOps, CI/CD, and AWS integration capabilities.

## 🎯 Purpose

This portfolio project showcases real-world automation engineering experience through an engaging, egg-themed dashboard that mirrors production test automation infrastructure.

## ✨ Features

### Current (Phase 1 - Frontend Prototype)
- ✅ Interactive egg-themed UI with animations
- ✅ Simulated test execution with real-time updates
- ✅ Test results visualization (pass/fail rates)
- ✅ Environment filtering (Dev, Staging, Production)
- ✅ LocalStorage persistence
- ✅ Responsive design

### Coming Soon (Phase 2 - Backend Integration)
- 🔄 AWS DynamoDB integration for data persistence
- 🔄 CircleCI pipeline for automated test runs
- 🔄 Real Playwright/TypeScript test execution
- 🔄 AWS Lambda API endpoints
- 🔄 Live test metrics from actual CI/CD runs
- 🔄 Historical trend charts with Chart.js

## 🏗️ Architecture

```
┌─────────────────────┐
│   GitHub Repo       │
│   (Source Code)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐         ┌──────────────────┐
│   CircleCI          │────────▶│   DynamoDB       │
│   (Nightly Runs)    │  Metrics│   (Test Data)    │
└──────────┬──────────┘         └────────┬─────────┘
           │                              │
           │ Deploy                       │ Read
           ▼                              │
┌─────────────────────┐                  │
│  S3 + CloudFront    │◀─────────────────┘
│  (Dashboard Host)   │  Dashboard reads data
└─────────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **CI/CD**: CircleCI
- **Cloud**: AWS (DynamoDB, S3, CloudFront, Lambda)
- **Testing**: TypeScript, Playwright (coming soon)
- **Version Control**: GitHub

## 💡 Why "EggBuilds"?

The egg theme is a creative metaphor for test automation:
- **Eggs** = Test suites ready to run
- **Incubation** = Tests executing in CI/CD pipeline
- **Hatching** = Tests passing successfully ✅
- **Cracking** = Tests failing ❌

It's memorable, unique, and demonstrates that automation can be both professional and creative!

## 🚀 Live Demo

Visit: [https://eggamyer.github.io/Javascript-Projects/](https://eggamyer.github.io/Javascript-Projects/)

## 📊 What This Demonstrates

This project showcases experience with:

1. **Test Automation**: Building and maintaining test suites
2. **CI/CD Pipelines**: Automated testing workflows with CircleCI
3. **Cloud Infrastructure**: AWS services (DynamoDB, Lambda, S3)
4. **Data Visualization**: Metrics dashboards and reporting
5. **Frontend Development**: Interactive, responsive UI
6. **DevOps**: Infrastructure as Code, deployment automation

## 📁 Project Structure

```
├── index.html          # Main dashboard
├── styles.css          # Styling & animations
├── app.js              # Interactive functionality
├── .circleci/
│   └── config.yml      # CI/CD configuration
├── archive/            # Previous learning projects
└── README.md           # This file
```

## 🔧 Local Development

```bash
# Clone the repository
git clone https://github.com/Eggamyer/Javascript-Projects.git

# Navigate to directory
cd Javascript-Projects

# Open in browser
# Just open index.html in your browser (no build step required)
```

## 🎨 Design Philosophy

- **Playful but Professional**: Egg theme makes it memorable while showcasing real skills
- **Interactive**: Users can trigger actions and see results
- **Real-world Parallel**: Mirrors actual production test infrastructure at scale
- **Portfolio-ready**: Clean, documented, and production-quality code

## 👤 Author

**Will Egg**
- GitHub: [@Eggamyer](https://github.com/Eggamyer)
- Portfolio: Showcasing Automation & DevOps Engineering

## 📝 License

This project is open source and available for educational and portfolio purposes.

---

*From learning projects to production automation - built with* 🐔 *by Will Egg*
