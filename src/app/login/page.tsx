'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import logo from '@/assets/images/logo2.png';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const REMEMBER_EMAIL_KEY = 'cms_remembered_email';

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const rememberedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe }),
            });
            const result = await res.json();
            if (!result.success) {
                setError(result.message || 'Login failed');
                return;
            }
            if (rememberMe) {
                window.localStorage.setItem(REMEMBER_EMAIL_KEY, email);
            } else {
                window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
            }
            const from = searchParams.get('from');
            router.push(from && from !== '/login' ? from : '/dashboard');
            router.refresh();
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
            <a href="/" className="auth-brand mb-4">
                <Image src={logo} alt="logo light" height={80} className="logo-light" />
            </a>
            <h4 className="fw-semibold mb-2 fs-18">Log in to your account</h4>
            <p className="text-muted mb-4">
                Enter your email address and password to access admin panel.
            </p>

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
                    <div className="position-relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="login-password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                fontSize: '20px',
                                color: '#6c757d',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <IconifyIcon
                                icon={showPassword ? 'ri:eye-off-line' : 'ri:eye-line'}
                                width="20"
                                height="20"
                            />
                        </span>
                    </div>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="login-remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="login-remember-me">
                        Remember me
                    </label>
                </div>
                <div className="d-grid">
                    <button
                        className="btn btn-primary fw-semibold"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </Card>
    );
};

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
    );
};

export default LoginPage;
