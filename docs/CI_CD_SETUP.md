# Dreaming in 1989 CI/CD Setup

This repo uses GitHub Actions as the controlled path from vibe-coded changes to
review, preview, merge, and production deploy.

## Intended Flow

1. Create a feature branch.
2. Open a pull request.
3. GitHub Actions runs CI.
4. Vercel Preview posts a preview URL on the pull request.
5. Review the UI, checkout flow, and product pages on the preview URL.
6. Approve and merge the pull request after checks pass.
7. A production deploy runs from `main` to `https://dreamingin1989.com`.
8. Production smoke tests verify the site and key API endpoints.

## Required GitHub Secrets

Add these in GitHub repository settings:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The Vercel org and project IDs are available from the local linked Vercel
project metadata in `shop-only/.vercel/project.json`. Treat the token as a
secret. Do not commit `.env.local` or any raw API keys.

## Recommended GitHub Settings

Enable branch protection for `main`:

- Require pull requests before merging.
- Require status checks to pass before merging.
- Require the `CI / Lint, Test, Build` check.
- Require branches to be up to date before merging.
- Enable auto-merge if available.
- Do not allow direct pushes to `main` except for emergency admin recovery.

Create a GitHub Environment named `production`:

- Add a required reviewer if the account plan supports it.
- Use this environment for the production deploy workflow.

## Vercel Deployment Model

The workflows use Vercel CLI with prebuilt deploys:

- Pull Vercel environment.
- Build in GitHub Actions.
- Deploy the already-built output.

This keeps test/build gates in GitHub before production gets updated.

If Vercel Git auto-deploys are enabled for this project, choose one owner for
deploys to avoid duplicate deployments:

- Preferred: GitHub Actions owns deploys.
- Alternative: Vercel Git integration owns deploys, while GitHub Actions only
  runs CI.

## Product Workflow Boundary

The `Product Package Prep` workflow is intentionally prep-only. It must not:

- publish Printful products,
- create real orders,
- change pricing,
- replace live print files.

Any workflow that changes the live store must be a separate, manually triggered
workflow with explicit approval.

## Current Workflows

- `.github/workflows/ci.yml` runs lint, tests, and build.
- `.github/workflows/vercel-preview.yml` deploys pull request previews.
- `.github/workflows/vercel-production.yml` deploys production from `main`.
- `.github/workflows/product-package.yml` provides a safe manual product-prep
  entrypoint.
