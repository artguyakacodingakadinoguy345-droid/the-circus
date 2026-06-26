/**
 * Audio Manager System
 * Handles all sound effects and background music
 */
class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = new Map();
        this.musicTracks = new Map();
        this.currentMusicTrack = null;
        this.sfxVolume = 0.5;
        this.musicVolume = 0.3;
        this.initializeSounds();
    }

    initializeSounds() {
        this.createSound('select', { frequency: 800, duration: 0.1, type: 'sine' });
        this.createSound('success', { frequency: 1000, duration: 0.2, type: 'sine' });
        this.createSound('error', { frequency: 300, duration: 0.3, type: 'square' });
        this.createSound('insanity', { frequency: 150, duration: 0.5, type: 'sawtooth' });
        this.createSound('build', { frequency: 600, duration: 0.15, type: 'triangle' });
        this.createSound('adventure', { frequency: 1200, duration: 0.3, type: 'sine' });
        this.createSound('power_up', { frequency: 1500, duration: 0.2, type: 'sine' });
        this.createMusicTrack('circus_theme', 'upbeat');
        this.createMusicTrack('insane_theme', 'chaotic');
        this.createMusicTrack('adventure_theme', 'epic');
    }

    createSound(name, config) { this.sounds.set(name, config); }
    createMusicTrack(name, mood) { this.musicTracks.set(name, { mood, playing: false }); }

    playSound(soundName) {
        if (!this.sounds.has(soundName)) return;
        const config = this.sounds.get(soundName);
        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = config.frequency;
        oscillator.type = config.type;
        gainNode.gain.setValueAtTime(this.sfxVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + config.duration);
        oscillator.start(now);
        oscillator.stop(now + config.duration);
    }

    playMusic(trackName) {
        if (!this.musicTracks.has(trackName)) return;
        if (this.currentMusicTrack) this.stopMusic();
        this.currentMusicTrack = trackName;
        const track = this.musicTracks.get(trackName);
        track.playing = true;
        this.generateMusicPattern(track.mood);
    }

    generateMusicPattern(mood) {
        if (mood === 'upbeat') {
            this.playMusicSequence([440, 550, 660, 550], 0.2);
        } else if (mood === 'chaotic') {
            this.playMusicSequence([200, 300, 250, 400, 350, 300], 0.15);
        } else if (mood === 'epic') {
            this.playMusicSequence([330, 440, 550, 660, 550, 440], 0.25);
        }
    }

    playMusicSequence(frequencies, duration) {
        const now = this.audioContext.currentTime;
        frequencies.forEach((freq, index) => {
            const time = now + (index * duration);
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(this.musicVolume, time + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, time + duration);
            oscillator.start(time);
            oscillator.stop(time + duration);
        });
        if (this.currentMusicTrack) {
            setTimeout(() => this.generateMusicPattern(this.musicTracks.get(this.currentMusicTrack).mood), (frequencies.length * duration) * 1000);
        }
    }

    stopMusic() {
        if (this.currentMusicTrack) {
            const track = this.musicTracks.get(this.currentMusicTrack);
            track.playing = false;
            this.currentMusicTrack = null;
        }
    }

    setMusicVolume(volume) { this.musicVolume = Math.max(0, Math.min(1, volume)); }
    setSFXVolume(volume) { this.sfxVolume = Math.max(0, Math.min(1, volume)); }
    getMusicVolume() { return this.musicVolume; }
    getSFXVolume() { return this.sfxVolume; }
}