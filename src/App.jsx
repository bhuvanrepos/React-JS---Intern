import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const defaultProfile = {
  fullName: 'Bhuvan',
  email: 'bhuvan@example.com',
  phone: '+91 98765 43210',
  company: 'PopX Studio',
  agency: 'yes',
};

function PhoneFrame({ children, className = '' }) {
  return <main className={`phone-frame ${className}`}>{children}</main>;
}

function Field({ id, label, required = false, type = 'text', value, onChange, placeholder = '' }) {
  return (
    <fieldset className="field">
      <legend>
        <label htmlFor={id}>{label}</label>
        {required && <span aria-hidden="true"> *</span>}
      </legend>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </fieldset>
  );
}

function Welcome() {
  return (
    <PhoneFrame className="welcome-page">
      <section className="welcome-content">
        <h1>Welcome to PopX</h1>
        <p>Manage your profile and discover opportunities in one simple place.</p>
        <Link className="button primary" to="/register">
          Create Account
        </Link>
        <Link className="button secondary" to="/login">
          Already Registered? Login
        </Link>
      </section>
    </PhoneFrame>
  );
}

function Login({ setProfile }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function signIn() {
    setProfile((current) => ({
      ...current,
      email: form.email || current.email,
    }));
    navigate('/profile');
  }

  function submit(event) {
    event.preventDefault();
    signIn();
  }

  function submitWithKeyboard(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      signIn();
    }
  }

  return (
    <PhoneFrame className="form-page">
      <h1>Sign in to your<br />PopX account</h1>
      <p>Access your profile and stay connected with your PopX community.</p>
      <form className="login-form" onSubmit={submit} onKeyDown={submitWithKeyboard}>
        <Field
          id="email"
          label="Email Address"
          type="email"
          value={form.email}
          onChange={update}
          placeholder="Enter email address"
        />
        <Field
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={update}
          placeholder="Enter password"
        />
        <button className="sr-submit" type="submit">Sign In</button>
      </form>
    </PhoneFrame>
  );
}

function Register({ setProfile }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: 'Bhuvan',
    phone: '',
    email: '',
    password: '',
    company: '',
    agency: 'yes',
  });

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    setProfile({
      fullName: form.fullName || defaultProfile.fullName,
      phone: form.phone || defaultProfile.phone,
      email: form.email || defaultProfile.email,
      company: form.company || defaultProfile.company,
      agency: form.agency,
    });
    navigate('/profile');
  }

  return (
    <PhoneFrame className="register-page">
      <h1>Create your<br />PopX account</h1>
      <form className="register-form" onSubmit={submit}>
        <Field id="fullName" label="Full Name" required value={form.fullName} onChange={update} placeholder="Enter full name" />
        <Field id="phone" label="Phone number" required value={form.phone} onChange={update} placeholder="Enter phone number" />
        <Field id="email" label="Email address" required type="email" value={form.email} onChange={update} placeholder="Enter email address" />
        <Field id="password" label="Password" required type="password" value={form.password} onChange={update} placeholder="Create password" />
        <Field id="company" label="Company name" value={form.company} onChange={update} placeholder="Enter company name" />
        <section className="agency-select" aria-label="Agency status">
          <p>Are you an Agency?<span> *</span></p>
          <label>
            <input type="radio" name="agency" value="yes" checked={form.agency === 'yes'} onChange={update} />
            <span className="radio-dot" />
            Yes
          </label>
          <label>
            <input type="radio" name="agency" value="no" checked={form.agency === 'no'} onChange={update} />
            <span className="radio-dot" />
            No
          </label>
        </section>
        <button className="button primary submit-button" type="submit">Create Account</button>
      </form>
    </PhoneFrame>
  );
}

function Profile({ profile }) {
  return (
    <PhoneFrame className="profile-page">
      <header className="profile-header">Account Settings</header>
      <section className="profile-details">
        <div className="avatar-wrap">
          <div className="avatar" aria-label="Bhuvan profile photo">B</div>
          <span className="camera" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M9 5.5h6l1.4 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3.6L9 5.5Z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
          </span>
        </div>
        <div className="identity">
          <strong>{profile.fullName}</strong>
          <span>{profile.email}</span>
        </div>
      </section>
      <p className="bio">
        Product enthusiast focused on building thoughtful digital experiences and growing through meaningful work.
      </p>
      <div className="profile-divider" />
    </PhoneFrame>
  );
}

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login setProfile={setProfile} />} />
      <Route path="/register" element={<Register setProfile={setProfile} />} />
      <Route path="/profile" element={<Profile profile={profile} />} />
    </Routes>
  );
}
