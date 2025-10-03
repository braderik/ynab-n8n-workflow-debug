# YNAB n8n Workflow Debugging Repository

> Debugging YNAB (You Need A Budget) API integration with n8n workflows

## 🎯 Purpose

This repository is designed to help debug and fix the `404 resource_not_found` error encountered when fetching YNAB transactions through n8n.

## 🐛 Main Issue

**Error:** `404 - resource_not_found`  
**Location:** "Get Transactions Since Yesterday" node  
**Root Cause:** Malformed budget_id expression in "Set Budget Variables" node

### The Problem
In the original workflow, the budget_id field contained:
```
=: ={{ $json.data.budgets[0].id }}
```
This caused the budget_id to be undefined, resulting in an invalid API URL.

## ✅ Solution

The fixed version uses:
```
={{ $json.data.budgets[0].id }}
```

## 📁 Repository Contents

- `workflows/` - n8n workflow JSON files (original and fixed versions)
- `debug-scripts/` - Standalone JavaScript debugging scripts
- `docs/` - Documentation and troubleshooting guides
- `ISSUES.md` - Known issues and their solutions

## 🚀 Quick Start

1. Import the fixed workflow from `workflows/ynab-workflow-fixed.json`
2. Configure your YNAB Bearer Auth credentials in n8n
3. Run the workflow with "Test workflow" button

## 🔧 Debug Scripts

Run the standalone debugging script to test your YNAB API connection:
```bash
node debug-scripts/test-ynab-api.js
```

## 📚 Documentation

See `docs/` folder for detailed setup instructions and API reference.

## 🤝 Contributing

Found an issue or improvement? Feel free to open an issue or submit a PR!

---

**Created:** 2025-10-03  
**Last Updated:** 2025-10-03