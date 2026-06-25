import { useState } from 'react'

const MAX_IMAGE_DIMENSION = 1100
const IMAGE_QUALITY = 0.82

// Resize/compress an uploaded image to a small JPEG data URL so client-side
// storage (localStorage demo) stays well under quota.
const readImageAsResizedDataUrl = (file) =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Only image files are allowed.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read image.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Could not load image.'))
      image.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height))
        const width = Math.max(1, Math.round(image.width * scale))
        const height = Math.max(1, Math.round(image.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', IMAGE_QUALITY))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })

function PurchaseReviewForm({
  productName,
  submitting,
  notice,
  maxImages = 0,
  showNameField = false,
  submitLabel = 'Post verified review',
  badgeLabel = 'Verified purchase',
  onCancel,
  onSubmit,
}) {
  const [rating, setRating] = useState(5)
  const [images, setImages] = useState([])
  const [imageError, setImageError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (!files.length) return
    setImageError('')

    const remaining = maxImages - images.length
    if (remaining <= 0) {
      setImageError(`You can add up to ${maxImages} photos.`)
      return
    }

    const accepted = files.slice(0, remaining)
    setProcessing(true)
    try {
      const dataUrls = await Promise.all(accepted.map(readImageAsResizedDataUrl))
      setImages((current) => [...current, ...dataUrls].slice(0, maxImages))
      if (files.length > remaining) {
        setImageError(`Only ${maxImages} photos allowed — extra photos were skipped.`)
      }
    } catch (error) {
      setImageError(error.message || 'Could not process that image.')
    } finally {
      setProcessing(false)
    }
  }

  const removeImage = (index) => setImages((current) => current.filter((_, position) => position !== index))

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    onSubmit({
      rating,
      title: String(formData.get('title') ?? '').trim(),
      body: String(formData.get('body') ?? '').trim(),
      reviewerName: showNameField ? String(formData.get('reviewerName') ?? '').trim() : undefined,
      images,
    })
  }

  return (
    <form className="purchase-review-form" aria-label={`Review ${productName}`} onSubmit={handleSubmit}>
      <div className="purchase-review-form-heading">
        <div>
          <small>{badgeLabel}</small>
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

      {showNameField && (
        <label>
          Your name
          <input name="reviewerName" minLength="2" maxLength="60" placeholder="How your name appears" required />
        </label>
      )}

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

      {maxImages > 0 && (
        <div className="purchase-review-photos">
          <span className="purchase-review-photos-label">
            Add photos <small>(optional, up to {maxImages})</small>
          </span>
          <div className="purchase-review-photo-grid">
            {images.map((src, index) => (
              <div className="purchase-review-photo" key={`${index}-${src.slice(-12)}`}>
                <img src={src} alt={`Review photo ${index + 1}`} />
                <button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => removeImage(index)}>
                  ×
                </button>
              </div>
            ))}
            {images.length < maxImages && (
              <label className="purchase-review-photo-add">
                <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={processing} />
                <span aria-hidden="true">＋</span>
                <small>{processing ? 'Adding…' : 'Add photo'}</small>
              </label>
            )}
          </div>
          {imageError && <p className="purchase-review-photo-error" role="status">{imageError}</p>}
        </div>
      )}

      {notice && <p className="purchase-review-notice" role="status">{notice}</p>}

      <button className="purchase-review-submit" disabled={submitting || processing} type="submit">
        {submitting ? 'Posting review…' : submitLabel}
      </button>
    </form>
  )
}

export default PurchaseReviewForm
