import { useState } from 'react'

function PurchaseReviewForm({ productName, submitting, notice, onCancel, onSubmit }) {
  const [rating, setRating] = useState(5)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    onSubmit({
      rating,
      title: String(formData.get('title') ?? '').trim(),
      body: String(formData.get('body') ?? '').trim(),
    })
  }

  return (
    <form className="purchase-review-form" aria-label={`Review ${productName}`} onSubmit={handleSubmit}>
      <div className="purchase-review-form-heading">
        <div>
          <small>Verified purchase</small>
          <strong>Review {productName}</strong>
        </div>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>

      <fieldset>
        <legend>Your rating</legend>
        <div className="purchase-review-stars" role="radiogroup" aria-label="Product rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              aria-checked={rating === value}
              aria-label={`${value} star${value === 1 ? '' : 's'}`}
              className={value <= rating ? 'active' : ''}
              key={value}
              role="radio"
              type="button"
              onClick={() => setRating(value)}
            >
              ★
            </button>
          ))}
        </div>
      </fieldset>

      <label>
        Review title
        <input name="title" minLength="3" maxLength="80" placeholder="Sum it up in a few words" required />
      </label>

      <label>
        Your review
        <textarea
          name="body"
          minLength="10"
          maxLength="1000"
          placeholder="What did you like? How did the product feel in real life?"
          rows="4"
          required
        />
      </label>

      {notice && <p className="purchase-review-notice" role="status">{notice}</p>}

      <button className="purchase-review-submit" disabled={submitting} type="submit">
        {submitting ? 'Posting review…' : 'Post verified review'}
      </button>
    </form>
  )
}

export default PurchaseReviewForm
