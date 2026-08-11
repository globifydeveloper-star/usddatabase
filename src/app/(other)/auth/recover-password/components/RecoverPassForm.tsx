'use client'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-bootstrap'
import * as yup from 'yup'
import { resetPassword } from '@/lib/firebase'

const RecoverPassForm = () => {
  const [status, setStatus] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const recoverPassSchema = yup.object({
    email: yup.string().email('Invalid email').required('Please enter your email'),
  })

  const { handleSubmit, control } = useForm<{ email: string }>({
    resolver: yupResolver(recoverPassSchema),
  })

  const onSubmit = async (data: { email: string }) => {
    setStatus(null);
    setLoading(true);
    try {
      const res = await resetPassword(data.email);
      if (res.success) {
        setStatus({ type: 'success', message: res.message });
      } else {
        setStatus({ type: 'danger', message: res.message });
      }
    } catch {
      setStatus({ type: 'danger', message: 'Failed to send reset email.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {status && <Alert variant={status.type}>{status.message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} className="text-start mb-3">
        <div className="mb-3">
          <TextFormInput control={control} name="email" placeholder="Enter Your Email" label="Email" />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Sending link...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RecoverPassForm
