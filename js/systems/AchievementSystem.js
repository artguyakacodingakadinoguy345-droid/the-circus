/**
 * Achievement & Leaderboard System
 */
class AchievementSystem {
    constructor() {
        this.achievements = this.initializeAchievements();
        this.unlockedAchievements = new Set();
        this.leaderboard = [];
        this.playerStats = {
            adventuresCompleted: 0,
            buildingsCreated: 0,
            timePlayedSeconds: 0,
            insanityEventsTriggered: 0,
            furnitureAdded: 0,
            totalScore: 0
        };
    }

    initializeAchievements() {
        return {
            firstSteps: { id: 'first_steps', name: '🚶 First Steps', description: 'Move 100 units', progress: 0, required: 100, reward: 50 },
            circusExplorer: { id: 'circus_explorer', name: '🎪 Circus Explorer', description: 'Visit all 5 rooms', progress: 0, required: 5, reward: 100 },
            adventureSeeker: { id: 'adventure_seeker', name: '🎯 Adventure Seeker', description: 'Complete 5 adventures', progress: 0, required: 5, reward: 150 },
            madHatter: { id: 'mad_hatter', name: '🎩 Mad Hatter', description: 'Go insane 10 times', progress: 0, required: 10, reward: 100 },
            architectOfDreams: { id: 'architect_of_dreams', name: '🏗️ Architect', description: 'Build 50 structures', progress: 0, required: 50, reward: 200 },
            interiorDesigner: { id: 'interior_designer', name: '🪑 Interior Designer', description: 'Place 20 furniture', progress: 0, required: 20, reward: 150 },
            chatterbox: { id: 'chatterbox', name: '💬 Chatterbox', description: 'Send 100 messages', progress: 0, required: 100, reward: 75 },
            socialButterfly: { id: 'social_butterfly', name: '🦋 Social Butterfly', description: 'Play with 5 players', progress: 0, required: 5, reward: 100 },
            epicAdventurer: { id: 'epic_adventurer', name: '⭐ Epic Adventurer', description: 'Complete 10 hard adventures', progress: 0, required: 10, reward: 300 },
            masterBuilder: { id: 'master_builder', name: '👑 Master Builder', description: 'Build all 5 types', progress: 0, required: 5, reward: 200 },
            cainWhisperer: { id: 'cain_whisperer', name: '🎭 Cain Whisperer', description: 'Unlock all responses', progress: 0, required: 20, reward: 250 },
            timeKeeper: { id: 'time_keeper', name: '⏰ Time Keeper', description: 'Play 1 hour', progress: 0, required: 3600, reward: 100 }
        };
    }

    updateProgress(achievementId, amount = 1) {
        if (this.achievements[achievementId]) {
            this.achievements[achievementId].progress += amount;
            if (this.achievements[achievementId].progress >= this.achievements[achievementId].required) {
                this.unlockAchievement(achievementId);
            }
        }
    }

    unlockAchievement(achievementId) {
        if (!this.unlockedAchievements.has(achievementId)) {
            this.unlockedAchievements.add(achievementId);
            const achievement = this.achievements[achievementId];
            this.playerStats.totalScore += achievement.reward;
            return achievement;
        }
        return null;
    }

    getUnlockedAchievements() {
        return Array.from(this.unlockedAchievements).map(id => this.achievements[id]);
    }

    getLockedAchievements() {
        return Object.values(this.achievements).filter(a => !this.unlockedAchievements.has(a.id));
    }

    addToLeaderboard(playerName, score) {
        this.leaderboard.push({
            name: playerName,
            score: score,
            timestamp: Date.now(),
            achievements: this.unlockedAchievements.size
        });
        this.leaderboard.sort((a, b) => b.score - a.score);
        if (this.leaderboard.length > 100) this.leaderboard = this.leaderboard.slice(0, 100);
        return this.leaderboard;
    }

    getLeaderboard(limit = 10) { return this.leaderboard.slice(0, limit); }
    getPlayerStats() { return this.playerStats; }
    updatePlayerStats(stats) { Object.assign(this.playerStats, stats); }
}