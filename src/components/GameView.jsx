import React, { useState, useEffect, Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return <div style={{ padding: '2rem', color: 'red', background: 'white', zIndex: 9999, border: '5px solid red' }}>
                <h2>App Crashed!</h2>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</pre>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.stack}</pre>
            </div>;
        }
        return this.props.children;
    }
}
import { useStore } from '../store/useStore';
import { getGradeTaskIdSequence } from '../data/categories';
import { generateTask } from '../game/taskGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import './GameView.css';

export default function GameView({ onBack }) {
    const { activeTasks, logResult, points, addPoints, history, getLatestScore, toggleTask } = useStore();
    const [currentTask, setCurrentTask] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [taskStartTime, setTaskStartTime] = useState(null);
    const [allMastered, setAllMastered] = useState(false);
    const [spellingInput, setSpellingInput] = useState('');
    const [spellingShake, setSpellingShake] = useState(false);
    const [revealedAnswer, setRevealedAnswer] = useState(false);

    const speakWord = (word) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.85;
        window.speechSynthesis.speak(utter);
    };

    useEffect(() => {
        loadNextTask();
    }, []);

    // Auto-speak word when a spelling task loads
    useEffect(() => {
        if (currentTask?.type === 'spelling') {
            setSpellingInput('');
            setTimeout(() => speakWord(currentTask.wordToSpeak), 400);
        }
    }, [currentTask?.id]);

    const loadNextTask = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAttempts(0);
        setWrongAnswers([]);
        setAllMastered(false);
        setRevealedAnswer(false);

        // Progression: uppgifter serveras från lägsta årskursen med
        // oklarade aktiva uppgifter — nästa årskurs börjar när den är klar
        let activeNotMastered = [];
        for (const grade of getGradeTaskIdSequence()) {
            const unmastered = activeTasks.filter(taskId =>
                grade.taskIds.includes(taskId) && !getLatestScore(taskId).isMastered
            );
            if (unmastered.length > 0) {
                activeNotMastered = unmastered;
                break;
            }
        }

        if (activeNotMastered.length === 0 && activeTasks.length > 0) {
            setAllMastered(true);
            setCurrentTask(null);
            return;
        }

        if (activeNotMastered.length === 0) {
            setCurrentTask(null);
            return;
        }

        // Uppgiftsnivå: slumpa bland uppgifterna med färst antal rätt,
        // så att alla områden kommer med
        const correctByTask = {};
        const correctByQuestion = {};
        for (const entry of history) {
            if (!entry.isCorrect) continue;
            correctByTask[entry.taskId] = (correctByTask[entry.taskId] || 0) + 1;
            if (entry.questionId) {
                correctByQuestion[entry.questionId] = (correctByQuestion[entry.questionId] || 0) + 1;
            }
        }
        const minCorrect = Math.min(...activeNotMastered.map(id => correctByTask[id] || 0));
        const candidates = activeNotMastered.filter(id => (correctByTask[id] || 0) === minCorrect);
        const randomTask = candidates[Math.floor(Math.random() * candidates.length)];

        // Frågenivå: generera flera varianter och ta den med färst antal
        // rätt, så att samma fråga inte återkommer hela tiden
        let task = null;
        let taskCorrectCount = Infinity;
        for (let tries = 0; tries < 10; tries++) {
            const candidate = generateTask(randomTask);
            candidate.taskId = randomTask; // Tag the output
            const count = correctByQuestion[candidate.questionId] || 0;
            if (count < taskCorrectCount) {
                task = candidate;
                taskCorrectCount = count;
            }
            if (taskCorrectCount === 0 && tries >= 2) break;
        }

        setCurrentTask(task);
        setTaskStartTime(Date.now());
    };

    const handleSpellingSubmit = () => {
        if (isAnswered && isCorrect) return;
        const typed = spellingInput.trim().toLowerCase();
        const correct = typed === currentTask.correctAnswer.toLowerCase();
        const endTime = Date.now();
        if (correct) {
            if (attempts === 0) {
                logResult(currentTask.taskId, true, currentTask, taskStartTime, endTime);
                addPoints(10);
            }
            setIsAnswered(true);
            setIsCorrect(true);
            setTimeout(() => loadNextTask(), 1800);
        } else {
            if (attempts === 0) {
                logResult(currentTask.taskId, false, currentTask, taskStartTime, endTime);
            }
            setAttempts(a => a + 1);
            setSpellingShake(true);
            setTimeout(() => setSpellingShake(false), 500);
        }
    };

    const handleRevealAnswer = () => {
        if (revealedAnswer || (isAnswered && isCorrect)) return;
        setRevealedAnswer(true);
        // Loggas som fel med markering att svaret visades (ordet följer
        // med i taskData) — och räknas som ett försök så inga poäng ges
        if (attempts === 0) {
            logResult(currentTask.taskId, false, { ...currentTask, revealedAnswer: true }, taskStartTime, Date.now());
        }
        setAttempts(a => a + 1);
        speakWord(currentTask.correctAnswer);
    };

    const handleAnswer = (answer) => {
        if (isAnswered && isCorrect) return; // Wait during correct transition
        if (wrongAnswers.includes(answer)) return; // Don't click wrong again

        const correct = currentTask.correctAnswer === answer;
        const endTime = Date.now();

        if (correct) {
            // Give points only if it's the very first attempt (no wrong answers logged yet)
            if (attempts === 0) {
                logResult(currentTask.taskId, true, currentTask, taskStartTime, endTime);
                addPoints(10);
            }
            setIsAnswered(true);
            setSelectedAnswer(answer);
            setIsCorrect(true);
            setTimeout(() => loadNextTask(), 1500);
        } else {
            if (attempts === 0) {
                logResult(currentTask.taskId, false, currentTask, taskStartTime, endTime);
            }
            setAttempts(a => a + 1);
            setWrongAnswers(w => [...w, answer]);
        }
    };

    if (allMastered) {
        return (
            <div className="game-container game-loading" style={{ flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ color: 'var(--color-primary)' }}>Du har klarat alla valda kategorier! 🏆</h2>
                <button className="btn-play" onClick={onBack}>Gå tillbaka</button>
            </div>
        );
    }

    if (!currentTask && activeTasks.length > 0) {
        return <div className="game-loading">Laddar övning...</div>;
    }

    if (!currentTask && activeTasks.length === 0) {
        return (
            <div className="game-container game-loading" style={{ flexDirection: 'column', gap: '2rem' }}>
                <h2>Inga kategorier valda.</h2>
                <button className="btn-play" onClick={onBack}>Gå tillbaka</button>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="game-container">
                <header className="game-header p-4 flex justify-between items-center glass">
                    <button className="btn-icon" onClick={onBack}>
                        <ArrowLeft size={24} />
                    </button>
                    <div className="task-tags">
                        {currentTask.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                    <div className="points-badge" style={{ fontWeight: 'bold', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ⭐ {Number.isFinite(points) ? points : 0} p
                    </div>
                </header>

                <main className="game-main">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTask.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="task-content"
                        >
                            {/* The Question Text */}
                            {currentTask.text && <h2 className="question-text">{currentTask.text}</h2>}

                            {currentTask.type === 'spelling' ? (
                                /* ─── Spelling UI ──────────────────────────────── */
                                <div className="spelling-area">
                                    {/* Listen Button */}
                                    <motion.button
                                        className="btn-listen"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => speakWord(currentTask.wordToSpeak)}
                                    >
                                        🔊 Lyssna igen
                                    </motion.button>

                                    {/* Text input */}
                                    <motion.input
                                        className={`spelling-input ${spellingShake ? 'shake' : ''} ${isAnswered && isCorrect ? 'correct' : ''}`}
                                        type="text"
                                        autoFocus
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        value={spellingInput}
                                        disabled={isAnswered && isCorrect}
                                        onChange={e => setSpellingInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') handleSpellingSubmit(); }}
                                        placeholder="Skriv ordet här..."
                                    />

                                    {/* Submit button */}
                                    {!(isAnswered && isCorrect) && (
                                        <motion.button
                                            className="btn-check"
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={handleSpellingSubmit}
                                        >
                                            Kontrollera ✓
                                        </motion.button>
                                    )}

                                    {/* Visa svar */}
                                    {!(isAnswered && isCorrect) && (
                                        revealedAnswer ? (
                                            <motion.div
                                                className="revealed-answer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                Rätt svar: <strong>{currentTask.correctAnswer}</strong>
                                                <span className="revealed-hint">Skriv ordet för att gå vidare</span>
                                            </motion.div>
                                        ) : (
                                            <button className="btn-reveal" onClick={handleRevealAnswer}>
                                                👁 Visa svar
                                            </button>
                                        )
                                    )}

                                    {/* Feedback */}
                                    {isAnswered && (
                                        <motion.div
                                            className={`feedback-msg ${isCorrect ? 'positive' : 'negative'}`}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                        >
                                            {isCorrect ? (
                                                <><Check size={48} /><span>Rätt stavat! 🎉</span></>
                                            ) : (
                                                <><X size={48} /><span>Försök igen!</span></>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                /* ─── Normal: equation + multiple choice ─────── */
                                <>
                                    {/* The Visual Representation */}
                                    <div className={`visual-equation ${String(currentTask.equation || '').length > 20 ? (String(currentTask.equation || '').length > 35 ? 'text-sm' : 'text-md') : ''}`}>
                                        {currentTask.tags.includes('Klockan') ? (
                                            <svg width="120" height="120" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="white" stroke="var(--color-text)" strokeWidth="4" />
                                                {/* Hour markers */}
                                                {[...Array(12)].map((_, i) => (
                                                    <line
                                                        key={i}
                                                        x1="50" y1="10" x2="50" y2="15"
                                                        stroke="var(--color-text)"
                                                        strokeWidth={i % 3 === 0 ? "3" : "1"}
                                                        transform={`rotate(${i * 30} 50 50)`}
                                                    />
                                                ))}
                                                {/* Minute Hand */}
                                                <line
                                                    x1="50" y1="50" x2="50" y2="15"
                                                    stroke="var(--color-primary)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    transform={`rotate(${parseInt((currentTask.clockTime || currentTask.correctAnswer).split(':')[1]) * 6} 50 50)`}
                                                />
                                                {/* Hour Hand */}
                                                <line
                                                    x1="50" y1="50" x2="50" y2="25"
                                                    stroke="var(--color-secondary)"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    transform={`rotate(${(parseInt((currentTask.clockTime || currentTask.correctAnswer).split(':')[0]) % 12) * 30 +
                                                        (parseInt((currentTask.clockTime || currentTask.correctAnswer).split(':')[1]) / 60) * 30
                                                        } 50 50)`}
                                                />
                                                <circle cx="50" cy="50" r="4" fill="var(--color-text)" />
                                            </svg>
                                        ) : (
                                            currentTask.equation
                                        )}
                                    </div>

                                    {/* Multiple Choice Answers */}
                                    <div className="answers-grid">
                                        {currentTask.options.map((option, index) => {
                                            let btnClass = "answer-btn";
                                            const isThisWrong = wrongAnswers.includes(option);

                                            if (isAnswered && isCorrect) {
                                                if (option === currentTask.correctAnswer) {
                                                    btnClass += " correct";
                                                } else {
                                                    btnClass += " disabled";
                                                }
                                            } else if (isThisWrong) {
                                                btnClass += " wrong disabled";
                                            }
                                            const optStr = String(option);
                                            if (optStr.length >= 12) {
                                                btnClass += " text-sm";
                                            } else if (optStr.length >= 7) {
                                                btnClass += " text-md";
                                            }

                                            return (
                                                <motion.button
                                                    key={index}
                                                    whileHover={{ scale: (isAnswered && isCorrect) || isThisWrong ? 1 : 1.05 }}
                                                    whileTap={{ scale: (isAnswered && isCorrect) || isThisWrong ? 1 : 0.95 }}
                                                    className={btnClass}
                                                    onClick={() => handleAnswer(option)}
                                                    disabled={(isAnswered && isCorrect) || isThisWrong}
                                                >
                                                    {option}
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Feedback Message */}
                                    {isAnswered && (
                                        <motion.div
                                            className={`feedback-msg ${isCorrect ? 'positive' : 'negative'}`}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            {isCorrect ? (
                                                <>
                                                    <Check size={48} />
                                                    <span>Bra jobbat!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <X size={48} />
                                                    <span>Hoppsan, försök igen!</span>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {/* För Svårt Button */}
                            {!isAnswered && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="btn-skip"
                                    onClick={() => {
                                        if (window.confirm("Är det för svårt? Klicka OK för att bocka av denna uppgift och gå till nästa.")) {
                                            toggleTask(currentTask.taskId);
                                            loadNextTask();
                                        }
                                    }}
                                >
                                    För svårt, hoppa över
                                </motion.button>
                            )}

                            {/* We no longer show Nästa Uppgift on wrong. Kids must retry! */}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </ErrorBoundary>
    );
}
