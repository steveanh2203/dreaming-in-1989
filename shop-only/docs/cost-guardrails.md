# Cost Guardrails

The store uses a zero-surprise-cost policy. A paid-capable service must not be
enabled until its native dashboard limit and alerts are configured.

## Default policy

- Keep overage and pay-as-you-go disabled where the provider supports it.
- Send usage alerts at 50%, 75%, and 90%.
- Preserve checkout, payment webhooks, order fulfillment, auth, and
  transactional email.
- Reduce or disable session replay, analytics sampling, optional image
  processing, and nonessential background jobs first.
- Never treat the repository check as a replacement for the provider's billing
  controls.

## Provider setup

| Provider | Required control before enabling |
| --- | --- |
| Vercel | Create the project, set a spend limit and usage notifications, then set `VERCEL_SPEND_LIMIT_CONFIRMED=true`. |
| PostHog | Set billing limits for every enabled product and conservative replay sampling, then set `POSTHOG_COST_CAP_CONFIRMED=true`. |
| Sentry | Keep pay-as-you-go disabled or set a budget cap and alerts, then set `SENTRY_COST_CAP_CONFIRMED=true`. |
| Cloudflare R2 | Add billing notifications and a monthly budget alert. R2 does not provide a reliable application-level hard stop, so keep uploads controlled, then set `CLOUDFLARE_R2_COST_CAP_CONFIRMED=true`. |
| Supabase | Keep the spend cap enabled when moving to Pro and configure usage notifications. |
| Resend | Keep the free plan until volume requires an upgrade; monitor daily and monthly send limits. |

## Build gate

`npm run build` runs `npm run cost:check` first. In strict mode, the build fails
when a service is enabled without its matching confirmation variable.

Store confirmations in Doppler only after checking the provider dashboard:

```text
COST_GUARD_MODE=strict
POSTHOG_ENABLED=true
POSTHOG_COST_CAP_CONFIRMED=true
```

Do not set a confirmation to `true` merely to bypass a failed build.
