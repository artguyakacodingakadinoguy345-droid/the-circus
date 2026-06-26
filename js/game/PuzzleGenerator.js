/**
 * Procedural Puzzle Generator
 */
class PuzzleGenerator {
    constructor() {
        this.puzzles = [];
        this.currentPuzzle = null;
        this.completedPuzzles = [];
        this.generatePuzzles();
    }

    generatePuzzles() {
        this.puzzles = [
            { id: 'pattern_1', type: 'pattern', name: 'Mirror Sequence', description: 'Complete: 2, 4, 8, 16, ?', difficulty: 'easy', answer: 32, reward: 100 },
            { id: 'pattern_2', type: 'pattern', name: 'Fibonacci Ring', description: 'Complete: 1, 1, 2, 3, 5, 8, ?', difficulty: 'medium', answer: 13, reward: 150 },
            { id: 'logic_1', type: 'logic', name: 'Clown Riddle', description: 'I have cities but no houses. What am I?', difficulty: 'easy', answer: ['map', 'geography'], reward: 100 },
            { id: 'logic_2', type: 'logic', name: 'Ringmaster Enigma', description: 'What has a head and tail but no body?', difficulty: 'easy', answer: ['coin', 'money'], reward: 100 },
            { id: 'math_1', type: 'math', name: 'Carousel Count', description: 'Carousel spins 5x per minute for 12 min. Total?', difficulty: 'easy', answer: 60, reward: 100 },
            { id: 'word_1', type: 'word', name: 'Anagram Circus', description: 'Unscramble: SURICCA', difficulty: 'easy', answer: ['circus'], reward: 100 },
            { id: 'perception_1', type: 'perception', name: 'Odd One Out', description: 'Which doesn\'t belong: 2, 4, 6, 8, 10, 15?', difficulty: 'easy', answer: [15], reward: 100 }
        ];
    }

    getRandomPuzzle(difficulty = null) {
        let available = difficulty ? this.puzzles.filter(p => p.difficulty === difficulty) : this.puzzles;
        if (!available.length) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    startPuzzle(puzzle) {
        this.currentPuzzle = {
            ...puzzle,
            startTime: Date.now(),
            attempts: 0,
            solved: false
        };
        return this.currentPuzzle;
    }

    checkAnswer(userAnswer) {
        if (!this.currentPuzzle) return { correct: false, message: 'No active puzzle' };
        this.currentPuzzle.attempts++;
        const answer = this.currentPuzzle.answer;
        let isCorrect = false;
        if (Array.isArray(answer)) {
            isCorrect = answer.some(a => String(a).toLowerCase() === String(userAnswer).toLowerCase());
        } else {
            isCorrect = String(answer).toLowerCase() === String(userAnswer).toLowerCase();
        }
        if (isCorrect) {
            this.currentPuzzle.solved = true;
            const reward = Math.max(50, this.currentPuzzle.reward - (this.currentPuzzle.attempts * 10));
            this.completedPuzzles.push(this.currentPuzzle);
            return { correct: true, message: `🎉 Correct! ${reward} points!`, reward };
        }
        return { correct: false, message: `❌ Incorrect! Attempt ${this.currentPuzzle.attempts}`, attemptsLeft: 3 - this.currentPuzzle.attempts };
    }

    getCurrentPuzzle() { return this.currentPuzzle; }
    getCompletedPuzzles() { return this.completedPuzzles; }
    getPuzzleStatistics() {
        const total = this.completedPuzzles.length;
        const totalReward = this.completedPuzzles.reduce((sum, p) => sum + (p.reward || 0), 0);
        return { total, totalReward, byType: {}, byDifficulty: { easy: 0, medium: 0, hard: 0 } };
    }
}