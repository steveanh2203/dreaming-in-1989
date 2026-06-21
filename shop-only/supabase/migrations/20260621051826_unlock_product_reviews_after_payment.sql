drop policy "Verified customers can create product reviews" on public.product_reviews;

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
        and lower(replace(coalesce(purchased_order.status, ''), ' ', '_')) not in ('cancelled', 'canceled', 'refunded')
        and (
          lower(replace(coalesce(purchased_order.payment_status, ''), ' ', '_')) in ('paid', 'captured', 'demo_approved')
          or lower(replace(coalesce(purchased_order.status, ''), ' ', '_')) in ('delivered', 'completed')
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
