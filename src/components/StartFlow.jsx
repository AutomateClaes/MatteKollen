import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { loginWithGoogle, listProfiles, createProfile, activateProfile } from '../sync';
import './StartFlow.css';

// Inloggning + profilval. Visas bara tills enheten är uppsatt:
// därefter startar appen direkt i spelet precis som tidigare.
export default function StartFlow() {
    const { user, authLoading, enterLocalMode } = useAuthStore();
    const [profiles, setProfiles] = useState(null);
    const [newName, setNewName] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            listProfiles()
                .then(setProfiles)
                .catch(() => setError('Kunde inte hämta profiler. Kontrollera internet.'));
        }
    }, [user]);

    const handleLogin = async () => {
        setError(null);
        setBusy(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            console.error(err);
            setError('Inloggningen misslyckades. Försök igen.');
        } finally {
            setBusy(false);
        }
    };

    const handleCreate = async () => {
        const name = newName.trim();
        if (!name) return;
        setBusy(true);
        try {
            const profile = await createProfile(name);
            await activateProfile(profile);
        } catch (err) {
            console.error(err);
            setError('Kunde inte skapa profilen.');
            setBusy(false);
        }
    };

    const handlePick = async (profile) => {
        setBusy(true);
        try {
            await activateProfile({ id: profile.id, name: profile.name });
        } catch (err) {
            console.error(err);
            setError('Kunde inte ladda profilen.');
            setBusy(false);
        }
    };

    if (authLoading) {
        return <div className="start-container"><p className="start-muted">Laddar…</p></div>;
    }

    // Steg 1: inte inloggad
    if (!user) {
        return (
            <div className="start-container">
                <motion.div className="start-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="start-logo">MatteKollen</h1>
                    <p className="start-sub">Logga in som förälder för att spara framsteg i molnet och följa barnens utveckling.</p>
                    <button className="btn-google" onClick={handleLogin} disabled={busy}>
                        <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
                        Logga in med Google
                    </button>
                    <button className="btn-local" onClick={enterLocalMode}>
                        Spela utan konto (sparas bara på den här enheten)
                    </button>
                    {error && <p className="start-error">{error}</p>}
                </motion.div>
            </div>
        );
    }

    // Steg 2: inloggad — välj eller skapa profil
    return (
        <div className="start-container">
            <motion.div className="start-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="start-logo">Vem ska öva?</h1>
                <p className="start-sub">Välj barnets profil för den här enheten.</p>

                {profiles === null && !error && <p className="start-muted">Hämtar profiler…</p>}

                <div className="profile-list">
                    {(profiles || []).map(p => (
                        <button key={p.id} className="profile-btn" onClick={() => handlePick(p)} disabled={busy}>
                            <span className="profile-avatar">{p.name.slice(0, 1).toUpperCase()}</span>
                            {p.name}
                        </button>
                    ))}
                </div>

                <div className="profile-create">
                    <input
                        type="text"
                        placeholder="Nytt barns namn…"
                        value={newName}
                        maxLength={30}
                        onChange={e => setNewName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                    />
                    <button className="btn-create" onClick={handleCreate} disabled={busy || !newName.trim()}>
                        Skapa profil
                    </button>
                </div>

                {error && <p className="start-error">{error}</p>}
                <p className="start-muted start-account">Inloggad som {user.email}</p>
            </motion.div>
        </div>
    );
}
