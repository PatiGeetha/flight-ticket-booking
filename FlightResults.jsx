import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Clock, ChevronRight } from 'lucide-react';

const mockFlights = [
    {
        id: 'f1',
        airline: 'AeroPremium',
        departure: '08:00',
        arrival: '10:30',
        duration: '2h 30m',
        priceEconomy: 250,
        priceBusiness: 550,
    },
    {
        id: 'f2',
        airline: 'SkyHigh Airways',
        departure: '12:15',
        arrival: '15:00',
        duration: '2h 45m',
        priceEconomy: 280,
        priceBusiness: 600,
    },
    {
        id: 'f3',
        airline: 'Global Jets',
        departure: '18:45',
        arrival: '21:10',
        duration: '2h 25m',
        priceEconomy: 220,
        priceBusiness: 480,
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const FlightResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = location.state || { from: 'Anywhere', to: 'Anywhere', date: 'Any Date', passengers: 1 };

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {searchParams.from} <Plane size={24} className="text-muted" /> {searchParams.to}
                    </h2>
                    <p className="text-muted" style={{ marginTop: '0.5rem' }}>
                        {searchParams.date} • {searchParams.passengers} Passenger{searchParams.passengers > 1 ? 's' : ''}
                    </p>
                </div>
                <button className="btn btn-outline" onClick={() => navigate('/')}>
                    Modify Search
                </button>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
                {mockFlights.map((flight) => (
                    <motion.div key={flight.id} variants={itemVariants} className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>

                            {/* Airline and Times */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Plane size={18} /> {flight.airline}
                                </h4>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{flight.departure}</div>
                                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>{searchParams.from}</div>
                                    </div>

                                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span className="text-muted" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Clock size={14} /> {flight.duration}
                                        </span>
                                        <div style={{ width: '100%', height: '2px', background: 'var(--border-glass)', position: 'relative', margin: '0.5rem 0' }}>
                                            <Plane size={16} color="var(--primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                        </div>
                                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>Direct</span>
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{flight.arrival}</div>
                                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>{searchParams.to}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Cards */}
                            <div style={{ display: 'flex', gap: '1rem' }}>

                                {/* Economy Card */}
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        minWidth: '150px',
                                        transition: 'all var(--transition-normal)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-glass)'; e.currentTarget.style.background = 'var(--bg-glass)'; }}
                                    onClick={() => navigate(`/book/${flight.id}`, { state: { ...searchParams, flight, class: 'Economy', price: flight.priceEconomy } })}
                                >
                                    <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Economy</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>${flight.priceEconomy}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Select <ChevronRight size={16} />
                                    </div>
                                </div>

                                {/* Business Card */}
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        minWidth: '150px',
                                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                        transition: 'all var(--transition-normal)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
                                    onClick={() => navigate(`/book/${flight.id}`, { state: { ...searchParams, flight, class: 'Business', price: flight.priceBusiness } })}
                                >
                                    <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#c4b5fd' }}>
                                        Business 👑
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>${flight.priceBusiness}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Select <ChevronRight size={16} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FlightResults;
