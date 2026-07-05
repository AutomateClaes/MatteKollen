import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { GRADE_LEVELS } from '../data/categories';
import { Settings, Play, CheckCircle2, Circle, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfigView.css';

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
                                        <Circle color="var(--color-primary)" size={32} fill="rgba(0,0,0,0.05)" style={{ opacity: 0.7 }} />
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
                                                                <Circle color={category.color} size={28} fill={`${category.color}10`} style={{ opacity: 0.7 }} />
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
                                                                                            <Circle color={category.color} size={24} fill={`${category.color}10`} style={{ opacity: 0.7 }} />
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
