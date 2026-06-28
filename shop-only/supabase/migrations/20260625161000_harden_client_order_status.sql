create or replace function public.harden_authenticated_order_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select auth.uid()) is not null then
    new.user_id := (select auth.uid());
    new.status := 'order_received';
    new.payment_status := 'pending_review';
    new.fulfillment_status := 'production_pending';
    new.tracking_number := null;
    new.tracking_url := null;
  end if;

  return new;
end;
$$;

revoke execute on function public.harden_authenticated_order_insert() from public, anon, authenticated;

drop trigger if exists harden_authenticated_order_insert on public.orders;

create trigger harden_authenticated_order_insert
before insert on public.orders
for each row
execute function public.harden_authenticated_order_insert();

create or replace function public.harden_support_ticket_order_reference()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select auth.uid()) is not null then
    new.user_id := (select auth.uid());

    if new.order_number is not null and not exists (
      select 1
      from public.orders as customer_order
      where customer_order.user_id = (select auth.uid())
        and customer_order.order_number = new.order_number
    ) then
      raise exception 'Support ticket order does not belong to the signed-in customer.'
        using errcode = '42501';
    end if;
  end if;

  return new;
end;
$$;

revoke execute on function public.harden_support_ticket_order_reference() from public, anon, authenticated;

drop trigger if exists harden_support_ticket_order_reference on public.support_tickets;

create trigger harden_support_ticket_order_reference
before insert or update on public.support_tickets
for each row
execute function public.harden_support_ticket_order_reference();

drop policy if exists "Verified customers can create product reviews" on public.product_reviews;

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
          lower(replace(coalesce(purchased_order.payment_status, ''), ' ', '_')) in ('paid', 'captured')
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
