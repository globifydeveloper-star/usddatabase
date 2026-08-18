'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo2.png';
import { Alert, Card, Col, Row } from 'react-bootstrap';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.success) {
                setIsSubmitted(true);
            } else {
                setError(data.message || 'Failed to send password reset email.');
            }
        } catch (err: any) {
            console.error('Password reset error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = () => {
        setIsSubmitted(false);
        setError(null);
    };

    return (
        <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0" data-bs-theme="dark">
            <a href="/" className="auth-brand mb-4 d-inline-block">
                <Image src={logo} alt="U.S. Degrees logo" height={80} className="logo-light" priority />
            </a>

            {!isSubmitted ? (
                /* State 1: Password Reset Email Input Form */
                <>
                    <h4 className="fw-semibold mb-2 fs-18">Reset Your Password</h4>
                    <p className="text-muted mb-4">
                        Enter your email address below and we'll send you a link to reset your password.
                    </p>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="text-start mb-3">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="forgot-email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="forgot-email"
                                className="form-control"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid mb-3">
                            <button
                                className="btn btn-primary fw-semibold"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Sending link...' : 'Send Reset Link'}
                            </button>
                        </div>
                        <div className="text-center">
                            <Link href="/login" className="text-muted text-decoration-none fs-14">
                                Remember your password? <span className="fw-semibold text-primary">Log in</span>
                            </Link>
                        </div>
                    </form>
                </>
            ) : (
                /* State 2: Confirmation Message State (No Page Redirect) */
                <>
                    <div className="mb-3 text-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            fill="currentColor"
                            className="bi bi-envelope-check-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.756Zm8.239-4.133L9.197 8.243 15 11.801V4.697Z" />
                        </svg>
                    </div>
                    <h4 className="fw-semibold mb-2 fs-18">Check Your Email</h4>
                    <p className="text-muted mb-4">
                        We have sent a password reset link to <strong className="text-dark">{email}</strong>.
                        Please check your inbox (and spam folder) to reset your password.
                    </p>

                    <div className="d-grid mb-3">
                        <Link href="/login" className="btn btn-primary fw-semibold">
                            Back to Login
                        </Link>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            className="btn btn-link text-muted text-decoration-none fs-14 p-0"
                        >
                            Didn't receive the email? <span className="fw-semibold text-primary">Try another email / Resend</span>
                        </button>
                    </div>
                </>
            )}
        </Card>
    );
};

const ForgotPasswordPage = () => {
    return (
        <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center" data-bs-theme="dark">
            <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
                <Col xl={4} lg={5} md={6}>
                    <Suspense fallback={null}>
                        <ForgotPasswordForm />
                    </Suspense>
                </Col>
            </Row>
        </div>
    );
};

export default ForgotPasswordPage;
