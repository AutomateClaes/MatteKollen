import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GRADE_LEVELS, getAllCategories } from '../data/categories';

export const useStore = create(
    persist(
        (set, get) => ({
            // Array of active task IDs
            activeTasks: ['addition_0_10'],

            // Log array. Each item: { id, taskId, isCorrect, timestamp, startTime, endTime, timeToAnswer, taskData }
            history: [],

            seenTasks: [],
            masteryThreshold: 5,

            // Actions
            toggleTask: (taskId) => set((state) => {
                const isActive = state.activeTasks.includes(taskId);
                return {
                    activeTasks: isActive
                        ? state.activeTasks.filter(id => id !== taskId)
                        : [...state.activeTasks, taskId]
                };
            }),

            toggleSubcategory: (subcategoryId) => set((state) => {
                // Find the subcategory
                let targetSub = null;
                for (const cat of getAllCategories()) {
                    const sub = cat.subcategories.find(s => s.id === subcategoryId);
                    if (sub) {
                        targetSub = sub;
                        break;
                    }
                }
                if (!targetSub) return state;

                const taskIds = targetSub.tasks.map(t => t.id);
                const someActive = taskIds.some(id => state.activeTasks.includes(id));

                if (someActive) {
                    return { activeTasks: state.activeTasks.filter(id => !taskIds.includes(id)) };
                } else {
                    return { activeTasks: Array.from(new Set([...state.activeTasks, ...taskIds])) };
                }
            }),

            toggleCategory: (categoryId) => set((state) => {
                const category = getAllCategories().find(c => c.id === categoryId);
                if (!category) return state;

                const taskIds = category.subcategories.flatMap(s => s.tasks.map(t => t.id));
                const someActive = taskIds.some(id => state.activeTasks.includes(id));

                if (someActive) {
                    return { activeTasks: state.activeTasks.filter(id => !taskIds.includes(id)) };
                } else {
                    return { activeTasks: Array.from(new Set([...state.activeTasks, ...taskIds])) };
                }
            }),

            toggleGradeLevel: (gradeId) => set((state) => {
                const grade = GRADE_LEVELS.find(g => g.id === gradeId);
                if (!grade) return state;

                const taskIds = grade.categories.flatMap(cat => cat.subcategories.flatMap(sub => sub.tasks.map(t => t.id)));
                const someActive = taskIds.some(id => state.activeTasks.includes(id));

                if (someActive) {
                    return { activeTasks: state.activeTasks.filter(id => !taskIds.includes(id)) };
                } else {
                    return { activeTasks: Array.from(new Set([...state.activeTasks, ...taskIds])) };
                }
            }),

            logResult: (taskId, isCorrect, taskData, startTime, endTime) => set((state) => {
                const newEntry = {
                    id: Date.now().toString(),
                    taskId,
                    isCorrect,
                    timestamp: Date.now(),
                    startTime: startTime || null,
                    endTime: endTime || null,
                    timeToAnswer: (startTime && endTime) ? (endTime - startTime) : null,
                    taskData
                };
                return { history: [newEntry, ...state.history] };
            }),

            addPoints: (amount) => set((state) => ({ points: state.points + amount })),

            setMasteryThreshold: (val) => set(() => ({ masteryThreshold: val })),

            resetProgress: () => set(() => ({
                history: [],
                points: 0,
                activeTasks: ['addition_0_10', 'subtraktion_0_10', 'talraden_0_10'],
                seenTasks: [],
                masteryThreshold: 5,
            })),

            addSeenTask: (equation) => set((state) => ({
                seenTasks: state.seenTasks.includes(equation) ? state.seenTasks : [...state.seenTasks, equation]
            })),

            getLatestScore: (taskId) => {
                const { history, masteryThreshold } = get();
                const taskHistory = history.filter(entry => entry.taskId === taskId);

                let maxStreak = 0;
                let tempStreak = 0;
                for (let i = taskHistory.length - 1; i >= 0; i--) {
                    if (taskHistory[i].isCorrect) {
                        tempStreak++;
                        maxStreak = Math.max(maxStreak, tempStreak);
                    } else {
                        tempStreak = 0;
                    }
                }
                const isMastered = maxStreak >= masteryThreshold;

                let currentActiveStreak = 0;
                for (let i = 0; i < taskHistory.length; i++) {
                    if (taskHistory[i].isCorrect) {
                        currentActiveStreak++;
                    } else {
                        break;
                    }
                }

                return {
                    score: isMastered ? masteryThreshold : currentActiveStreak,
                    outOf: masteryThreshold,
                    isMastered: isMastered
                };
            },

            clearHistory: () => set({ history: [] })
        }),
        {
            name: 'math-school-app-storage',
        }
    )
);
