'use client';
import { useCallback, useEffect, useRef } from 'react';

/** Tiny locally generated tones; no audio files or network requests are needed. */
export function useSoundEffects(enabled: boolean) {
  const context = useRef<AudioContext | null>(null);
  const musicNodes = useRef<{ oscillator: OscillatorNode; gain: GainNode; interval: number } | null>(null);
  const getContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return null;
    context.current ??= new AudioContextClass();
    if (context.current.state === 'suspended') void context.current.resume();
    return context.current;
  }, []);
  const play = useCallback((kind: 'open' | 'bite') => {
    if (!enabled) return;
    const ctx = getContext(); if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = kind === 'open' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(kind === 'open' ? 392 : 620, now);
    osc.frequency.exponentialRampToValueAtTime(kind === 'open' ? 784 : 360, now + (kind === 'open' ? .55 : .12));
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(kind === 'open' ? .07 : .045, now + .025); gain.gain.exponentialRampToValueAtTime(.0001, now + (kind === 'open' ? .65 : .18));
    osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + .7);
  }, [enabled, getContext]);
  useEffect(() => {
    if (!enabled) { if (musicNodes.current) { const active = musicNodes.current; window.clearInterval(active.interval); active.gain.gain.setTargetAtTime(.0001, active.oscillator.context.currentTime, .25); try { active.oscillator.stop(active.oscillator.context.currentTime + 1); } catch {} musicNodes.current = null; } return; }
    const ctx = getContext(); if (!ctx) return;
    const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
    oscillator.type = 'sine'; const notes = [196, 246.94, 293.66, 246.94]; let note = 0; oscillator.frequency.value = notes[0]; gain.gain.value = .0001;
    oscillator.connect(gain); gain.connect(ctx.destination); oscillator.start(); gain.gain.setTargetAtTime(.008, ctx.currentTime, .8);
    const interval = window.setInterval(() => { note = (note + 1) % notes.length; oscillator.frequency.setTargetAtTime(notes[note], ctx.currentTime, .4); }, 1450);
    musicNodes.current = { oscillator, gain, interval };
    return () => { window.clearInterval(interval); if (musicNodes.current?.oscillator === oscillator) musicNodes.current = null; try { oscillator.stop(); } catch {} };
  }, [enabled, getContext]);
  return play;
}
