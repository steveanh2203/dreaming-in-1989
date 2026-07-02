alter table public.orders
  add column if not exists paypal_order_id text,
  add column if not exists paypal_capture_id text;

create index if not exists orders_paypal_order_id_idx
  on public.orders (paypal_order_id)
  where paypal_order_id is not null;

create index if not exists orders_paypal_capture_id_idx
  on public.orders (paypal_capture_id)
  where paypal_capture_id is not null;

create table if not exists public.paypal_webhook_events (
  id text primary key,
  event_type text not null,
  paypal_order_id text,
  paypal_capture_id text,
  verification_status text not null,
  processing_status text not null default 'received',
  payload jsonb not null,
  matched_order_id uuid references public.orders(id) on delete set null,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists paypal_webhook_events_order_idx
  on public.paypal_webhook_events (paypal_order_id)
  where paypal_order_id is not null;

create index if not exists paypal_webhook_events_capture_idx
  on public.paypal_webhook_events (paypal_capture_id)
  where paypal_capture_id is not null;

alter table public.paypal_webhook_events enable row level security;

revoke all on table public.paypal_webhook_events from anon, authenticated;
grant select, insert, update on table public.paypal_webhook_events to service_role;
