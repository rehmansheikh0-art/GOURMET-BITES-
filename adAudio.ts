// Audio synthesizer for the 5-second cinematic luxury commercial
class AdAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playCinematicWhoosh() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 1.2);
      filter.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 2.0);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 1.0);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 2.2);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.2);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playWaferSnap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. High frequency crisp crunch noise bursts
      const bufferSize = this.ctx.sampleRate * 0.18;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(3.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.16);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);

      // 2. Secondary delicate crumble burst
      const secondNoise = this.ctx.createBufferSource();
      secondNoise.buffer = noiseBuffer;
      const secondFilter = this.ctx.createBiquadFilter();
      secondFilter.type = 'highpass';
      secondFilter.frequency.setValueAtTime(4500, now + 0.04);

      const secondGain = this.ctx.createGain();
      secondGain.gain.setValueAtTime(0, now);
      secondGain.gain.setValueAtTime(0.25, now + 0.04);
      secondGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      secondNoise.connect(secondFilter);
      secondFilter.connect(secondGain);
      secondGain.connect(this.ctx.destination);
      secondNoise.start(now + 0.04);

      // 3. Low-end tactile thud (sub impact of breaking)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.2);
    } catch {
      // Audio autoplay fallback
    }
  }

  public playChocolateStretchTone() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // ignore
    }
  }

  public playEndChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Chord: C-sharp luxury gold major chord (C#5, F5, G#5, C#6)
      const freqs = [554.37, 698.46, 830.61, 1108.73];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.7);
      });
    } catch {
      // ignore
    }
  }
}

export const adAudio = new AdAudioEngine();
