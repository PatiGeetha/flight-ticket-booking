import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Plane, Calendar, MapPin, Download, Home } from 'lucide-react';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    if (!bookingData) {
        navigate('/');
        return null;
    }

    const { flight, passengerDetails, from, to, date, class: flightClass, passengers, total, bookingId } = bookingData;
    const bookingReference = bookingId || Math.random().toString(36).substring(2, 8).toUpperCase();

    return (
        <div className="container" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                className="glass-card"
                style={{ maxWidth: '600px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
                >
                    <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1.5rem', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }} />
                </motion.div>

                <h2 style={{ marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    Thank you, {passengerDetails.firstName}. Your flight has been successfully booked.
                </p>

                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left', marginBottom: '2rem', background: 'rgba(15, 23, 42, 0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                        <span className="text-muted">Booking Reference</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--primary)' }}>
                            {bookingReference}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Plane size={14} /> Flight
                            </div>
                            <div style={{ fontWeight: 500 }}>{flight.airline} • {flightClass}</div>
                        </div>

                        <div>
                            <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Calendar size={14} /> Date
                            </div>
                            <div style={{ fontWeight: 500 }}>{date}</div>
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <MapPin size={14} /> Route
                            </div>
                            <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {from} <Plane size={16} className="text-muted" style={{ transform: 'rotate(90deg)' }} /> {to}
                            </div>
                        </div>

                        <div>
                            <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Passengers</div>
                            <div style={{ fontWeight: 500 }}>{passengers}</div>
                        </div>

                        <div>
                            <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Paid</div>
                            <div style={{ fontWeight: 600, color: '#10b981' }}>${total}</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-outline" onClick={() => navigate('/')}>
                        <Home size={18} /> Return Home
                    </button>
                    <button className="btn btn-primary" onClick={() => window.print()}>
                        <Download size={18} /> Download Ticket
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default Confirmation;
