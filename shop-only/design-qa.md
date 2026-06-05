# Design QA

Target: Image Gen option 1, "Receipt Detail Modal".

Implementation screenshot: `test-results/modal-final-1780631895614.png`

Checks:
- Modal opens from an order row `View Detail`.
- Modal appears above the account dashboard backdrop.
- Header, status badge, summary strip, items, delivery info, timeline, and footer actions match the selected receipt-modal direction.
- `Reorder` adds order items to the cart and shows a confirmation notice.
- `Download Receipt` saves a generated PDF receipt with the order data.
- `Close` removes the modal.
- Desktop viewport checked at `1440 x 1024`.

Fixes made during QA:
- Raised order detail backdrop above the account dashboard stacking layer.
- Replaced undefined `--green` color with the project `--pine` token.
- Split order/date and item/option text into separate lines to avoid cramped labels.
- Increased modal icon sizes and centered footer button icon/text alignment.
- Replaced the receipt download demo notice with a real client-side PDF download.

Final result: passed.
