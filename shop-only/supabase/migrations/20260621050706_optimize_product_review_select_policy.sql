drop policy "Published product reviews are public" on public.product_reviews;
drop policy "Customers can read their own product reviews" on public.product_reviews;

create policy "Anonymous users can read published product reviews"
  on public.product_reviews
  for select
  to anon
  using (status = 'published');

create policy "Customers can read published and own product reviews"
  on public.product_reviews
  for select
  to authenticated
  using (
    status = 'published'
    or user_id = (select auth.uid())
  );
