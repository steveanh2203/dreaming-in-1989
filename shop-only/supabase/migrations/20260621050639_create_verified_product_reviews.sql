create table public.product_reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  reviewer_name text not null,
  rating smallint not null,
  title text not null,
  body text not null,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_reviews_rating_check check (rating between 1 and 5),
  constraint product_reviews_reviewer_name_check check (char_length(btrim(reviewer_name)) between 1 and 80),
  constraint product_reviews_title_check check (char_length(btrim(title)) between 3 and 80),
  constraint product_reviews_body_check check (char_length(btrim(body)) between 10 and 1000),
  constraint product_reviews_status_check check (status in ('published', 'hidden')),
  constraint product_reviews_purchase_unique unique (user_id, order_id, product_id)
);

create index product_reviews_order_id_idx
  on public.product_reviews (order_id);

create index product_reviews_published_product_idx
  on public.product_reviews (product_id, created_at desc)
  where status = 'published';

alter table public.product_reviews enable row level security;

revoke all on table public.product_reviews from anon, authenticated;
grant select on table public.product_reviews to anon;
grant select, insert on table public.product_reviews to authenticated;
grant usage, select on sequence public.product_reviews_id_seq to authenticated;

create policy "Published product reviews are public"
  on public.product_reviews
  for select
  to anon, authenticated
  using (status = 'published');

create policy "Customers can read their own product reviews"
  on public.product_reviews
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Verified customers can create product reviews"
  on public.product_reviews
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'published'
    and exists (
      select 1
      from public.orders as purchased_order
      where purchased_order.id = product_reviews.order_id
        and purchased_order.user_id = (select auth.uid())
        and (
          lower(replace(coalesce(purchased_order.status, ''), ' ', '_')) in ('delivered', 'completed')
          or lower(replace(coalesce(purchased_order.fulfillment_status, ''), ' ', '_')) in ('delivered', 'fulfilled')
        )
        and (
          exists (
            select 1
            from public.order_items as purchased_item
            where purchased_item.order_id = purchased_order.id
              and purchased_item.product_id = product_reviews.product_id
          )
          or exists (
            select 1
            from jsonb_array_elements(coalesce(purchased_order.shipping_address -> 'items', '[]'::jsonb)) as purchased_item
            where purchased_item ->> 'product_id' = product_reviews.product_id
          )
        )
    )
  );
