'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import { currentYear } from '@/context/constants'
import { Alert, Card, Col, Row } from 'react-bootstrap'

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await res.json()
      if (!result.success) {
        setError(result.message || 'Login failed')
        return
      }
      const from = searchParams.get('from')
      router.push(from && from !== '/login' ? from : '/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
      <a href="/" className="auth-brand mb-4">
        <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
        <Image src={logo} alt="logo light" height={26} className="logo-light" />
      </a>
      <h4 className="fw-semibold mb-2 fs-18">Log in to your account</h4>
      <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={handleSubmit} className="text-start mb-3">
        <div className="mb-3">
          <label className="form-label" htmlFor="login-email">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary fw-semibold" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <p className="mt-auto mb-0">
        {currentYear} © Highdmin - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Coderthemes</span>
      </p>
    </Card>
  )
}

const LoginPage = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
