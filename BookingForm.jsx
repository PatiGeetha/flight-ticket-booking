import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, ShieldCheck, CreditCard } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    if (!bookingData) {
        navigate('/');
        return null;
    }

    const { flight, class: flightClass, price, passengers } = bookingData;
    const total = price * passengers;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                flightDetails: flight,
                route: { from: bookingData.from, to: bookingData.to },
                travelDate: bookingData.date,
                flightClass: flightClass,
                passengersCount: passengers,
                passengerDetails: formData,
                totalPrice: total,
                bookingDate: new Date().toISOString(),
                status: "confirmed"
            });

            // Navigate to confirmation
            navigate('/confirmation', {
                state: { ...bookingData, passengerDetails: formData, total, bookingId: docRef.id }
            });

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("There was an error saving your booking. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 style={{ marginBottom: '2rem' }}>Passenger Details</h2>

                    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Personal Information</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label">First Name</label>
                                <div className="input-icon-wrapper">
                                    <User className="input-icon" size={20} />
                                    <input type="text" name="firstName" className="input-field input-with-icon" value={formData.firstName} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Last Name</label>
                                <div className="input-icon-wrapper">
                                    <User className="input-icon" size={20} />
                                    <input type="text" name="lastName" className="input-field input-with-icon" value={formData.lastName} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <div className="input-icon-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input type="email" name="email" className="input-field input-with-icon" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: '2rem' }}>
                            <label className="input-label">Mobile Number</label>
                            <div className="input-icon-wrapper">
                                <Phone className="input-icon" size={20} />
                                <input type="tel" name="phone" className="input-field input-with-icon" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>



                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.125rem' }}>
                            Confirm Booking • ${total}
                        </button>
                        <p className="text-muted" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                            <ShieldCheck size={16} color="var(--primary)" /> Secure 256-bit encryption
                        </p>
                    </form>
                </motion.div>

                {/* Summary Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                            Booking Summary
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted">Airline</span>
                                <span style={{ fontWeight: 500 }}>{flight.airline}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted">Route</span>
                                <span style={{ fontWeight: 500 }}>{bookingData.from} → {bookingData.to}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted">Date</span>
                                <span style={{ fontWeight: 500 }}>{bookingData.date}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted">Class</span>
                                <span style={{ fontWeight: 500, color: flightClass === 'Business' ? 'var(--accent)' : 'var(--primary)' }}>
                                    {flightClass}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted">Passengers</span>
                                <span style={{ fontWeight: 500 }}>{passengers}</span>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px dashed var(--border-glass)', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-muted">Ticket Price (x{passengers})</span>
                                <span>${price * passengers}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span className="text-muted">Taxes & Fees</span>
                                <span>$0</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>${total}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default BookingForm;
