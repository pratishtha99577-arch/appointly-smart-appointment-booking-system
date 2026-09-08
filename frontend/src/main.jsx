import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, CalendarDays, CheckCircle2, Clock3, LogIn,
  Menu, ShieldCheck, Sparkles, UserRound, X, LogOut, ChevronDown
} from 'lucide-react';
import './styles.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('appointly_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

const fallbackServices = [
  { id: 1, name: 'Strategy Consultation', description: 'Focused one-to-one consultation for planning your next move.', durationMinutes: 45, price: 1200 },
  { id: 2, name: 'Premium Session', description: 'A deeper session with dedicated time for analysis and recommendations.', durationMinutes: 60, price: 1800 },
  { id: 3, name: 'Quick Connect', description: 'A short session for focused questions and fast decisions.', durationMinutes: 20, price: 650 }
];

function App() {
  const [services, setServices] = useState(fallbackServices);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('appointly_user') || 'null'));
  const [auth, setAuth] = useState(null);
  const [booking, setBooking] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [toast, setToast] = useState('');
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    request('/services').then(setServices).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) request('/appointments/my').then(setAppointments).catch(() => {});
  }, [user]);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  }

  function saveSession(data) {
    const u = { id: data.userId, name: data.name, email: data.email, role: data.role };
    localStorage.setItem('appointly_token', data.token);
    localStorage.setItem('appointly_user', JSON.stringify(u));
    setUser(u);
    setAuth(null);
    notify(`Welcome, ${u.name.split(' ')[0]}!`);
  }

  function logout() {
    localStorage.removeItem('appointly_token');
    localStorage.removeItem('appointly_user');
    setUser(null);
    setAppointments([]);
    notify('You have been logged out.');
  }

  async function submitBooking(e) {
    e.preventDefault();
    if (!user) return setAuth('login');
    const form = new FormData(e.currentTarget);
    try {
      await request('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          serviceId: booking.id,
          appointmentDate: form.get('date'),
          appointmentTime: form.get('time')
        })
      });
      setBooking(null);
      setAppointments(await request('/appointments/my'));
      notify('Appointment confirmed successfully.');
    } catch (err) {
      notify(err.message);
    }
  }

  async function cancelAppointment(id) {
    try {
      await request(`/appointments/${id}/cancel`, { method: 'PATCH' });
      setAppointments(await request('/appointments/my'));
      notify('Appointment cancelled.');
    } catch (err) {
      notify(err.message);
    }
  }

  return (
    <div>
      <nav className="nav">
        <a className="brand" href="#top"><span className="brandMark">A</span>appointly</a>
        <div className={`navLinks ${mobile ? 'open' : ''}`}>
          <a href="#services" onClick={() => setMobile(false)}>Services</a>
          <a href="#how" onClick={() => setMobile(false)}>How it works</a>
          {user && <a href="#appointments" onClick={() => setMobile(false)}>My appointments</a>}
        </div>
        <div className="navActions">
          {user ? (
            <button className="profileBtn" onClick={logout}><UserRound size={17}/>{user.name.split(' ')[0]}<LogOut size={15}/></button>
          ) : (
            <button className="loginBtn" onClick={() => setAuth('login')}><LogIn size={16}/> Sign in</button>
          )}
          <button className="menuBtn" onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="heroGlow"/>
          <div className="heroCopy">
            <div className="eyebrow"><Sparkles size={15}/> SIMPLE. SMART. SCHEDULED.</div>
            <h1>Your time deserves a <em>better</em> booking experience.</h1>
            <p>Discover a calmer way to schedule consultations and sessions. Choose a service, pick a time, and you're done.</p>
            <div className="heroButtons">
              <a className="primary" href="#services">Explore services <ArrowRight size={18}/></a>
              {!user && <button className="secondary" onClick={() => setAuth('register')}>Create account</button>}
            </div>
            <div className="trustLine"><CheckCircle2 size={16}/> Secure JWT authentication <span/> <CheckCircle2 size={16}/> Instant confirmation</div>
          </div>
          <div className="heroCard">
            <div className="miniTop"><span>YOUR NEXT SESSION</span><span className="liveDot">● Live</span></div>
            <div className="dateBlock"><div className="bigDate">24</div><div><strong>October 2026</strong><small>Saturday</small></div></div>
            <div className="session"><div className="iconBox"><CalendarDays/></div><div><strong>Premium Session</strong><small>10:30 AM · 60 min</small></div><span className="confirmed">Confirmed</span></div>
            <div className="cardFooter"><ShieldCheck size={17}/> Protected & private</div>
          </div>
        </section>

        <section className="stats">
          <div><strong>3</strong><span>curated services</span></div>
          <div><strong>24/7</strong><span>booking access</span></div>
          <div><strong>100%</strong><span>secure authentication</span></div>
          <div><strong>1 click</strong><span>to manage bookings</span></div>
        </section>

        <section className="section" id="services">
          <div className="sectionHeading">
            <div><div className="eyebrow">CHOOSE YOUR EXPERIENCE</div><h2>Appointments made <em>simple.</em></h2></div>
            <p>Pick the session that fits your needs. Every service is designed around your time.</p>
          </div>
          <div className="serviceGrid">
            {services.map((s, i) => (
              <article className={`serviceCard ${i === 1 ? 'featured' : ''}`} key={s.id}>
                {i === 1 && <div className="popular">MOST POPULAR</div>}
                <div className="serviceIcon">{i === 0 ? <Sparkles/> : i === 1 ? <CalendarDays/> : <Clock3/>}</div>
                <h3>{s.name}</h3><p>{s.description}</p>
                <div className="serviceMeta"><span>{s.durationMinutes} min</span><strong>₹{Number(s.price).toLocaleString('en-IN')}</strong></div>
                <button onClick={() => user ? setBooking(s) : setAuth('login')} className="bookBtn">Book this service <ArrowRight size={17}/></button>
              </article>
            ))}
          </div>
        </section>

        <section className="how section" id="how">
          <div className="eyebrow">HOW IT WORKS</div><h2>From browsing to booked in <em>minutes.</em></h2>
          <div className="steps">
            <div><b>01</b><CalendarDays/><h3>Choose</h3><p>Pick the service that matches what you need.</p></div>
            <div><b>02</b><Clock3/><h3>Schedule</h3><p>Select your preferred date and time slot.</p></div>
            <div><b>03</b><CheckCircle2/><h3>Confirm</h3><p>Your booking is securely saved to your account.</p></div>
          </div>
        </section>

        {user && (
          <section className="section appointments" id="appointments">
            <div className="sectionHeading"><div><div className="eyebrow">YOUR SPACE</div><h2>My <em>appointments.</em></h2></div></div>
            {appointments.length === 0 ? <div className="empty">No appointments yet. Choose a service above to get started.</div> :
              <div className="appointmentList">{appointments.map(a => (
                <div className="appointmentRow" key={a.id}>
                  <div className="iconBox"><CalendarDays/></div>
                  <div><strong>{a.service}</strong><small>{a.appointmentDate} · {a.appointmentTime} · {a.durationMinutes} min</small></div>
                  <span className={a.status === 'BOOKED' ? 'status' : 'status cancelled'}>{a.status}</span>
                  {a.status === 'BOOKED' && <button className="cancel" onClick={() => cancelAppointment(a.id)}>Cancel</button>}
                </div>
              ))}</div>}
          </section>
        )}
      </main>

      <footer><div className="brand"><span className="brandMark">A</span>appointly</div><p>Smart scheduling, thoughtfully designed.</p><span>© 2026 Appointly</span></footer>

      {auth && <AuthModal mode={auth} onClose={() => setAuth(null)} onSuccess={saveSession}/>}
      {booking && <BookingModal service={booking} onClose={() => setBooking(null)} onSubmit={submitBooking}/>}
      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    </div>
  );
}

