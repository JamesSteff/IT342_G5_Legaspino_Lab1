import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.logo}>QuickContacts</h1>
                <nav>
                    <button onClick={() => navigate('/login')} style={styles.navBtn}>Login</button>
                    <button onClick={() => navigate('/register')} style={styles.registerBtn}>Get Started</button>
                </nav>
            </header>

            <main style={styles.hero}>
                <h2 style={styles.headline}>Manage your Google Contacts <br/> <span style={{color: '#1a73e8'}}>Simplified & Secure</span></h2>
                <p style={styles.subtext}>
                    QuickContacts helps you sync, view, and manage your Google People API contacts 
                    all in one clean dashboard.
                </p>
                <div style={styles.heroButtons}>
                    <button onClick={() => navigate('/register')} style={styles.ctaBtn}>Try QuickContacts Now</button>
                </div>
            </main>

            <section style={styles.features}>
                <div style={styles.featureCard}>
                    <h3>Secure Login</h3>
                    <p>JWT-based authentication linked to your local MySQL database.</p>
                </div>
                <div style={styles.featureCard}>
                    <h3>Google Sync</h3>
                    <p>Real-time integration with Google People API via OAuth2.</p>
                </div>
                <div style={styles.featureCard}>
                    <h3>Clean UI</h3>
                    <p>Minimalist design focused on user experience and speed.</p>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: { fontFamily: 'Arial, sans-serif', color: '#333' },
    header: { 
        display: 'flex', justifyContent: 'space-between', padding: '20px 50px', 
        alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' 
    },
    logo: { color: '#1a73e8', margin: 0, fontSize: '24px', fontWeight: 'bold' },
    navBtn: { background: 'none', border: 'none', cursor: 'pointer', marginRight: '20px', fontWeight: 'bold' },
    registerBtn: { 
        padding: '10px 20px', backgroundColor: '#1a73e8', color: '#fff', 
        border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
    },
    hero: { textAlign: 'center', padding: '100px 20px', backgroundColor: '#f8f9fa' },
    headline: { fontSize: '42px', marginBottom: '20px' },
    subtext: { fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px', color: '#555' },
    ctaBtn: { 
        padding: '15px 30px', fontSize: '18px', backgroundColor: '#34a853', 
        color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
    },
    features: { display: 'flex', justifyContent: 'center', gap: '20px', padding: '50px' },
    featureCard: { 
        padding: '20px', width: '250px', textAlign: 'center', 
        borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
    }
};

export default Home;