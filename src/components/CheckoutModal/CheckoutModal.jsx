import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import PriceBreakdown from '../PriceBreakdown/PriceBreakdown'
import { formatPrice } from '../../utils/format'

const PHONE_RE = /^[0-9+\-\s]{10,15}$/

export function validateCheckout({ name, phone, address }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!PHONE_RE.test(phone.trim())) errors.phone = 'Enter a valid phone number (10-15 digits).'
  if (address.trim().length < 8) errors.address = 'Please enter your full delivery address.'
  return errors
}

export default function CheckoutModal({ subtotal, deliveryFee, tax, total, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const firstField = useRef(null)

  useEffect(() => {
    firstField.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !processing && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, processing])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateCheckout(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setProcessing(true)
    // Simulated payment: no real network call is made.
    setTimeout(() => onConfirm(form), 1200)
  }

  return (
    <div className="modal-backdrop" onClick={() => !processing && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="checkout-title">Checkout</h2>
        <p className="muted">Demo checkout - no payment is taken.</p>
        <PriceBreakdown subtotal={subtotal} deliveryFee={deliveryFee} tax={tax} total={total} />
        <form onSubmit={handleSubmit} noValidate className="checkout-form">
          <Field id="co-name" label="Full name" error={errors.name}>
            <input
              id="co-name"
              ref={firstField}
              value={form.name}
              onChange={update('name')}
              maxLength={60}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
          <Field id="co-phone" label="Phone number" error={errors.phone}>
            <input
              id="co-phone"
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              maxLength={15}
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
          </Field>
          <Field id="co-address" label="Delivery address" error={errors.address}>
            <textarea
              id="co-address"
              rows={3}
              value={form.address}
              onChange={update('address')}
              maxLength={200}
              autoComplete="street-address"
              aria-invalid={Boolean(errors.address)}
            />
          </Field>
          <div className="modal__actions">
            <Button variant="ghost" onClick={onClose} disabled={processing}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              {processing ? 'Processing payment…' : `Pay ${formatPrice(total)}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
