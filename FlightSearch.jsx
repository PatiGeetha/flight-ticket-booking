import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search, ArrowRightLeft } from 'lucide-react';

const FlightSearch = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: 1,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchData.from && searchData.to && searchData.date) {
            navigate('/results', { state: searchData });
        } else {
            alert("Please fill in from, to, and date fields.");
        }
    };

    const handleSwap = () => {
        setSearchData(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from
        }));
    };

    return (
        <motion.div
            className="hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="glass-panel" style={{ display: 'inline-block', padding: '0.5rem 1rem', marginBottom: '2rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary)', border: '1px solid var(--border-focus)' }}>
                ✨ Premium Flight Experience
            </div>

            <h1 className="hero-title">
                Discover the world with <br />
                <span className="text-gradient">unmatched comfort</span>
            </h1>

            <p className="hero-subtitle text-muted">
                Book your next premium flight in seconds with our beautiful, modern platform.
            </p>

            <motion.form
                className="glass-card search-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSearch}
            >
                <div className="search-grid">
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">From</label>
                        <div className="input-icon-wrapper">
                            <MapPin className="input-icon" size={20} />
                            <input
                                type="text"
                                className="input-field input-with-icon"
                                placeholder="Departure City"
                                value={searchData.from}
                                onChange={e => setSearchData({ ...searchData, from: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline btn-icon-only swap-btn"
                        onClick={handleSwap}
                        style={{ marginBottom: '0.25rem' }}
                        title="Swap Locations"
                    >
                        <ArrowRightLeft size={20} color="var(--primary)" />
                    </button>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">To</label>
                        <div className="input-icon-wrapper">
                            <MapPin className="input-icon" size={20} />
                            <input
                                type="text"
                                className="input-field input-with-icon"
                                placeholder="Destination City"
                                value={searchData.to}
                                onChange={e => setSearchData({ ...searchData, to: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Date</label>
                        <div className="input-icon-wrapper">
                            <Calendar className="input-icon" size={20} />
                            <input
                                type="date"
                                className="input-field input-with-icon"
                                value={searchData.date}
                                onChange={e => setSearchData({ ...searchData, date: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                    <div className="input-group" style={{ width: 'auto', marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <Users className="text-muted" size={20} style={{ marginRight: '0.5rem' }} />
                        <select
                            className="input-field"
                            style={{ padding: '0.5rem 1rem', width: '120px' }}
                            value={searchData.passengers}
                            onChange={e => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num} style={{ background: 'var(--bg-dark)' }}>
                                    {num} Passenger{num > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                        <Search size={20} />
                        Search Flights
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default FlightSearch;
