'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, RotateCcw, X } from 'lucide-react';
import { peperoMessages } from '../data/peperoMessages';
import { finalLetter } from '../data/finalLetter';

type Stage = 'intro' | 'opening' | 'collection' | 'eating' | 'message-reveal' | 'final-celebration';

function Pepero({ eaten = 0, compact = false }: { eaten?: number; compact?: boolean }) {
  return <span className={`stick-art ${compact ? 'compact' : ''} eaten-${eaten}`} aria-hidden="true">
    <i className="coating" /><i className="crumb-line c1" /><i className="crumb-line c2" /><i className="biscuit" />
  </span>;
}
function GiftBox({ opened, onOpen, shaking = false, consumed = [], onSelect, showLid = true }: { opened: boolean; onOpen?: () => void; shaking?: boolean; consumed?: boolean[]; onSelect?: (id: number) => void; showLid?: boolean }) {
  const remainingIds = Array.from({ length: 11 }, (_, id) => id).filter(id => !consumed[id]);
  const lastRowStart = remainingIds.length - remainingIds.length % 4;
  const lastRowRemainder = remainingIds.length % 4;
  const tilts = [-6, 4, -3, 7, -4, 3, -7, 5, -2, 6, -5];
  const verticalOffsets = [-3, 2, -1, 4, 1, -4, 3, -2, 4, -3, 1];
  return <div className={`gift-scene ${opened ? 'is-open' : ''} ${shaking ? 'is-shaking' : ''}`} onClick={onOpen} role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined} onKeyDown={onOpen ? e => (e.key === 'Enter' || e.key === ' ') && onOpen() : undefined} aria-label={onOpen ? 'Open the Almond Pepero carton' : 'Almond Pepero carton, open'}>
    <div className="box-shadow" />
    <div className={`box-interior ${opened ? 'is-open-interior' : ''}`}><div className="box-lining" />{remainingIds.map((id, slot) => <button key={id} className="inside-stick" style={{ '--i': slot, '--tilt': `${tilts[id]}deg`, '--stick-y': `${verticalOffsets[id]}px`, gridColumnStart: slot === lastRowStart && lastRowRemainder ? Math.floor((4 - lastRowRemainder) / 2) + 1 : undefined } as React.CSSProperties} aria-label={`Take Pepero ${String(id + 1).padStart(2, '0')}`} disabled={!onSelect} onClick={event => { event.stopPropagation(); onSelect?.(id); }}><Pepero compact /></button>)}</div>
    <div className="box-body">
      <div className="box-side" />
      <span className="box-lotte">LOTTE</span>
      <span className="box-tagline">Say hello with</span>
      <span className="box-brand">PEPERO</span>
      <span className="box-korean">빼빼로</span>
      <span className="box-flavor">almond</span>
      <svg className="box-product-art" viewBox="0 0 190 130" role="img" aria-label="Almond covered chocolate biscuit sticks">
        <defs><linearGradient id="choco" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#80523a"/><stop offset=".48" stopColor="#55372c"/><stop offset="1" stopColor="#39251e"/></linearGradient><linearGradient id="almond" x1="0" x2="1"><stop stopColor="#f1d9a2"/><stop offset="1" stopColor="#c49757"/></linearGradient></defs>
        <g fill="none" stroke="url(#choco)" strokeWidth="14" strokeLinecap="round"><path d="M39 105 117 27"/><path d="m75 113 71-76"/></g>
        <g fill="url(#almond)" stroke="#f4dda9" strokeWidth=".7"><ellipse cx="50" cy="91" rx="4" ry="2.5" transform="rotate(-35 50 91)"/><ellipse cx="62" cy="78" rx="4" ry="2.5" transform="rotate(38 62 78)"/><ellipse cx="72" cy="67" rx="4" ry="2.5" transform="rotate(-20 72 67)"/><ellipse cx="84" cy="54" rx="4" ry="2.5" transform="rotate(40 84 54)"/><ellipse cx="96" cy="42" rx="4" ry="2.5" transform="rotate(-35 96 42)"/><ellipse cx="88" cy="100" rx="4" ry="2.5" transform="rotate(-25 88 100)"/><ellipse cx="101" cy="86" rx="4" ry="2.5" transform="rotate(35 101 86)"/><ellipse cx="114" cy="72" rx="4" ry="2.5" transform="rotate(-30 114 72)"/><ellipse cx="126" cy="59" rx="4" ry="2.5" transform="rotate(35 126 59)"/></g>
        <g fill="url(#almond)"><ellipse cx="142" cy="104" rx="13" ry="7" transform="rotate(-24 142 104)"/><ellipse cx="37" cy="42" rx="12" ry="6" transform="rotate(35 37 42)"/><path d="m31 108 5-7 4 8-7 3z"/><path d="m154 25 4-6 5 7-6 3z"/></g>
      </svg>
      <span className="box-footer">NO. 1 BRAND IN KOREA <b>37 g · 18% ALMOND</b></span>
    </div>
    {showLid && <div className="box-lid"><span>LOTTE</span><b>PEPERO</b></div>}
    {opened && <div className="open-spark">✦</div>}
  </div>;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro');
  const [bites, setBites] = useState<number[]>(Array(11).fill(0));
  const [consumed, setConsumed] = useState<boolean[]>(Array(11).fill(false));
  const [selected, setSelected] = useState<number | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const tapCount = useRef(0);
  const tapTimer = useRef<number | null>(null);
  const openingTimer = useRef<number | null>(null);
  const biteTimer = useRef<number | null>(null);
  const biting = useRef(false);
  const reduced = Boolean(useReducedMotion());
  const completed = consumed.filter(Boolean).length;

  const tapPackage = () => {
    if (stage !== 'intro' || openingTimer.current) return;
    const next = tapCount.current + 1;
    tapCount.current = next;
    setShakeKey(value => value + 1);
    if (tapTimer.current) window.clearTimeout(tapTimer.current);
    if (next >= 3) {
      tapCount.current = 0;
      setStage('opening');
      openingTimer.current = window.setTimeout(() => {
        openingTimer.current = null;
        setStage('collection');
      }, reduced ? 80 : 1900);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate([18, 24, 42]);
    } else {
      tapTimer.current = window.setTimeout(() => { tapCount.current = 0; tapTimer.current = null; }, 1400);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(16);
    }
  };

  const openStick = (id: number) => {
    if (stage !== 'collection' || consumed[id]) return;
    setSelected(id);
    setStage('eating');
  };
  const takeBite = () => {
    if (biting.current || selected === null || bites[selected] >= 3) return;
    biting.current = true;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(22);
    const next = bites[selected] + 1;
    setBites(previous => previous.map((value, index) => index === selected ? next : value));
    biteTimer.current = window.setTimeout(() => { biting.current = false; biteTimer.current = null; if (next === 3) setStage('message-reveal'); }, reduced ? 40 : 620);
  };
  const closeStick = () => {
    if (biting.current) return;
    const completing = stage === 'message-reveal' && selected !== null;
    if (completing) setConsumed(previous => previous.map((value, index) => index === selected ? true : value));
    setSelected(null);
    const nextCompleted = completed + (completing ? 1 : 0);
    setStage(nextCompleted === 11 ? 'final-celebration' : 'collection');
  };
  const restart = () => {
    [tapTimer, openingTimer, biteTimer].forEach(timer => { if (timer.current) window.clearTimeout(timer.current); timer.current = null; });
    biting.current = false;
    tapCount.current = 0;
    setSelected(null);
    setBites(Array(11).fill(0));
    setConsumed(Array(11).fill(false));
    setStage('intro');
  };

  return <main className={`experience stage-${stage}`}>
    <div className="grain" aria-hidden="true" />
    {(stage === 'intro' || stage === 'opening') && <motion.section className="minimal-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .45 }}>
      <GiftBox key={shakeKey} opened={stage === 'opening'} onOpen={stage === 'intro' ? tapPackage : undefined} shaking={stage === 'intro' && shakeKey > 0} />
      {stage === 'opening' && <div className="opening-burst" aria-hidden="true">{Array.from({ length: 15 }, (_, index) => <i key={index} style={{ '--dx': `${Math.cos(index * .42) * (55 + index % 4 * 13)}px`, '--dy': `${Math.sin(index * .42) * (45 + index % 3 * 15) - 22}px`, '--delay': `${index * 18}ms` } as React.CSSProperties}>{index % 4 === 0 ? '♡' : '✦'}</i>)}</div>}
    </motion.section>}

    {(stage === 'collection' || stage === 'eating' || stage === 'message-reveal') && <motion.section className="minimal-package-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .45 }}>
      <GiftBox opened showLid={false} consumed={consumed} onSelect={stage === 'collection' ? openStick : undefined} />
    </motion.section>}

    {(stage === 'eating' || stage === 'message-reveal') && selected !== null && <motion.div className="bite-overlay minimal-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => { if (event.target === event.currentTarget) closeStick(); }}>
      <button className="modal-close" aria-label="Close" onClick={closeStick}><X size={19} strokeWidth={1.5} /></button>
      <AnimatePresence mode="wait" initial={false}>
        {stage === 'message-reveal' ? <motion.div key="note" className="minimal-note" initial={{ opacity: 0, y: 14, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><Heart size={22} fill="currentColor" strokeWidth={1.4} /><h2>{peperoMessages[selected].title}</h2><p>{peperoMessages[selected].message}</p></motion.div> : <motion.div key="stick" className="minimal-bite-stage" initial={{ scale: .86, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, opacity: 0 }} transition={{ type: 'spring', stiffness: 190, damping: 20 }}>
          <div className={`large-stick-wrap bite-${bites[selected]}`} onClick={takeBite} role="button" tabIndex={0} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') takeBite(); }} aria-label={`Pepero, ${bites[selected]} of 3 bites`}>
            <span className="bite-shadow" /><Pepero eaten={bites[selected]} /><i className="bite-piece" key={bites[selected]} aria-hidden="true" />
            {Array.from({ length: 9 }, (_, index) => <i className={`crumb crumb-${index}`} key={index} style={{ '--dx': `${(index % 3 - 1) * 18}px`, '--dy': `${-18 - (index % 4) * 7}px` } as React.CSSProperties} />)}
          </div><div className="bite-dots" aria-hidden="true">{Array.from({ length: 3 }, (_, index) => <i key={index} className={index < bites[selected] ? 'done' : ''} />)}</div>
        </motion.div>}
      </AnimatePresence>
    </motion.div>}

    {stage === 'final-celebration' && <motion.section className="minimal-final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .8 }}>
      <div className="final-glow" /><div className="final-box"><motion.div className="final-box-motion" initial={{ scale: .84, y: 18 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 95, damping: 17 }}><GiftBox opened showLid={false} consumed={Array(11).fill(true)} /><motion.div className="heart-rise" initial={{ y: 24, scale: .35, opacity: 0 }} animate={{ y: -34, scale: 1, opacity: 1 }} transition={{ delay: reduced ? 0 : .65, type: 'spring', stiffness: 70 }}><Heart fill="currentColor" /></motion.div></motion.div></div>
      <motion.div className="dinner-invite" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.05, duration: reduced ? 0 : .8 }}><span className="invite-mark"><Heart size={17} fill="currentColor" /></span><h1>{finalLetter.heading.split('\n').map((line, index) => <span key={index}>{line}{index < finalLetter.heading.split('\n').length - 1 && <br />}</span>)}</h1>{finalLetter.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="invite-signoff">{finalLetter.signoff}</p></motion.div>
      <button className="minimal-restart" aria-label="Start again" onClick={restart}><RotateCcw size={17} strokeWidth={1.5} /></button>
    </motion.section>}
  </main>;
}
