import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { GRADE_LEVELS } from '../data/categories';
import { Settings, Play, CheckCircle2, Circle, MinusCircle, ChevronDown, ChevronRight, Trash2, Users, LogOut, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import {
    logout, fetchFamilyOverview, stopSync, loginWithGoogle, listProfiles,
    createProfile, activateProfile, requestDeviceLink, getPendingLinkRequest,
    cancelDeviceLink, unlinkDevice, fetchPendingLinkRequests,
    approveLinkRequest, denyLinkRequest,
} from '../sync';
import './ConfigView.css';

function FamilySection() {
    const { user, profile, linkedFamily, authLoading, syncState, clearProfile } = useAuthStore();
    const [overview, setOverview] = useState(null);
    const [loadingOverview, setLoadingOverview] = useState(false);
    const [profiles, setProfiles] = useState(null);
    const [newName, setNewName] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const [linkMode, setLinkMode] = useState(false);
    const [linkEmail, setLinkEmail] = useState('');
    const [waitingApproval, setWaitingApproval] = useState(false);
    const [linkRequests, setLinkRequests] = useState([]);

    const isParent = !!user && !user.isAnonymous;
    const isLinkedChild = !!user?.isAnonymous && !!linkedFamily;

    React.useEffect(() => {
        if (isParent) {
            listProfiles()
                .then(setProfiles)
                .catch(() => setError('Kunde inte hämta profiler. Kontrollera internet.'));
            fetchPendingLinkRequests().then(setLinkRequests).catch(() => { });
        }
    }, [isParent]);

    React.useEffect(() => {
        if (user?.isAnonymous && !linkedFamily) {
            getPendingLinkRequest().then(p => { if (p) setWaitingApproval(true); });
        }
    }, [user, linkedFamily]);

    const showOverview = async () => {
        setLoadingOverview(true);
        try {
            setOverview(await fetchFamilyOverview());
        } catch {
            setOverview([]);
        } finally {
            setLoadingOverview(false);
        }
    };

    const rowStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' };
    const btnStyle = { display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 0.9rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', cursor: 'pointer' };
    const sectionStyle = { background: 'rgba(255,255,255,0.6)', padding: '0.7rem 1rem', borderRadius: '12px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' };

    if (authLoading) return null;

    // Kopplad barnenhet: visar profil och synkstatus
    if (isLinkedChild) {
        const syncLabel = { loading: 'synkar…', synced: 'synkad ✓', error: 'synkfel!', idle: '' }[syncState] || '';
        return (
            <div className="family-section glass" style={{ ...sectionStyle, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Users size={18} color="var(--color-primary)" />
                <strong>{linkedFamily.profileName}</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>kopplad till förälder · {syncLabel}</span>
                <span style={{ flex: 1 }} />
                <button style={btnStyle} onClick={() => {
                    if (window.confirm('Koppla från enheten? Framstegen finns kvar i molnet.')) unlinkDevice();
                }}>Koppla från</button>
            </div>
        );
    }

    // Barnenhet som väntar på förälderns godkännande
    if (user?.isAnonymous && waitingApproval) {
        return (
            <div className="family-section glass" style={{ ...sectionStyle, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', flex: 1, minWidth: '200px' }}>
                    ⏳ Väntar på godkännande — öppna MatteKollen på förälderns enhet, gå till inställningarna och godkänn kopplingen.
                </span>
                <button style={btnStyle} onClick={async () => {
                    await cancelDeviceLink();
                    setWaitingApproval(false);
                }}>Avbryt</button>
            </div>
        );
    }

    // Inte inloggad (eller anonym utan koppling): erbjud molnsynk
    if (!isParent) {
        return (
            <div className="family-section glass" style={sectionStyle}>
                <div style={rowStyle}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', flex: 1, minWidth: '200px' }}>
                        Framsteg sparas bara på den här enheten. Synka genom att logga in — eller koppla barnets enhet till en förälder.
                    </span>
                </div>
                <div style={rowStyle}>
                    <button style={btnStyle} disabled={busy} onClick={async () => {
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
                    }}>
                        <Users size={15} /> Logga in med Google (förälder)
                    </button>
                    {!linkMode && (
                        <button style={btnStyle} onClick={() => setLinkMode(true)}>
                            Koppla till förälders konto
                        </button>
                    )}
                </div>
                {linkMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="Förälderns e-postadress…"
                            value={linkEmail}
                            onChange={e => setLinkEmail(e.target.value)}
                            style={{ flex: 1, minWidth: '200px', padding: '0.5rem 0.8rem', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}
                        />
                        <button style={btnStyle} disabled={busy || !linkEmail.includes('@')} onClick={async () => {
                            setError(null);
                            setBusy(true);
                            try {
                                await requestDeviceLink(linkEmail);
                                setWaitingApproval(true);
                            } catch (err) {
                                console.error(err);
                                setError('Kunde inte skicka förfrågan. Kontrollera internet.');
                            } finally {
                                setBusy(false);
                            }
                        }}>
                            Skicka förfrågan
                        </button>
                    </div>
                )}
                {error && <span style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>{error}</span>}
            </div>
        );
    }

    // Förälderns väntande parkopplingsförfrågningar (visas i båda förälderlägena)
    const requestsBlock = linkRequests.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#FFF7E6', borderRadius: '8px', padding: '0.6rem 0.8rem', border: '1px solid #FFD591' }}>
            {linkRequests.map(req => (
                <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.9rem' }}>📱 En enhet vill kopplas — välj profil:</span>
                    {(profiles || []).map(p => (
                        <button key={p.id} style={btnStyle} onClick={async () => {
                            try {
                                await approveLinkRequest(req, p);
                                setLinkRequests(rs => rs.filter(r => r.id !== req.id));
                            } catch { setError('Kunde inte godkänna.'); }
                        }}>
                            ✓ {p.name}
                        </button>
                    ))}
                    <button style={{ ...btnStyle, color: 'var(--color-error)' }} onClick={async () => {
                        await denyLinkRequest(req);
                        setLinkRequests(rs => rs.filter(r => r.id !== req.id));
                    }}>Neka</button>
                </div>
            ))}
        </div>
    );

    // Inloggad men ingen profil vald för enheten: profilväljare
    if (!profile) {
        return (
            <div className="family-section glass" style={sectionStyle}>
                <div style={rowStyle}>
                    <Users size={18} color="var(--color-primary)" />
                    <strong>Vem övar på den här enheten?</strong>
                    <span style={{ flex: 1 }} />
                    <button style={btnStyle} onClick={logout}><LogOut size={15} /> Logga ut</button>
                </div>
                {requestsBlock}
                {profiles === null && !error && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Hämtar profiler…</span>}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(profiles || []).map(p => (
                        <button key={p.id} style={btnStyle} disabled={busy} onClick={async () => {
                            setBusy(true);
                            try { await activateProfile({ id: p.id, name: p.name }); }
                            catch { setError('Kunde inte ladda profilen.'); setBusy(false); }
                        }}>
                            {p.name}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Nytt barns namn…"
                        value={newName}
                        maxLength={30}
                        onChange={e => setNewName(e.target.value)}
                        style={{ flex: 1, padding: '0.5rem 0.8rem', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}
                    />
                    <button style={btnStyle} disabled={busy || !newName.trim()} onClick={async () => {
                        setBusy(true);
                        try {
                            const p = await createProfile(newName.trim());
                            await activateProfile(p);
                        } catch { setError('Kunde inte skapa profilen.'); setBusy(false); }
                    }}>
                        Skapa profil
                    </button>
                </div>
                {error && <span style={{ color: 'var(--color-error)', fontSize: '0.85rem' }}>{error}</span>}
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Enhetens nuvarande framsteg blir profilens startläge om profilen är ny. Inloggad som {user.email}</span>
            </div>
        );
    }

    const syncLabel = { loading: 'synkar…', synced: 'synkad ✓', error: 'synkfel!', idle: '' }[syncState] || '';

    return (
        <div className="family-section glass" style={{ background: 'rgba(255,255,255,0.6)', padding: '0.7rem 1rem', borderRadius: '12px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={rowStyle}>
                <Users size={18} color="var(--color-primary)" />
                <strong>{profile.name}</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{syncLabel}</span>
                <span style={{ flex: 1 }} />
                <button style={btnStyle} onClick={() => { stopSync(); clearProfile(); }}>
                    <RefreshCw size={15} /> Byt profil
                </button>
                <button style={btnStyle} onClick={logout}>
                    <LogOut size={15} /> Logga ut
                </button>
            </div>
            {requestsBlock}
            <div>
                {overview === null ? (
                    <button style={btnStyle} onClick={showOverview} disabled={loadingOverview}>
                        {loadingOverview ? 'Hämtar…' : 'Visa familjeöversikt'}
                    </button>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {overview.map(p => (
                            <div key={p.id} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', flexWrap: 'wrap', background: 'white', borderRadius: '8px', padding: '0.5rem 0.8rem' }}>
                                <strong style={{ minWidth: '6rem' }}>{p.name}</strong>
                                <span>⭐ {p.points} p</span>
                                <span>✅ {p.totalSolved} lösta</span>
                                <span>👁 {p.revealedCount} visade svar</span>
                                <span style={{ color: 'var(--color-text-muted)' }}>
                                    {p.lastActivity ? `senast ${new Date(p.lastActivity).toLocaleDateString('sv-SE')}` : 'ingen aktivitet än'}
                                </span>
                            </div>
                        ))}
                        {overview.length === 0 && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Kunde inte hämta översikten.</span>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ConfigView({ onStartPlay }) {
    const { activeTasks, toggleTask, toggleSubcategory, toggleCategory, toggleGradeLevel, getLatestScore, masteryThreshold, setMasteryThreshold, resetProgress } = useStore();
    const [expandedGrades, setExpandedGrades] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleGradeExpand = (gradeId) => {
        setExpandedGrades(prev => ({ ...prev, [gradeId]: !prev[gradeId] }));
    };

    const toggleCategoryExpand = (categoryId) => {
        setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    const handleToggleTask = (taskId) => {
        toggleTask(taskId);
    };

    const handleToggleSubcategory = (subcategoryId) => {
        toggleSubcategory(subcategoryId);
    };

    const handleToggleCategory = (categoryId) => {
        toggleCategory(categoryId);
    };

    const handleToggleGrade = (gradeId) => {
        toggleGradeLevel(gradeId);
    };

    const getPercentageColor = (score, outOf) => {
        if (outOf === 0) return 'var(--color-text-muted)';
        const pct = score / outOf;
        if (pct >= 0.8) return 'var(--color-success)';
        if (pct >= 0.5) return 'var(--color-accent)';
        return 'var(--color-error)';
    };

    return (
        <div className="config-container">
            <header className="config-header">
                <div className="header-title">
                    <Settings size={32} color="var(--color-primary)" />
                    <h1>MatteKollen - Inställningar</h1>
                </div>
                <p>Välj vilka kategorier eleven ska öva på. Vi bygger lärande från grunden!</p>

                <div className="config-controls" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.6)', padding: '0.5rem 1rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <label htmlFor="mastery-input" style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--color-text)' }}>Krav för Mästarnivå:</label>
                        <input
                            id="mastery-input"
                            type="number"
                            min="1"
                            max="100"
                            value={masteryThreshold}
                            onChange={(e) => setMasteryThreshold(parseInt(e.target.value) || 5)}
                            style={{ width: '60px', padding: '0.4rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', textAlign: 'center' }}
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm('Är du säker på att du vill nollställa all historik, mästarnivåer och poäng?')) {
                                resetProgress();
                            }
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffebee', color: '#d32f2f', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #ffcdd2', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <Trash2 size={18} />
                        Nollställ Resultat
                    </button>
                </div>

                <FamilySection />
            </header>

            <div className="categories-list">
                {GRADE_LEVELS.map((grade) => {
                    const allGradeTaskIds = grade.categories.flatMap(cat => cat.subcategories.flatMap(s => s.tasks.map(t => t.id)));
                    const gradeAllActive = allGradeTaskIds.length > 0 && allGradeTaskIds.every(id => activeTasks.includes(id));
                    const gradeSomeActive = allGradeTaskIds.some(id => activeTasks.includes(id));

                    return (
                        <div key={grade.id} className="grade-section">
                            <motion.div
                                className="grade-header glass"
                                onClick={() => handleToggleGrade(grade.id)}
                            >
                                <div className="toggle-icon">
                                    {gradeAllActive ? (
                                        <CheckCircle2 color="var(--color-primary)" size={32} fill="var(--color-primary-light)" />
                                    ) : gradeSomeActive ? (
                                        <MinusCircle color="white" size={32} fill="var(--color-primary)" />
                                    ) : (
                                        <Circle color="var(--color-text-muted)" size={32} />
                                    )}
                                </div>
                                <h1 style={{ margin: 0, flex: 1 }}>{grade.name}</h1>
                                <div
                                    onClick={(e) => { e.stopPropagation(); toggleGradeExpand(grade.id); }}
                                    style={{ cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                                >
                                    {expandedGrades[grade.id] ? <ChevronDown size={28} color="var(--color-text-muted)" /> : <ChevronRight size={28} color="var(--color-text-muted)" />}
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {expandedGrades[grade.id] && (
                                    <motion.div
                                        className="grade-categories"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {grade.categories.map((category) => {
                                            const catTaskIds = category.subcategories.flatMap(s => s.tasks.map(t => t.id));
                                            const allActive = catTaskIds.length > 0 && catTaskIds.every(id => activeTasks.includes(id));
                                            const someActive = catTaskIds.some(id => activeTasks.includes(id));

                                            return (
                                                <motion.div
                                                    key={category.id}
                                                    className="category-card"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{ '--cat-color': category.color }}
                                                >
                                                    <div
                                                        className="category-header glass"
                                                        style={{
                                                            backgroundColor: `${category.color}20`,
                                                            borderLeft: `6px solid ${category.color}`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => handleToggleCategory(category.id)}
                                                    >
                                                        <div className="toggle-icon">
                                                            {allActive ? (
                                                                <CheckCircle2 color={category.color} size={28} fill={`${category.color}30`} />
                                                            ) : someActive ? (
                                                                <MinusCircle color="white" size={28} fill={category.color} />
                                                            ) : (
                                                                <Circle color="var(--color-text-muted)" size={28} />
                                                            )}
                                                        </div>
                                                        <h2 style={{ margin: 0, flex: 1 }}>{category.name}</h2>
                                                        <div
                                                            onClick={(e) => { e.stopPropagation(); toggleCategoryExpand(category.id); }}
                                                            style={{ cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                                                        >
                                                            {expandedCategories[category.id] ? <ChevronDown size={28} color="var(--color-text-muted)" /> : <ChevronRight size={28} color="var(--color-text-muted)" />}
                                                        </div>
                                                    </div>

                                                    <AnimatePresence>
                                                        {expandedCategories[category.id] && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                style={{ overflow: 'hidden' }}
                                                            >
                                                                <div className="subcategories">
                                                                    {category.subcategories.map((sub) => {
                                                                        const subTaskIds = sub.tasks.map(t => t.id);
                                                                        const subAllActive = subTaskIds.length > 0 && subTaskIds.every(id => activeTasks.includes(id));
                                                                        const subSomeActive = subTaskIds.some(id => activeTasks.includes(id));

                                                                        return (
                                                                            <div key={sub.id} className="subcategory-section" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                                                                <div
                                                                                    className={`subcategory-row ${subAllActive ? 'active' : ''}`}
                                                                                    onClick={() => handleToggleSubcategory(sub.id)}
                                                                                    style={{
                                                                                        fontWeight: sub.tasks.length > 1 ? 'bold' : 'normal',
                                                                                        paddingBottom: sub.tasks.length > 1 ? '0.5rem' : '1rem'
                                                                                    }}
                                                                                >
                                                                                    <div className="toggle-icon">
                                                                                        {subAllActive ? (
                                                                                            <CheckCircle2 color={category.color} size={24} fill={`${category.color}30`} />
                                                                                        ) : subSomeActive ? (
                                                                                            <MinusCircle color="white" size={24} fill={category.color} />
                                                                                        ) : (
                                                                                            <Circle color="var(--color-text-muted)" size={24} />
                                                                                        )}
                                                                                    </div>

                                                                                    <div className="sub-info">
                                                                                        <span className="sub-name">{sub.name}</span>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Always list them below */}
                                                                                <div className="task-list" style={{ paddingLeft: '3rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                                    {sub.tasks.map(task => {
                                                                                        const isTaskActive = activeTasks.includes(task.id);
                                                                                        const { score, outOf, isMastered } = getLatestScore(task.id);

                                                                                        return (
                                                                                            <div
                                                                                                key={task.id}
                                                                                                className={`subcategory-row ${isTaskActive ? 'active' : ''}`}
                                                                                                onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    if (!isMastered) handleToggleTask(task.id);
                                                                                                }}
                                                                                                style={{
                                                                                                    opacity: isMastered ? 0.6 : 1,
                                                                                                    cursor: isMastered ? 'default' : 'pointer',
                                                                                                    padding: '0.5rem 1rem',
                                                                                                    minHeight: '40px',
                                                                                                    background: isTaskActive ? `${category.color}05` : 'transparent',
                                                                                                    borderRadius: '8px'
                                                                                                }}
                                                                                            >
                                                                                                <div className="toggle-icon">
                                                                                                    {isMastered ? (
                                                                                                        <CheckCircle2 color="var(--color-success)" size={20} fill="#e8f5e9" />
                                                                                                    ) : isTaskActive ? (
                                                                                                        <CheckCircle2 color={category.color} size={20} fill={`${category.color}30`} />
                                                                                                    ) : (
                                                                                                        <Circle color="var(--color-text-muted)" size={20} />
                                                                                                    )}
                                                                                                </div>

                                                                                                <div className="sub-info">
                                                                                                    <span className="sub-name" style={{ fontSize: '0.95em', color: 'var(--color-text-muted)' }}>{task.name}</span>
                                                                                                </div>

                                                                                                <div className="score-badge glass" style={{ borderColor: isMastered ? 'var(--color-success)' : 'transparent', padding: '2px 8px', minWidth: 'auto', minHeight: 'auto' }}>
                                                                                                    {isMastered ? (
                                                                                                        <span style={{ color: 'var(--color-success)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8em' }}>
                                                                                                            Mästare 🌟
                                                                                                        </span>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            <span style={{ color: getPercentageColor(score, outOf), fontWeight: 800, fontSize: '0.9em' }}>
                                                                                                                {score}
                                                                                                            </span>
                                                                                                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75em', marginLeft: '2px' }}>
                                                                                                                /{outOf === 0 ? '-' : outOf}
                                                                                                            </span>
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            <div className="action-footer glass">
                <p className="active-count">
                    {activeTasks.length} valda övningar
                </p>
                <button
                    className="btn-play"
                    onClick={onStartPlay}
                    disabled={activeTasks.length === 0}
                >
                    <Play size={20} fill="white" />
                    <span>Börja Spela</span>
                </button>
            </div>
        </div>
    );
}
