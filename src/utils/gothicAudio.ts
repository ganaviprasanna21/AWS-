/**
 * Web Audio API synthesized soundscape for The Midnight Society.
 * Pure procedural synthesis without external MP3 dependencies.
 */

class GothicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbienceRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Distant low rolling thunder rumble
   */
  public playThunderRumble() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Low frequency rumble oscillator
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(52, now);
      osc1.frequency.linearRampToValueAtTime(28, now + 3.5);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(68, now);
      osc2.frequency.linearRampToValueAtTime(22, now + 3.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(40, now + 3.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.8);
      osc2.stop(now + 3.8);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Alias for backwards compatibility
   */
  public playGateOpening() {
    this.playSpookyGateOpening();
  }

  /**
   * Scary & spooky slow dramatic gate creak with heavy iron groan,
   * unlatch clank, ghostly wind howl, and eerie tolling bell.
   */
  public playSpookyGateOpening() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Heavy iron bolt snap & heavy metallic drop
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(420, now);
      snapOsc.frequency.exponentialRampToValueAtTime(75, now + 0.45);

      snapGain.gain.setValueAtTime(0.4, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.55);

      // 2. Ultra-slow, agonizing rusty iron hinge screech (extended 6.5 seconds)
      const creakOsc1 = this.ctx.createOscillator();
      const creakOsc2 = this.ctx.createOscillator();
      const creakFilter = this.ctx.createBiquadFilter();
      const creakGain = this.ctx.createGain();

      creakOsc1.type = 'sawtooth';
      creakOsc1.frequency.setValueAtTime(60, now + 0.2);
      creakOsc1.frequency.linearRampToValueAtTime(140, now + 1.8);
      creakOsc1.frequency.linearRampToValueAtTime(110, now + 3.5);
      creakOsc1.frequency.linearRampToValueAtTime(75, now + 5.2);
      creakOsc1.frequency.linearRampToValueAtTime(38, now + 6.5);

      creakOsc2.type = 'square';
      creakOsc2.frequency.setValueAtTime(88, now + 0.2);
      creakOsc2.frequency.linearRampToValueAtTime(195, now + 2.0);
      creakOsc2.frequency.linearRampToValueAtTime(130, now + 4.0);
      creakOsc2.frequency.linearRampToValueAtTime(45, now + 6.5);

      creakFilter.type = 'bandpass';
      creakFilter.frequency.setValueAtTime(280, now + 0.2);
      creakFilter.frequency.linearRampToValueAtTime(460, now + 2.2);
      creakFilter.frequency.linearRampToValueAtTime(340, now + 4.5);
      creakFilter.frequency.linearRampToValueAtTime(180, now + 6.5);
      creakFilter.Q.setValueAtTime(5.5, now);

      creakGain.gain.setValueAtTime(0.001, now);
      creakGain.gain.linearRampToValueAtTime(0.3, now + 1.2);
      creakGain.gain.linearRampToValueAtTime(0.26, now + 3.8);
      creakGain.gain.linearRampToValueAtTime(0.18, now + 5.5);
      creakGain.gain.linearRampToValueAtTime(0.001, now + 6.7);

      creakOsc1.connect(creakFilter);
      creakOsc2.connect(creakFilter);
      creakFilter.connect(creakGain);
      creakGain.connect(this.ctx.destination);

      creakOsc1.start(now + 0.2);
      creakOsc2.start(now + 0.2);
      creakOsc1.stop(now + 6.7);
      creakOsc2.stop(now + 6.7);

      // 3. Spooky haunted wind howl sweeping through the gate gap (sustained 6.5s)
      const windNoise = this.ctx.createOscillator();
      const windFilter = this.ctx.createBiquadFilter();
      const windGain = this.ctx.createGain();

      windNoise.type = 'triangle';
      windNoise.frequency.setValueAtTime(110, now + 0.6);
      windNoise.frequency.linearRampToValueAtTime(260, now + 2.8);
      windNoise.frequency.linearRampToValueAtTime(170, now + 4.8);
      windNoise.frequency.linearRampToValueAtTime(90, now + 6.8);

      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(220, now + 0.6);
      windFilter.Q.setValueAtTime(3.2, now);

      windGain.gain.setValueAtTime(0.001, now + 0.6);
      windGain.gain.linearRampToValueAtTime(0.24, now + 2.5);
      windGain.gain.linearRampToValueAtTime(0.18, now + 5.0);
      windGain.gain.exponentialRampToValueAtTime(0.001, now + 7.0);

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ctx.destination);

      windNoise.start(now + 0.6);
      windNoise.stop(now + 7.0);

      // 4. Low ominous cathedral bell toll (initial death toll)
      this.playGothicBell(52, 5.0, 0.45);

      // 5. Second distant eerie toll as gates reach midpoint (~3.2s)
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        this.playGothicBell(48, 5.5, 0.38);
        this.playGothicBell(290, 3.2, 0.12);
      }, 3200);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Resonant low cathedral bell gong
   */
  public playGothicBell(freq = 110, duration = 3.0, volume = 0.25) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.frequency.exponentialRampToValueAtTime(freq * 0.98, now + duration);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.51, now); // Bell harmonic

      bellGain.gain.setValueAtTime(volume, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(bellGain);
      osc2.connect(bellGain);
      bellGain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // Fallback
    }
  }

  /**
   * Subtle click / parchment interaction sound
   */
  public playSubtleTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Fallback
    }
  }

  /**
   * Nocturnal wind & cello organ atmospheric drone
   */
  public startAmbientSoundscape() {
    if (this.isAmbienceRunning || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      this.isAmbienceRunning = true;

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.07, now);

      // Low organ drone notes (D minor chord: D2, A2, F3)
      const notes = [73.42, 110.0, 174.61];
      notes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, now);

        noteGain.gain.setValueAtTime(0.04, now);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.ambientGain!);

        osc.start(now);
      });

      this.ambientGain.connect(this.ctx.destination);
    } catch {
      // Ignored if user hasn't interacted
    }
  }
}

export const gothicAudio = new GothicAudioEngine();