function AuthModal({ mode, onClose, onSuccess }) {
  const [login, setLogin] = useState(mode === 'login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      const data = await request(login ? '/auth/login' : '/auth/register', {
        method: 'POST',
        body: JSON.stringify(login
          ? { email: f.get('email'), password: f.get('password') }
          : { name: f.get('name'), email: f.get('email'), password: f.get('password') })
      });
      onSuccess(data);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  return <div className="overlay"><div className="modal">
    <button className="close" onClick={onClose}><X/></button>
    <div className="modalIcon">{login ? <LogIn/> : <Sparkles/>}</div>
    <div className="eyebrow">{login ? 'WELCOME BACK' : 'GET STARTED'}</div>
    <h2>{login ? 'Sign in to Appointly' : 'Create your account'}</h2>
    <p className="modalSub">{login ? 'Manage your appointments in one place.' : 'Book appointments in just a few steps.'}</p>
    <form onSubmit={submit}>
      {!login && <label>Name<input name="name" placeholder="Your name" required /></label>}
      <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
      <label>Password<input name="password" type="password" placeholder="Minimum 8 characters" minLength="8" required /></label>
      {error && <div className="error">{error}</div>}
      <button className="primary full" disabled={loading}>{loading ? 'Please wait…' : login ? 'Sign in' : 'Create account'} <ArrowRight size={17}/></button>
    </form>
    <button className="switch" onClick={() => setLogin(!login)}>{login ? 'New here? Create an account' : 'Already have an account? Sign in'}</button>
  </div></div>
}

function BookingModal({ service, onClose, onSubmit }) {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0,10);
  return <div className="overlay"><div className="modal bookingModal">
    <button className="close" onClick={onClose}><X/></button>
    <div className="eyebrow">BOOK A SESSION</div><h2>{service.name}</h2>
    <p className="modalSub">{service.description}</p>
    <div className="selectedService"><Clock3 size={18}/><span>{service.durationMinutes} minutes</span><strong>₹{Number(service.price).toLocaleString('en-IN')}</strong></div>
    <form onSubmit={onSubmit}>
      <label>Date<input name="date" type="date" min={tomorrow} required /></label>
      <label>Time<input name="time" type="time" min="09:00" max="19:00" required /></label>
      <button className="primary full">Confirm appointment <CheckCircle2 size={17}/></button>
    </form>
  </div></div>
}

createRoot(document.getElementById('root')).render(<App />);
