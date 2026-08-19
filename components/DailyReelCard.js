//file: components/DailyReelCard.js

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;
const PREVIEW_WIDTH = 720;
const PREVIEW_HEIGHT = 1280;
const PREVIEW_FPS = 30;
const EXPORT_FPS = 30;
const EXPORT_VIDEO_BITRATE = 24_000_000;
const EXPORT_AUDIO_BITRATE = 256_000;

const REEL_MUSIC_LIBRARY = Object.freeze({
  kryvant: Object.freeze([
    '/music/kryvant/track-01.mp3',
    '/music/kryvant/track-02.mp3',
    '/music/kryvant/track-03.mp3'
  ]),
  lumeriq: Object.freeze([
    '/music/lumeriq/track-01.mp3',
    '/music/lumeriq/track-02.mp3',
    '/music/lumeriq/track-03.mp3'
  ]),
  rangenest: Object.freeze([
    '/music/rangenest/track-01.mp3',
    '/music/rangenest/track-02.mp3',
    '/music/rangenest/track-03.mp3'
  ]),
  ninetyvale: Object.freeze([
    '/music/ninetyvale/track-01.mp3',
    '/music/ninetyvale/track-02.mp3',
    '/music/ninetyvale/track-03.mp3'
  ]),
  arcynth: Object.freeze([
    '/music/arcynth/track-01.mp3',
    '/music/arcynth/track-02.mp3',
    '/music/arcynth/track-03.mp3'
  ])
});

const REEL_MUSIC_VOLUME = Object.freeze({
  kryvant: 0.72,
  lumeriq: 0.70,
  rangenest: 0.68,
  ninetyvale: 0.76,
  arcynth: 0.70
});

export default function DailyReelCard({ brand, data, copy, copied }) {
  const canvasRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoMime, setVideoMime] = useState('');
  const [videoBlob, setVideoBlob] = useState(null);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const reel = useMemo(() => buildReelModel(brand, data), [brand, data]);
  const selectedMusic = useMemo(
    () => (reel ? selectDailyMusicTrack(brand, reel) : null),
    [brand, reel]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !reel) return undefined;

    const staticLayer = createReelStaticLayer(brand, reel);
    let active = true;
    let rafId = 0;
    let lastDraw = 0;
    const startedAt = performance.now();

    const loop = (now) => {
      if (!active) return;

      const frameInterval = 1000 / PREVIEW_FPS;
      if (now - lastDraw >= frameInterval) {
        const seconds = ((now - startedAt) / 1000) % reel.durationSeconds;
        drawReelFrame(canvas, brand, reel, seconds, staticLayer);
        lastDraw = now - ((now - lastDraw) % frameInterval);
      }

      rafId = requestAnimationFrame(loop);
    };

    drawReelFrame(canvas, brand, reel, 0, staticLayer);
    rafId = requestAnimationFrame(loop);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, [brand, reel]);

  useEffect(() => {
    setProgress(0);
    setError('');
    setSaveStatus('');
    setVideoMime('');
    setVideoBlob(null);
    setVideoUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return '';
    });
  }, [data?.reelDateKey, brand.name]);

  useEffect(() => () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
  }, [videoUrl]);

  if (!reel || !data?.reelCaption) return null;

  async function makeVideo() {
    if (rendering) return;

    setRendering(true);
    setProgress(0);
    setError('');
    setSaveStatus('');

    try {
      const result = await recordReelVideo({
        brand,
        reel,
        onProgress: setProgress
      });

      setVideoUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return URL.createObjectURL(result.blob);
      });
      setVideoMime(result.mimeType);
      setVideoBlob(result.blob);
    } catch (recordError) {
      setError(recordError?.message || 'VIDEO_MAKEN_MISLUKT');
    } finally {
      setRendering(false);
    }
  }

  function getVideoFile() {
    if (!videoBlob || typeof File === 'undefined') return null;

    const isMp4 = isMp4Mime(videoMime || videoBlob.type);
    const extension = isMp4 ? 'mp4' : 'webm';
    const safeMime = isMp4 ? 'video/mp4' : 'video/webm';

    return new File(
      [videoBlob],
      `${brand.name.toLowerCase()}-daily-reel-${data.reelDateKey}.${extension}`,
      { type: safeMime }
    );
  }

  function forceBrowserDownload() {
    if (!videoUrl) return;

    const extension = isMp4Mime(videoMime) ? 'mp4' : 'webm';
    const anchor = document.createElement('a');
    anchor.href = videoUrl;
    anchor.download = `${brand.name.toLowerCase()}-daily-reel-${data.reelDateKey}.${extension}`;
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  async function saveVideo() {
    const file = getVideoFile();
    if (!file) return;

    setError('');
    setSaveStatus('');

    const canNativeShare =
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      (typeof navigator.canShare !== 'function' || navigator.canShare({ files: [file] }));

    if (canNativeShare) {
      try {
        // On iPhone/iPad this opens the native share sheet. Choose “Bewaar video” / “Save Video”.
        // Do not attach caption text here: keeping this file-only makes iOS treat it as a video asset.
        await navigator.share({
          files: [file],
          title: `${brand.name} Daily Reel`
        });
        setSaveStatus('Deelmenu voltooid. Kies op iPhone “Bewaar video” om hem in Foto’s te zetten.');
        return;
      } catch (shareError) {
        if (shareError?.name === 'AbortError') return;
      }
    }

    forceBrowserDownload();
    setSaveStatus('Download gestart.');
  }

  function openVideo() {
    if (!videoUrl) return;
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  }

  async function shareVideo() {
    const file = getVideoFile();
    if (!file || typeof navigator?.share !== 'function') return;

    if (typeof navigator.canShare === 'function' && !navigator.canShare({ files: [file] })) {
      setError('DELEN_NIET_ONDERSTEUND');
      return;
    }

    try {
      await navigator.share({
        files: [file],
        title: `${brand.name} Daily Reel`
      });
    } catch (shareError) {
      if (shareError?.name !== 'AbortError') setError('DELEN_MISLUKT');
    }
  }

  return (
    <section className="content-card reel-card">
      <div className="split-title">
        <div>
          <p className="eyebrow">DAILY REEL</p>
          <h2>Losse video van vandaag</h2>
        </div>
        <span>{data.reelDateKey} · apart van daily post</span>
      </div>

      <div className="reel-layout">
        <div className="reel-preview-shell">
          <canvas
            ref={canvasRef}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            className="reel-canvas"
            aria-label={`${brand.name} daily Reel preview`}
          />
          <small className="visual-hint">
            9:16 preview · {reel.durationSeconds}s · iedere dag automatisch nieuwe tekst + animatie
          </small>
        </div>

        <div>
          <div className="reel-meta">
            <span className="reel-chip">{data.reelTopic}</span>
            <span className="reel-chip">1080 × 1920</span>
            <span className="reel-chip">30 FPS · CINEMATIC HQ</span>
            <span className="reel-chip">ORIGINAL MUSIC + SFX</span>
            {selectedMusic?.label && <span className="reel-chip">{selectedMusic.label}</span>}
            <span className="reel-chip">{reel.durationSeconds}s</span>
            <span className="reel-chip">variant {data.reelVariantIndex}/{data.reelVariantTotal}</span>
          </div>

          <div className="split-title">
            <h2>Reel-bericht</h2>
            <span>{data.reelCharacterCount}/280</span>
          </div>
          <pre className="postbox">{data.reelCaption}</pre>

          <div className="buttons">
            <button onClick={() => copy(data.reelCaption, 'reel')}>
              {copied === 'reel' ? 'Gekopieerd ✓' : 'Kopieer Reel-bericht'}
            </button>
            <button className="secondary" onClick={makeVideo} disabled={rendering}>
              {rendering ? `Video maken… ${Math.round(progress)}%` : 'Maak video om op te slaan'}
            </button>
          </div>

          {rendering && (
            <>
              <div className="reel-progress" aria-label={`Video render ${Math.round(progress)}%`}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className="reel-status">
                De Reel wordt lokaal in 1080×1920, 30 FPS, cinematic motion, een echte originele soundtrack en SFX opgebouwd. Houd dit scherm ongeveer {reel.durationSeconds} seconden open.
              </p>
            </>
          )}

          {error && (
            <p className="reel-error">
              Video maken lukt niet in deze browser. Open dezelfde pagina in een recente Safari/Chrome-browser en probeer opnieuw.
            </p>
          )}

          {videoUrl && (
            <div className="reel-video-wrap">
              <div className="split-title">
                <h2>Klaar om te posten</h2>
                <span>{videoMime.includes('mp4') ? 'MP4' : 'WebM'}</span>
              </div>
              <video className="reel-video" src={videoUrl} controls playsInline preload="metadata" />
              <div className="buttons">
                <button onClick={saveVideo}>Bewaar video op iPhone</button>
                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                  <button className="secondary" onClick={shareVideo}>Deel / post video</button>
                )}
                <button className="secondary" onClick={openVideo}>Open video</button>
              </div>
              {saveStatus && <p className="reel-save-status">{saveStatus}</p>}
              <small className="reel-save-note">
                iPhone: tik op “Bewaar video op iPhone” en kies daarna “Bewaar video” in het iOS-deelmenu. De Reel wordt als videobestand doorgegeven, niet als webpagina.
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildReelModel(brand, data) {
  if (!data?.reelHook) return null;

  return {
    seed: Number(data.reelSeed) >>> 0,
    variant: Number(data.reelVariant) || 0,
    hook: clean(data.reelHook),
    insight: clean(data.reelInsight),
    payoff: clean(data.reelPayoff),
    topic: clean(data.reelTopic || brand.system).toUpperCase(),
    dateKey: clean(data.reelDateKey),
    durationSeconds: Math.max(8, Math.min(18, Number(data.reelDurationSeconds) || 12))
  };
}

async function recordReelVideo({ brand, reel, onProgress }) {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    throw new Error('MEDIA_RECORDER_NOT_SUPPORTED');
  }

  const canvas = document.createElement('canvas');
  canvas.width = REEL_WIDTH;
  canvas.height = REEL_HEIGHT;

  if (typeof canvas.captureStream !== 'function') {
    throw new Error('CANVAS_CAPTURE_NOT_SUPPORTED');
  }

  const staticLayer = createReelStaticLayer(brand, reel);
  const videoStream = canvas.captureStream(EXPORT_FPS);
  const videoTrack = videoStream.getVideoTracks()[0];

  const audio = await createReelAudioTrack({
    brand,
    reel,
    durationSeconds: reel.durationSeconds
  });

  const tracks = [
    ...videoStream.getVideoTracks(),
    ...(audio?.track ? [audio.track] : [])
  ];
  const stream = new MediaStream(tracks);

  const mimeType = preferredMimeType(Boolean(audio?.track));
  const chunks = [];
  let recorder;

  const recorderOptions = {
    videoBitsPerSecond: EXPORT_VIDEO_BITRATE,
    audioBitsPerSecond: EXPORT_AUDIO_BITRATE
  };
  if (mimeType) recorderOptions.mimeType = mimeType;

  try {
    recorder = new MediaRecorder(stream, recorderOptions);
  } catch {
    recorder = new MediaRecorder(stream);
  }

  const finished = new Promise((resolve, reject) => {
    recorder.ondataavailable = (event) => {
      if (event.data?.size) chunks.push(event.data);
    };
    recorder.onerror = () => reject(new Error('MEDIA_RECORDER_FAILED'));
    recorder.onstop = () => resolve();
  });

  const recordingAsMp4 = isMp4Mime(recorder.mimeType || mimeType);
  if (recordingAsMp4) recorder.start();
  else recorder.start(500);

  // Audio starts only after MediaRecorder is active so the resulting file stays in sync.
  audio?.start?.();

  const totalFrames = Math.max(1, Math.round(reel.durationSeconds * EXPORT_FPS));
  const frameDurationMs = 1000 / EXPORT_FPS;
  const startedAt = performance.now();

  for (let frame = 0; frame <= totalFrames; frame++) {
    const seconds = Math.min(reel.durationSeconds, frame / EXPORT_FPS);
    drawReelFrame(canvas, brand, reel, seconds, staticLayer);

    // captureStream(0) is not reliable on every iPhone build. When requestFrame exists,
    // explicitly tell the track a fresh full-resolution frame is ready.
    if (typeof videoTrack?.requestFrame === 'function') {
      try {
        videoTrack.requestFrame();
      } catch {}
    }

    if (frame % 3 === 0 || frame === totalFrames) {
      onProgress?.((frame / totalFrames) * 100);
    }

    if (frame < totalFrames) {
      const target = startedAt + (frame + 1) * frameDurationMs;
      const delay = target - performance.now();

      if (delay > 1) {
        await wait(delay);
      } else {
        // Yield back to WebKit even when rendering took longer than the ideal frame budget.
        await nextAnimationFrame();
      }
    }
  }

  // Keep the final frame visible briefly so the encoder receives the end frame cleanly.
  await wait(120);

  if (recorder.state !== 'inactive') recorder.stop();
  await finished;

  stream.getTracks().forEach((track) => {
    try { track.stop(); } catch {}
  });
  await audio?.cleanup?.();

  const rawMimeType = recorder.mimeType || mimeType || chunks[0]?.type || 'video/webm';
  const actualMimeType = isMp4Mime(rawMimeType) ? 'video/mp4' : 'video/webm';
  const blob = new Blob(chunks, { type: actualMimeType });

  if (!blob.size) throw new Error('EMPTY_VIDEO');

  onProgress?.(100);
  return {
    blob,
    mimeType: actualMimeType,
    hasAudio: Boolean(audio?.track)
  };
}

async function createReelAudioTrack({ brand, reel, durationSeconds }) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  let context;
  try {
    context = new AudioCtx({ latencyHint: 'playback' });
    if (context.state === 'suspended') await context.resume();
  } catch {
    return null;
  }

  const destination = context.createMediaStreamDestination();
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.knee.value = 12;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.006;
  compressor.release.value = 0.22;
  compressor.connect(destination);

  const musicChoice = selectDailyMusicTrack(brand, reel);
  const musicBuffer = await loadMusicBuffer(context, musicChoice?.src).catch(() => null);

  const musicSource = context.createBufferSource();
  const musicGain = context.createGain();
  const musicFilter = context.createBiquadFilter();

  if (musicBuffer) {
    musicSource.buffer = musicBuffer;
    musicFilter.type = 'lowpass';
    musicFilter.frequency.value = 15500;
    musicFilter.Q.value = 0.15;

    musicSource.connect(musicFilter);
    musicFilter.connect(musicGain);
    musicGain.connect(compressor);
  }

  const sfxBuffer = buildReelSfxBuffer(context, brand, reel, durationSeconds);
  const sfxSource = context.createBufferSource();
  const sfxGain = context.createGain();
  sfxSource.buffer = sfxBuffer;
  sfxGain.gain.value = 0.72;
  sfxSource.connect(sfxGain);
  sfxGain.connect(compressor);

  let fallbackSource = null;
  let fallbackGain = null;
  if (!musicBuffer) {
    fallbackSource = context.createBufferSource();
    fallbackGain = context.createGain();
    fallbackSource.buffer = buildReelAudioBuffer(context, brand, reel, durationSeconds);
    fallbackGain.gain.value = 0.62;
    fallbackSource.connect(fallbackGain);
    fallbackGain.connect(compressor);
  }

  const track = destination.stream.getAudioTracks()[0];
  let started = false;

  return {
    track,
    musicChoice,
    hasRealMusic: Boolean(musicBuffer),
    start() {
      if (started) return;
      started = true;

      const when = context.currentTime + 0.045;

      if (musicBuffer) {
        const maxStart = Math.max(0, musicBuffer.duration - durationSeconds - 0.18);
        const safeOffset = Math.min(musicChoice?.offsetSeconds || 0, maxStart);
        const volume = REEL_MUSIC_VOLUME[brand?.visualMode] ?? 0.70;

        musicGain.gain.setValueAtTime(0.0001, when);
        musicGain.gain.linearRampToValueAtTime(volume, when + 0.14);
        musicGain.gain.setValueAtTime(volume, when + Math.max(0.2, durationSeconds - 0.55));
        musicGain.gain.linearRampToValueAtTime(0.0001, when + Math.max(0.25, durationSeconds - 0.06));

        musicSource.start(when, safeOffset);
      } else {
        fallbackSource?.start(when);
      }

      sfxSource.start(when);
    },
    async cleanup() {
      try { musicSource.stop(); } catch {}
      try { sfxSource.stop(); } catch {}
      try { fallbackSource?.stop(); } catch {}
      try { track?.stop(); } catch {}
      try { await context.close(); } catch {}
    }
  };
}

function selectDailyMusicTrack(brand, reel) {
  const mode = brand?.visualMode || 'arcynth';
  const tracks = REEL_MUSIC_LIBRARY[mode] || REEL_MUSIC_LIBRARY.arcynth;
  if (!tracks?.length) return null;

  const seed = Number(reel?.seed) >>> 0;
  const trackIndex = Math.floor(unit(seed, 1601) * tracks.length) % tracks.length;

  const offsetSlots = [0, 3, 6, 9];
  const offsetIndex = Math.floor(unit(seed, 1602) * offsetSlots.length) % offsetSlots.length;

  return {
    src: tracks[trackIndex],
    trackIndex,
    offsetSeconds: offsetSlots[offsetIndex],
    label: `MUSIC ${String(trackIndex + 1).padStart(2, '0')} · ${offsetSlots[offsetIndex]}s`
  };
}

async function loadMusicBuffer(context, src) {
  if (!src) return null;

  const response = await fetch(src, {
    cache: 'force-cache',
    headers: { accept: 'audio/mpeg,audio/*;q=0.9,*/*;q=0.1' }
  });

  if (!response.ok) {
    throw new Error(`MUSIC_ASSET_${response.status}`);
  }

  const bytes = await response.arrayBuffer();
  if (!bytes.byteLength) throw new Error('EMPTY_MUSIC_ASSET');

  return await context.decodeAudioData(bytes.slice(0));
}

function buildReelSfxBuffer(context, brand, reel, durationSeconds) {
  const sampleRate = context.sampleRate || 48000;
  const frameCount = Math.ceil(durationSeconds * sampleRate);
  const buffer = context.createBuffer(2, frameCount, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);
  const profile = getBrandAudioProfile(brand?.visualMode);

  [0.10, 2.15, 6.05, 9.05].forEach((time, index) => {
    addTonalSweep({
      left,
      right,
      sampleRate,
      start: time,
      duration: index === 0 ? 0.34 : 0.46,
      fromHz: profile.sweepFrom + index * 22,
      toHz: profile.sweepTo + index * 70,
      gain: index === 0 ? 0.055 : 0.075,
      pan: index % 2 === 0 ? -0.15 : 0.15
    });

    addKick({
      left,
      right,
      sampleRate,
      start: time + 0.03,
      gain: index === 0 ? 0.10 : 0.14
    });
  });

  masterAudio(left, right, sampleRate, durationSeconds);
  return buffer;
}

function buildReelAudioBuffer(context, brand, reel, durationSeconds) {
  const sampleRate = context.sampleRate || 48000;
  const frameCount = Math.ceil(durationSeconds * sampleRate);
  const buffer = context.createBuffer(2, frameCount, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  const profile = getBrandAudioProfile(brand?.visualMode);
  const seed = Number(reel.seed) >>> 0;
  const beat = 60 / profile.bpm;
  const totalBeats = Math.ceil(durationSeconds / beat);
  const variant = (Number(reel.variant) || 0) % 4;
  const progression = profile.progressions[variant] || profile.progressions[0];

  // Clean cinematic pad: no random/noise layer, so there is no crackling texture.
  for (let bar = 0; bar < Math.ceil(totalBeats / 4); bar++) {
    const chordOffset = progression[bar % progression.length];
    const chordStart = bar * beat * 4;
    const chordDuration = Math.min(beat * 4.35, durationSeconds - chordStart + 0.25);
    if (chordDuration <= 0) continue;

    const chord = profile.chord.map((interval) => profile.rootMidi + chordOffset + interval);
    chord.forEach((midi, voiceIndex) => {
      addMusicalNote({
        left,
        right,
        sampleRate,
        start: chordStart,
        duration: chordDuration,
        frequency: midiToHz(midi),
        gain: 0.030 - voiceIndex * 0.003,
        pan: voiceIndex === 0 ? -0.30 : voiceIndex === 1 ? 0.28 : 0,
        attack: 0.16,
        release: 0.58,
        tone: 'pad'
      });
    });
  }

  // Bass + clean pulse.
  for (let b = 0; b < totalBeats; b++) {
    const time = b * beat;
    const bar = Math.floor(b / 4);
    const chordOffset = progression[bar % progression.length];
    const root = profile.rootMidi + chordOffset - 12;

    addKick({
      left,
      right,
      sampleRate,
      start: time,
      gain: b % 4 === 0 ? 0.34 : 0.24
    });

    addMusicalNote({
      left,
      right,
      sampleRate,
      start: time + 0.02,
      duration: beat * 0.72,
      frequency: midiToHz(root),
      gain: 0.080,
      pan: 0,
      attack: 0.008,
      release: 0.24,
      tone: 'bass'
    });

    // Clean melodic plucks. Daily seed rotates note order without changing brand identity.
    const arp = profile.arp[(b + Math.floor(unit(seed, 701) * profile.arp.length)) % profile.arp.length];
    addMusicalNote({
      left,
      right,
      sampleRate,
      start: time + beat * 0.50,
      duration: beat * 0.42,
      frequency: midiToHz(profile.rootMidi + chordOffset + arp + 12),
      gain: 0.048,
      pan: b % 2 === 0 ? -0.42 : 0.42,
      attack: 0.005,
      release: 0.20,
      tone: 'pluck'
    });

    if (b % 2 === 1) {
      addSoftAccent({
        left,
        right,
        sampleRate,
        start: time,
        frequency: midiToHz(profile.rootMidi + chordOffset + 19),
        gain: 0.026,
        pan: b % 4 === 1 ? -0.55 : 0.55
      });
    }
  }

  // Scene transitions: tonal sweeps instead of noise-based whooshes.
  [0.10, 2.15, 6.20, 9.15].forEach((time, index) => {
    addTonalSweep({
      left,
      right,
      sampleRate,
      start: time,
      duration: index === 0 ? 0.42 : 0.52,
      fromHz: profile.sweepFrom + index * 18,
      toHz: profile.sweepTo + index * 60,
      gain: index === 0 ? 0.070 : 0.095,
      pan: index % 2 === 0 ? -0.18 : 0.18
    });
  });

  // Final CTA lift.
  addMusicalNote({
    left,
    right,
    sampleRate,
    start: Math.max(0, durationSeconds - 2.75),
    duration: 2.45,
    frequency: midiToHz(profile.rootMidi + 24),
    gain: 0.045,
    pan: -0.35,
    attack: 0.08,
    release: 0.58,
    tone: 'pad'
  });
  addMusicalNote({
    left,
    right,
    sampleRate,
    start: Math.max(0, durationSeconds - 2.75),
    duration: 2.45,
    frequency: midiToHz(profile.rootMidi + 31),
    gain: 0.040,
    pan: 0.35,
    attack: 0.08,
    release: 0.58,
    tone: 'pad'
  });

  masterAudio(left, right, sampleRate, durationSeconds);
  return buffer;
}

function getBrandAudioProfile(mode) {
  const map = {
    kryvant: {
      bpm: 104,
      rootMidi: 38,
      chord: [0, 3, 7],
      arp: [0, 7, 10, 15, 7, 19],
      sweepFrom: 105,
      sweepTo: 520,
      progressions: [[0, -2, -5, -7], [0, -5, -2, -7], [0, 3, -2, -5], [0, -7, -5, -2]]
    },
    lumeriq: {
      bpm: 112,
      rootMidi: 41,
      chord: [0, 3, 7],
      arp: [0, 7, 12, 15, 19, 12],
      sweepFrom: 135,
      sweepTo: 720,
      progressions: [[0, 3, -2, 5], [0, -2, 3, 7], [0, 5, 3, -2], [0, 7, 5, 3]]
    },
    rangenest: {
      bpm: 98,
      rootMidi: 45,
      chord: [0, 3, 7],
      arp: [0, 7, 10, 12, 7, 15],
      sweepFrom: 95,
      sweepTo: 480,
      progressions: [[0, -5, -3, -7], [0, -3, -5, -7], [0, 2, -3, -5], [0, -7, -3, -5]]
    },
    ninetyvale: {
      bpm: 118,
      rootMidi: 48,
      chord: [0, 3, 7],
      arp: [0, 7, 12, 19, 12, 15],
      sweepFrom: 145,
      sweepTo: 820,
      progressions: [[0, 5, 3, 7], [0, 3, 5, 10], [0, 7, 5, 3], [0, 10, 7, 5]]
    },
    arcynth: {
      bpm: 108,
      rootMidi: 40,
      chord: [0, 4, 7],
      arp: [0, 7, 11, 14, 19, 11],
      sweepFrom: 125,
      sweepTo: 680,
      progressions: [[0, 5, 7, 3], [0, 7, 5, 10], [0, 3, 5, 7], [0, 10, 7, 5]]
    }
  };
  return map[mode] || map.arcynth;
}

function midiToHz(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function addMusicalNote({
  left,
  right,
  sampleRate,
  start,
  duration,
  frequency,
  gain,
  pan = 0,
  attack = 0.01,
  release = 0.20,
  tone = 'pad'
}) {
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(left.length, Math.ceil((start + duration) * sampleRate));
  if (endIndex <= startIndex || !Number.isFinite(frequency) || frequency <= 0) return;

  const panLeft = Math.sqrt((1 - clamp(pan, -1, 1)) * 0.5);
  const panRight = Math.sqrt((1 + clamp(pan, -1, 1)) * 0.5);
  const attackSafe = Math.max(0.001, attack);
  const releaseSafe = Math.max(0.001, release);

  for (let i = startIndex; i < endIndex; i++) {
    const t = (i - startIndex) / sampleRate;
    const remaining = duration - t;
    const env = Math.min(1, t / attackSafe, remaining / releaseSafe);
    const phase = Math.PI * 2 * frequency * t;

    let wave;
    if (tone === 'bass') {
      wave =
        Math.sin(phase) * 0.88 +
        Math.sin(phase * 2) * 0.09 +
        Math.sin(phase * 0.5) * 0.03;
    } else if (tone === 'pluck') {
      const decay = Math.exp(-t * 7.0);
      wave =
        (Math.sin(phase) * 0.74 +
          Math.sin(phase * 2) * 0.18 +
          Math.sin(phase * 3) * 0.08) *
        decay;
    } else {
      wave =
        Math.sin(phase) * 0.66 +
        Math.sin(phase * 0.5) * 0.18 +
        Math.sin(phase * 2) * 0.10 +
        Math.sin(phase * 3) * 0.06;
    }

    const sample = wave * env * gain;
    left[i] += sample * panLeft;
    right[i] += sample * panRight;
  }
}

function addKick({ left, right, sampleRate, start, gain }) {
  const duration = 0.28;
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(left.length, Math.ceil((start + duration) * sampleRate));

  let phase = 0;
  for (let i = startIndex; i < endIndex; i++) {
    const t = (i - startIndex) / sampleRate;
    const env = Math.exp(-t * 15);
    const freq = 118 * Math.exp(-t * 9) + 46;
    phase += (Math.PI * 2 * freq) / sampleRate;
    const click = Math.sin(Math.PI * 2 * 1450 * t) * Math.exp(-t * 65) * 0.08;
    const sample = (Math.sin(phase) * 0.92 + click) * env * gain;
    left[i] += sample * 0.707;
    right[i] += sample * 0.707;
  }
}

function addSoftAccent({ left, right, sampleRate, start, frequency, gain, pan = 0 }) {
  addMusicalNote({
    left,
    right,
    sampleRate,
    start,
    duration: 0.16,
    frequency,
    gain,
    pan,
    attack: 0.004,
    release: 0.14,
    tone: 'pluck'
  });
}

function addTonalSweep({
  left,
  right,
  sampleRate,
  start,
  duration,
  fromHz,
  toHz,
  gain,
  pan = 0
}) {
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(left.length, Math.ceil((start + duration) * sampleRate));
  const panLeft = Math.sqrt((1 - clamp(pan, -1, 1)) * 0.5);
  const panRight = Math.sqrt((1 + clamp(pan, -1, 1)) * 0.5);
  let phase = 0;

  for (let i = startIndex; i < endIndex; i++) {
    const t = (i - startIndex) / sampleRate;
    const p = clamp(t / duration, 0, 1);
    const freq = lerp(fromHz, toHz, easeInOut(p));
    phase += (Math.PI * 2 * freq) / sampleRate;
    const env = Math.sin(Math.PI * p);
    const sample =
      (Math.sin(phase) * 0.78 + Math.sin(phase * 2) * 0.14 + Math.sin(phase * 0.5) * 0.08) *
      env *
      gain;
    left[i] += sample * panLeft;
    right[i] += sample * panRight;
  }
}

function masterAudio(left, right, sampleRate, durationSeconds) {
  let peak = 0;
  for (let i = 0; i < left.length; i++) {
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  }

  const normalization = peak > 0 ? Math.min(1.0, 0.86 / peak) : 1;
  const fadeSamples = Math.max(1, Math.floor(sampleRate * 0.12));
  const tailSamples = Math.max(1, Math.floor(sampleRate * 0.42));

  for (let i = 0; i < left.length; i++) {
    const fadeIn = i < fadeSamples ? i / fadeSamples : 1;
    const remaining = left.length - 1 - i;
    const fadeOut = remaining < tailSamples ? remaining / tailSamples : 1;
    const envelope = Math.min(fadeIn, fadeOut);

    left[i] = Math.tanh(left[i] * normalization * 1.05) * envelope;
    right[i] = Math.tanh(right[i] * normalization * 1.05) * envelope;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

function nextAnimationFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function isMp4Mime(value) {
  return String(value || '').toLowerCase().includes('mp4');
}

function preferredMimeType(withAudio = true) {
  const candidates = withAudio
    ? [
        'video/mp4;codecs="avc1.640028,mp4a.40.2"',
        'video/mp4;codecs="avc1.4D401F,mp4a.40.2"',
        'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
      ]
    : [
        'video/mp4;codecs=avc1.640028',
        'video/mp4;codecs=avc1.4D401F',
        'video/mp4;codecs=avc1.42E01E',
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
      ];

  if (typeof MediaRecorder?.isTypeSupported !== 'function') return '';
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || '';
}

function drawReelFrame(canvas, brand, reel, seconds, staticLayer = null) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const scaleX = canvas.width / REEL_WIDTH;
  const scaleY = canvas.height / REEL_HEIGHT;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';

  ctx.save();
  ctx.scale(scaleX, scaleY);

  if (staticLayer) {
    ctx.drawImage(staticLayer, 0, 0, REEL_WIDTH, REEL_HEIGHT);
  } else {
    drawReelStaticLayer(ctx, brand, reel);
  }

  drawCinematicAtmosphere(ctx, brand, reel, seconds);

  switch (brand.visualMode) {
    case 'kryvant':
      drawKryvantReel(ctx, brand, reel, seconds);
      break;
    case 'lumeriq':
      drawLumeriqReel(ctx, brand, reel, seconds);
      break;
    case 'rangenest':
      drawRangenestReel(ctx, brand, reel, seconds);
      break;
    case 'ninetyvale':
      drawNinetyValeReel(ctx, brand, reel, seconds);
      break;
    case 'arcynth':
      drawArcynthReel(ctx, brand, reel, seconds);
      break;
    default:
      drawKryvantReel(ctx, brand, reel, seconds);
  }

  drawCinematicTransitions(ctx, brand, reel, seconds);
  ctx.restore();
}

function createReelStaticLayer(brand, reel) {
  const layer = document.createElement('canvas');
  layer.width = REEL_WIDTH;
  layer.height = REEL_HEIGHT;
  const ctx = layer.getContext('2d', { alpha: false });
  if (!ctx) return layer;

  ctx.imageSmoothingEnabled = true;
  if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';
  drawReelStaticLayer(ctx, brand, reel);
  return layer;
}

function drawReelStaticLayer(ctx, brand, reel) {
  switch (brand.visualMode) {
    case 'kryvant':
      fillFrame(ctx, '#020711');
      drawGrid(ctx, 'rgba(255,255,255,0.035)', 92, 116);
      glow(ctx, 170, 1020, 440, '#ff4964', 0.16);
      glow(ctx, 910, 1020, 500, brand.color, 0.24);
      drawPersistentBrand(ctx, brand, reel, '#9fb9dc');
      break;
    case 'lumeriq':
      fillFrame(ctx, '#090313');
      glow(ctx, 820, 950, 620, brand.color, 0.24);
      glow(ctx, 220, 1600, 390, '#7c3aed', 0.18);
      drawPersistentBrand(ctx, brand, reel, '#c9b8dd');
      break;
    case 'rangenest':
      fillFrame(ctx, '#06110e');
      drawGrid(ctx, 'rgba(96,211,157,0.035)', 108, 108);
      glow(ctx, 820, 1040, 520, brand.color, 0.18);
      drawPersistentBrand(ctx, brand, reel, '#a7c7b8');
      break;
    case 'ninetyvale':
      fillFrame(ctx, '#050913');
      drawFootballPitch(ctx);
      glow(ctx, 850, 980, 520, '#2563eb', 0.16);
      glow(ctx, 220, 1320, 420, '#d6a354', 0.10);
      drawPersistentBrand(ctx, brand, reel, '#c7cfdd');
      break;
    case 'arcynth':
      fillFrame(ctx, '#031119');
      drawGrid(ctx, 'rgba(255,255,255,0.035)', 90, 112);
      glow(ctx, 850, 1020, 560, brand.color, 0.18);
      drawPersistentBrand(ctx, brand, reel, '#a7c5cb');
      break;
    default:
      fillFrame(ctx, '#020711');
      drawPersistentBrand(ctx, brand, reel, '#9fb9dc');
  }
}

function drawKryvantReel(ctx, brand, reel, t) {
  const intro = sceneAlpha(t, 0, 2.45, 0.28);
  withAlpha(ctx, intro, () => {
    drawKineticHero(ctx, reel.hook, 78, 390, 920, brand.color, localProgress(t, 0, 2.05), reel.variant);
    drawAnimatedKicker(ctx, 'READ BELOW THE CANDLE', 80, 760, brand.color, localProgress(t, 0.35, 1.45));
  });

  withAlpha(ctx, sceneAlpha(t, 1.85, 6.75, 0.34), () => {
    const p = easeInOut(localProgress(t, 1.85, 6.45));
    drawKryvantFlow(ctx, brand, reel.seed, p);
    drawLiveMeter(ctx, 78, 1240, 924, 'FLOW PRESSURE', p, brand.color, '#ff4964');
    drawBodyTextAnimated(ctx, reel.insight, 80, 1390, 900, '#aab8ca', localProgress(t, 2.35, 4.05));
  });

  withAlpha(ctx, sceneAlpha(t, 5.95, 9.50, 0.30), () => {
    drawImpactPanel(ctx, reel.payoff, ['FLOW', 'LIQUIDITY', 'RESPONSE'], brand.color, '#07111c', localProgress(t, 6.05, 7.30));
  });

  withAlpha(ctx, sceneAlpha(t, 8.85, 12.01, 0.34), () => {
    drawFinalCtaAnimated(ctx, brand, reel, brand.color, '#06101a', t, null);
  });
}

function drawKryvantFlow(ctx, brand, seed, progress) {
  const cx = 540;
  const cy = 1040;
  for (let i = 0; i < 22; i++) {
    const y = 780 + i * 24;
    const wobble = (unit(seed, 20 + i) - 0.5) * 150;
    const endXLeft = 70 + (cx - 70) * progress;
    const endXRight = 1010 - (1010 - cx) * progress;

    ctx.strokeStyle = `rgba(255,73,100,${0.14 + (i % 5) * 0.055})`;
    ctx.lineWidth = 1.5 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.bezierCurveTo(260, y + wobble, 390, cy + wobble * 0.3, endXLeft, cy);
    ctx.stroke();

    ctx.strokeStyle = hexToRgba(brand.color, 0.16 + (i % 5) * 0.055);
    ctx.beginPath();
    ctx.moveTo(1010, y + 8);
    ctx.bezierCurveTo(820, y - wobble, 690, cy - wobble * 0.3, endXRight, cy);
    ctx.stroke();
  }

  const radius = 35 + progress * 70;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.18, brand.color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

function drawLumeriqReel(ctx, brand, reel, t) {
  withAlpha(ctx, sceneAlpha(t, 0, 2.45, 0.28), () => {
    drawKineticHero(ctx, reel.hook, 78, 390, 920, brand.color, localProgress(t, 0, 2.05), reel.variant);
    drawAnimatedKicker(ctx, '75 MICRO-FAMILIES · ADAPTIVE SELECTION', 80, 760, '#c084fc', localProgress(t, 0.35, 1.45));
  });

  withAlpha(ctx, sceneAlpha(t, 1.85, 6.75, 0.34), () => {
    const p = easeInOut(localProgress(t, 1.85, 6.45));
    drawLumeriqNodes(ctx, brand, reel.seed, p);
    drawSelectionBeam(ctx, 770, 1040, p, brand.color);
    drawBodyTextAnimated(ctx, reel.insight, 80, 1390, 900, '#cdbde0', localProgress(t, 2.35, 4.05));
  });

  withAlpha(ctx, sceneAlpha(t, 5.95, 9.50, 0.30), () => {
    drawImpactPanel(ctx, reel.payoff, ['REGIME', 'SETUP', 'SELECT'], brand.color, '#160923', localProgress(t, 6.05, 7.30));
  });

  withAlpha(ctx, sceneAlpha(t, 8.85, 12.01, 0.34), () => {
    drawFinalCtaAnimated(ctx, brand, reel, brand.color, '#160923', t, '#f0abfc');
  });
}

function drawLumeriqNodes(ctx, brand, seed, progress) {
  const tx = 770;
  const ty = 1040;
  for (let i = 0; i < 75; i++) {
    const sx = 70 + unit(seed, 100 + i * 2) * 650;
    const sy = 760 + unit(seed, 101 + i * 2) * 520;
    const stagger = clamp(progress * 1.45 - (i % 12) * 0.03, 0, 1);
    const x = lerp(sx, tx, ease(stagger));
    const y = lerp(sy, ty, ease(stagger));
    const r = 2.8 + (i % 4) * 0.9;

    ctx.fillStyle = i % 3 === 0 ? brand.color : i % 3 === 1 ? '#8b5cf6' : '#f0abfc';
    ctx.globalAlpha = 0.32 + stagger * 0.58;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = hexToRgba(brand.color, 0.75);
  ctx.lineWidth = 3;
  [150, 108, 66].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(tx, ty, radius * progress, 0, Math.PI * 2);
    ctx.stroke();
  });

  if (progress > 0.72) {
    const a = clamp((progress - 0.72) / 0.28, 0, 1);
    withAlpha(ctx, a, () => {
      ctx.fillStyle = '#fff7ff';
      ctx.font = '900 38px system-ui';
      ctx.fillText('SELECTED', tx - 104, ty + 12);
    });
  }
}

function drawRangenestReel(ctx, brand, reel, t) {
  withAlpha(ctx, sceneAlpha(t, 0, 2.45, 0.28), () => {
    drawKineticHero(ctx, reel.hook, 78, 390, 920, brand.color, localProgress(t, 0, 2.05), reel.variant);
    drawAnimatedKicker(ctx, 'WEEKLY CONFIGURATION INTELLIGENCE', 80, 760, brand.color, localProgress(t, 0.35, 1.45));
  });

  withAlpha(ctx, sceneAlpha(t, 1.85, 6.75, 0.34), () => {
    const p = easeInOut(localProgress(t, 1.85, 6.45));
    drawRangeEngine(ctx, brand, reel.seed, p);
    drawRangeStatus(ctx, 80, 1288, 920, p, brand.color);
    drawBodyTextAnimated(ctx, reel.insight, 80, 1400, 900, '#accabd', localProgress(t, 2.35, 4.05));
  });

  withAlpha(ctx, sceneAlpha(t, 5.95, 9.50, 0.30), () => {
    drawImpactPanel(ctx, reel.payoff, ['RANGE', 'VOLATILITY', 'STRUCTURE'], brand.color, '#071812', localProgress(t, 6.05, 7.30));
  });

  withAlpha(ctx, sceneAlpha(t, 8.85, 12.01, 0.34), () => {
    drawFinalCtaAnimated(ctx, brand, reel, brand.color, '#071812', t, '#9cf5cb');
  });
}

function drawRangeEngine(ctx, brand, seed, progress) {
  const x = 80;
  const y = 770;
  const w = 920;
  const h = 500;
  roundFill(ctx, x, y, w, h, 32, 'rgba(7,26,20,0.92)');
  roundStroke(ctx, x, y, w, h, 32, hexToRgba(brand.color, 0.25));

  const ranges = [
    { top: y + 42, height: 112, alpha: 0.14 },
    { top: y + 190, height: 112, alpha: 0.075 },
    { top: y + 338, height: 112, alpha: 0.12 }
  ];
  ranges.forEach((range, index) => {
    ctx.fillStyle = hexToRgba(brand.color, range.alpha);
    ctx.fillRect(x + 28, range.top, w - 56, range.height);
    ctx.fillStyle = '#8fd3b4';
    ctx.font = '700 15px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(['UPPER RANGE', 'CORE RANGE', 'LOWER RANGE'][index], x + 48, range.top + 32);
  });

  ctx.strokeStyle = brand.color;
  ctx.lineWidth = 5;
  const rangePoints = [{ x: x + 44, y: y + h * 0.67 }];
  let py = y + h * 0.67;
  const points = 16;
  for (let i = 1; i <= points; i++) {
    const px = x + 44 + (w - 88) * (i / points);
    const target = y + 70 + unit(seed, 200 + i) * (h - 140);
    py = lerp(py, target, 0.58);
    rangePoints.push({ x: px, y: py });
  }
  drawProgressivePath(ctx, rangePoints, progress);

  const rangeWidth = 220 + progress * 520;
  ctx.strokeStyle = hexToRgba(brand.color, 0.8);
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 10]);
  ctx.strokeRect(540 - rangeWidth / 2, y + 84, rangeWidth, h - 168);
  ctx.setLineDash([]);
}

function drawNinetyValeReel(ctx, brand, reel, t) {
  withAlpha(ctx, sceneAlpha(t, 0, 2.45, 0.28), () => {
    drawKineticHero(ctx, reel.hook, 78, 390, 920, '#4f8cff', localProgress(t, 0, 2.05), reel.variant);
    drawAnimatedKicker(ctx, 'FOOTBALL VALUE INTELLIGENCE', 80, 760, '#d7aa62', localProgress(t, 0.35, 1.45));
  });

  withAlpha(ctx, sceneAlpha(t, 1.85, 6.75, 0.34), () => {
    const p = easeInOut(localProgress(t, 1.85, 6.45));
    drawNinetyValeModel(ctx, reel.seed, p);
    drawValueDecisionBadge(ctx, 540, 1280, p, '#4f8cff', '#d7aa62');
    drawBodyTextAnimated(ctx, reel.insight, 80, 1410, 900, '#b9c3d2', localProgress(t, 2.35, 4.05));
  });

  withAlpha(ctx, sceneAlpha(t, 5.95, 9.50, 0.30), () => {
    drawImpactPanel(ctx, reel.payoff, ['MODEL', 'MARKET', 'VALUE'], '#4f8cff', '#07101e', localProgress(t, 6.05, 7.30), '#d7aa62');
  });

  withAlpha(ctx, sceneAlpha(t, 8.85, 12.01, 0.34), () => {
    drawFinalCtaAnimated(ctx, brand, reel, '#4f8cff', '#07101e', t, '#d7aa62');
  });
}

function drawFootballPitch(ctx) {
  ctx.strokeStyle = 'rgba(255,255,255,0.035)';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 720, 920, 610);
  ctx.beginPath();
  ctx.moveTo(540, 720);
  ctx.lineTo(540, 1330);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(540, 1025, 118, 0, Math.PI * 2);
  ctx.stroke();
}

function drawNinetyValeModel(ctx, seed, progress) {
  const x = 120;
  const y = 800;
  const width = 840;
  const rows = [
    { label: 'MODEL VIEW', color: '#4f8cff', target: 0.62 + unit(seed, 410) * 0.18 },
    { label: 'MARKET PRICE', color: '#d7aa62', target: 0.46 + unit(seed, 411) * 0.15 },
    { label: 'VALUE CHECK', color: '#7dd3fc', target: 0.72 + unit(seed, 412) * 0.16 }
  ];

  rows.forEach((row, index) => {
    const ry = y + index * 150;
    ctx.fillStyle = '#7f8b9d';
    ctx.font = '800 18px system-ui';
    ctx.fillText(row.label, x, ry);
    roundFill(ctx, x, ry + 34, width, 52, 26, 'rgba(255,255,255,0.055)');
    roundFill(ctx, x, ry + 34, width * row.target * progress, 52, 26, row.color);
  });

  ctx.fillStyle = '#92a0b5';
  ctx.font = '600 14px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('ILLUSTRATIVE VALUE CHECK · NOT A LIVE PICK', x, 1240);
}

function drawArcynthReel(ctx, brand, reel, t) {
  withAlpha(ctx, sceneAlpha(t, 0, 2.45, 0.28), () => {
    drawKineticHero(ctx, reel.hook, 78, 390, 920, brand.color, localProgress(t, 0, 2.05), reel.variant);
    drawAnimatedKicker(ctx, 'MULTI-HORIZON FORECAST INTELLIGENCE', 80, 760, brand.color, localProgress(t, 0.35, 1.45));
  });

  withAlpha(ctx, sceneAlpha(t, 1.85, 6.75, 0.34), () => {
    const p = easeInOut(localProgress(t, 1.85, 6.45));
    drawForecastRoutes(ctx, brand, reel.seed, p);
    drawForecastScanner(ctx, 96, 770, 860, 450, p, brand.color);
    drawBodyTextAnimated(ctx, reel.insight, 80, 1410, 900, '#aac5cb', localProgress(t, 2.35, 4.05));
  });

  withAlpha(ctx, sceneAlpha(t, 5.95, 9.50, 0.30), () => {
    drawImpactPanel(ctx, reel.payoff, ['24H', '7D', '30D'], brand.color, '#071921', localProgress(t, 6.05, 7.30));
  });

  withAlpha(ctx, sceneAlpha(t, 8.85, 12.01, 0.34), () => {
    drawFinalCtaAnimated(ctx, brand, reel, brand.color, '#071921', t, '#7ba8ff');
  });
}

function drawForecastRoutes(ctx, brand, seed, progress) {
  const x = 100;
  const y = 820;
  const w = 850;
  const lines = [
    { label: '24H', color: '#7ba8ff', lift: 80, salt: 510 },
    { label: '7D', color: '#53d3df', lift: 170, salt: 530 },
    { label: '30D', color: brand.color, lift: 260, salt: 550 }
  ];

  lines.forEach((line, index) => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 4;

    const routePoints = [{ x, y: y + index * 90 }];
    const points = 18;
    for (let i = 1; i <= points; i++) {
      const px = x + w * (i / points);
      const trend = -line.lift * (i / points);
      const noise = (unit(seed, line.salt + i) - 0.5) * 80;
      routePoints.push({
        x: px,
        y: y + index * 90 + trend + noise
      });
    }
    drawProgressivePath(ctx, routePoints, progress);

    roundFill(ctx, 828, 690 + index * 108, 150, 66, 18, '#081e27');
    roundStroke(ctx, 828, 690 + index * 108, 150, 66, 18, hexToRgba(line.color, 0.4));
    ctx.fillStyle = line.color;
    ctx.font = '900 27px system-ui';
    ctx.fillText(line.label, 870, 732 + index * 108);
  });
}

function drawProgressivePath(ctx, points, progress) {
  if (!Array.isArray(points) || points.length < 2) return;

  const p = clamp(progress, 0, 1);
  const segmentCount = points.length - 1;
  const exact = p * segmentCount;
  const completed = Math.floor(exact);
  const partial = exact - completed;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i <= completed && i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  if (completed < segmentCount) {
    const from = points[completed];
    const to = points[completed + 1];
    ctx.lineTo(
      lerp(from.x, to.x, partial),
      lerp(from.y, to.y, partial)
    );
  }

  ctx.stroke();
}

function drawCinematicAtmosphere(ctx, brand, reel, t) {
  const accent = brand.visualMode === 'ninetyvale' ? '#4f8cff' : brand.color;
  const variant = (Number(reel.variant) || 0) % 4;
  const pulse = 0.5 + 0.5 * Math.sin(t * (0.9 + variant * 0.08));

  // Slow moving light beam.
  const sweepX = -260 + ((t * 95 + variant * 170) % 1600);
  const gradient = ctx.createLinearGradient(sweepX - 180, 0, sweepX + 180, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, hexToRgba(accent, 0.045 + pulse * 0.025));
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, REEL_WIDTH, REEL_HEIGHT);

  // Deterministic floating particles.
  for (let i = 0; i < 26; i++) {
    const baseX = unit(reel.seed, 1200 + i * 3) * REEL_WIDTH;
    const baseY = unit(reel.seed, 1201 + i * 3) * REEL_HEIGHT;
    const speed = 10 + unit(reel.seed, 1202 + i * 3) * 26;
    const y = (baseY - t * speed + REEL_HEIGHT + 80) % (REEL_HEIGHT + 160) - 80;
    const x = baseX + Math.sin(t * 0.55 + i) * (8 + variant * 3);
    const radius = 1.5 + unit(reel.seed, 1300 + i) * 3.5;
    ctx.fillStyle = hexToRgba(accent, 0.10 + unit(reel.seed, 1400 + i) * 0.18);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Very subtle top/bottom cinematic vignette.
  const top = ctx.createLinearGradient(0, 0, 0, 300);
  top.addColorStop(0, 'rgba(0,0,0,0.38)');
  top.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, REEL_WIDTH, 300);

  const bottom = ctx.createLinearGradient(0, REEL_HEIGHT - 360, 0, REEL_HEIGHT);
  bottom.addColorStop(0, 'rgba(0,0,0,0)');
  bottom.addColorStop(1, 'rgba(0,0,0,0.46)');
  ctx.fillStyle = bottom;
  ctx.fillRect(0, REEL_HEIGHT - 360, REEL_WIDTH, 360);
}

function drawCinematicTransitions(ctx, brand, reel, t) {
  const accent = brand.visualMode === 'ninetyvale' ? '#4f8cff' : brand.color;
  [2.15, 6.05, 9.05].forEach((time, index) => {
    const distance = Math.abs(t - time);
    if (distance > 0.24) return;

    const p = 1 - distance / 0.24;
    const width = 190 + p * 760;
    const x = index % 2 === 0 ? -width + p * (REEL_WIDTH + width) : REEL_WIDTH - p * (REEL_WIDTH + width);
    const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.45, hexToRgba(accent, 0.11 * p));
    gradient.addColorStop(0.58, `rgba(255,255,255,${0.13 * p})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, REEL_WIDTH, REEL_HEIGHT);
  });
}

function drawKineticHero(ctx, text, x, y, maxWidth, accent, progress, variant = 0) {
  const p = easeOutBack(clamp(progress, 0, 1));
  const direction = variant % 2 === 0 ? 1 : -1;
  const offsetX = direction * (1 - p) * 110;
  const offsetY = (1 - p) * 70;
  const scale = 0.91 + p * 0.09;

  ctx.save();
  ctx.translate(x + offsetX, y + offsetY);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 82px system-ui';
  wrap(ctx, text, 0, 0, maxWidth, 88, 5);

  const lineProgress = easeInOut(clamp((progress - 0.22) / 0.60, 0, 1));
  ctx.fillStyle = accent;
  ctx.fillRect(0, 42, Math.max(2, 320 * lineProgress), 9);
  ctx.restore();

  // Accent frame snaps in behind the hook.
  const frameP = easeInOut(clamp((progress - 0.35) / 0.55, 0, 1));
  ctx.strokeStyle = hexToRgba(accent, 0.16 * frameP);
  ctx.lineWidth = 2;
  roundStroke(ctx, x - 18, y - 118, maxWidth + 36, 500, 34, hexToRgba(accent, 0.16 * frameP));
}

function drawAnimatedKicker(ctx, text, x, y, color, progress) {
  const p = easeInOut(clamp(progress, 0, 1));
  ctx.save();
  ctx.translate(x, y + (1 - p) * 24);
  ctx.globalAlpha *= p;
  ctx.fillStyle = color;
  ctx.font = '900 20px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawBodyTextAnimated(ctx, text, x, y, maxWidth, color, progress) {
  const p = easeInOut(clamp(progress, 0, 1));
  ctx.save();
  ctx.globalAlpha *= p;
  ctx.translate(0, (1 - p) * 34);
  ctx.fillStyle = color;
  ctx.font = '520 28px system-ui';
  wrap(ctx, text, x, y, maxWidth, 40, 5);
  ctx.restore();
}

function drawImpactPanel(ctx, payoff, labels, accent, dark, progress, alternate = null) {
  const p = easeOutBack(clamp(progress, 0, 1));
  const panelY = 1120 - (1 - p) * 110;

  glow(ctx, 540, 1320, 470, accent, 0.12 * p);
  roundFill(ctx, 70, panelY, 940, 500, 38, 'rgba(5,11,18,0.90)');
  roundStroke(ctx, 70, panelY, 940, 500, 38, hexToRgba(accent, 0.28));

  ctx.fillStyle = alternate || accent;
  ctx.font = '900 18px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('THE DECISION', 108, panelY + 62);

  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 62px system-ui';
  wrap(ctx, payoff, 108, panelY + 150, 850, 70, 4);

  labels.forEach((label, index) => {
    const chipP = clamp((progress - index * 0.08) / 0.72, 0, 1);
    const chipX = 108 + index * 280;
    const chipWidth = 242 * chipP;
    if (chipWidth > 4) {
      roundFill(
        ctx,
        chipX,
        panelY + 370,
        chipWidth,
        68,
        Math.min(34, chipWidth / 2),
        index === 1 && alternate ? alternate : accent
      );
    }
    if (chipP > 0.62) {
      ctx.fillStyle = dark;
      ctx.font = '900 18px system-ui';
      ctx.fillText(label, chipX + 26, panelY + 413);
    }
  });
}

function drawFinalCtaAnimated(ctx, brand, reel, accent, dark, t, alternate = null) {
  const p = easeOutBack(localProgress(t, 8.85, 10.15));
  const breathe = 1 + Math.sin(t * 3.4) * 0.018;
  const ring = localProgress(t, 9.25, 11.85);

  ctx.save();
  ctx.translate(540, 870);
  ctx.scale(breathe, breathe);
  glow(ctx, 0, 0, 560, accent, 0.22);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 94px system-ui';
  ctx.globalAlpha *= p;
  ctx.fillText(brand.name, 0, -170);

  ctx.fillStyle = alternate || accent;
  ctx.font = '900 24px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(reel.topic, 0, -112);

  ctx.strokeStyle = hexToRgba(alternate || accent, 0.55);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 30, 180 + ring * 48, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring);
  ctx.stroke();

  ctx.fillStyle = '#c2ccd8';
  ctx.font = '650 30px system-ui';
  ctx.fillText('DAILY INTELLIGENCE', 0, -36);
  ctx.restore();

  const buttonP = easeOutBack(localProgress(t, 9.45, 10.45));
  const buttonWidth = 780 * buttonP;
  const buttonX = 540 - buttonWidth / 2;
  if (buttonWidth > 6) {
    roundFill(ctx, buttonX, 1010, buttonWidth, 132, Math.min(36, buttonWidth / 2), accent);
  }

  if (buttonP > 0.72) {
    ctx.fillStyle = dark;
    ctx.font = '900 44px system-ui';
    ctx.fillText('JOIN THE DISCORD', 260, 1092);
    drawArrow(ctx, 820, 1076, dark, 1);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#8391a5';
  ctx.font = '650 20px system-ui';
  ctx.fillText('NEW REEL · EVERY DAY', 540, 1218);
  ctx.textAlign = 'left';
}

function drawLiveMeter(ctx, x, y, w, label, progress, accent, alternate) {
  const p = easeInOut(clamp(progress, 0, 1));
  ctx.fillStyle = '#7e8b9f';
  ctx.font = '800 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(label, x, y);
  roundFill(ctx, x, y + 26, w, 44, 22, 'rgba(255,255,255,0.055)');

  const split = 0.58 + Math.sin(progress * Math.PI * 1.2) * 0.08;
  roundFill(ctx, x, y + 26, w * split * p, 44, 22, accent);
  if (p > 0.35) {
    roundFill(ctx, x + w * split * p, y + 26, w * (1 - split) * p, 44, 22, alternate);
  }
}

function drawSelectionBeam(ctx, x, y, progress, accent) {
  const p = easeInOut(clamp((progress - 0.45) / 0.55, 0, 1));
  if (p <= 0) return;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 230 * p);
  gradient.addColorStop(0, 'rgba(255,255,255,0.22)');
  gradient.addColorStop(0.24, hexToRgba(accent, 0.30));
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(x - 260, y - 260, 520, 520);

  roundFill(ctx, x - 190, y + 180, 380 * p, 84, 24, hexToRgba(accent, 0.94));
  if (p > 0.65) {
    ctx.fillStyle = '#13081e';
    ctx.font = '900 26px system-ui';
    ctx.fillText('1 SELECTED SIGNAL', x - 152, y + 232);
  }
}

function drawRangeStatus(ctx, x, y, w, progress, accent) {
  const p = easeInOut(clamp(progress, 0, 1));
  const labels = ['SCAN', 'FIT', 'CONFIGURE'];
  labels.forEach((label, index) => {
    const itemP = clamp(p * 1.25 - index * 0.12, 0, 1);
    const itemX = x + index * 310;
    roundFill(ctx, itemX, y, 282, 76, 24, itemP > 0.82 ? hexToRgba(accent, 0.96) : 'rgba(255,255,255,0.055)');
    ctx.fillStyle = itemP > 0.82 ? '#06110e' : '#88a899';
    ctx.font = '900 18px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(label, itemX + 26, y + 47);
  });
}

function drawValueDecisionBadge(ctx, x, y, progress, accent, gold) {
  const p = easeOutBack(clamp((progress - 0.56) / 0.44, 0, 1));
  if (p <= 0) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(p, p);
  glow(ctx, 0, 0, 260, accent, 0.16);
  roundFill(ctx, -300, -54, 600, 108, 30, 'rgba(7,16,30,0.95)');
  roundStroke(ctx, -300, -54, 600, 108, 30, hexToRgba(gold, 0.38));
  ctx.textAlign = 'center';
  ctx.fillStyle = gold;
  ctx.font = '900 26px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('PRICE VS PROBABILITY', 0, -4);
  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 38px system-ui';
  ctx.fillText('VALUE CHECK COMPLETE', 0, 38);
  ctx.textAlign = 'left';
  ctx.restore();
}

function drawForecastScanner(ctx, x, y, w, h, progress, accent) {
  const p = easeInOut(clamp(progress, 0, 1));
  const scanX = x + w * p;
  const gradient = ctx.createLinearGradient(scanX - 80, 0, scanX + 20, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(1, hexToRgba(accent, 0.42));
  ctx.fillStyle = gradient;
  ctx.fillRect(scanX - 80, y, 100, h);

  ctx.strokeStyle = hexToRgba(accent, 0.62);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(scanX, y);
  ctx.lineTo(scanX, y + h);
  ctx.stroke();
}

function drawArrow(ctx, x, y, color, scale = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 6 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 34 * scale, y);
  ctx.lineTo(x + 30 * scale, y);
  ctx.lineTo(x + 6 * scale, y - 22 * scale);
  ctx.moveTo(x + 30 * scale, y);
  ctx.lineTo(x + 6 * scale, y + 22 * scale);
  ctx.stroke();
  ctx.lineCap = 'butt';
}

function easeInOut(value) {
  const x = clamp(value, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutBack(value) {
  const x = clamp(value, 0, 1);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function drawPersistentBrand(ctx, brand, reel, muted) {
  ctx.fillStyle = '#f6f9fc';
  ctx.font = '900 34px system-ui';
  ctx.fillText(brand.name, 78, 118);
  ctx.fillStyle = muted;
  ctx.font = '700 16px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(reel.topic, 78, 150);
  ctx.textAlign = 'right';
  ctx.fillStyle = muted;
  ctx.fillText(reel.dateKey, 1000, 118);
  ctx.textAlign = 'left';
}

function drawHeroText(ctx, text, x, y, maxWidth, accent) {
  ctx.fillStyle = '#f7fbff';
  ctx.font = '900 76px system-ui';
  wrap(ctx, text, x, y, maxWidth, 84, 5);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y + 34, 220, 8);
}

function drawBodyText(ctx, text, x, y, maxWidth, color) {
  ctx.fillStyle = color;
  ctx.font = '500 28px system-ui';
  wrap(ctx, text, x, y, maxWidth, 40, 5);
}

function drawPayoff(ctx, text, x, y, maxWidth, color) {
  ctx.fillStyle = color;
  ctx.font = '900 58px system-ui';
  wrap(ctx, text, x, y, maxWidth, 66, 4);
}

function drawPills(ctx, labels, x, y, accent, dark, alternate = null) {
  labels.forEach((label, index) => {
    const width = 242;
    const px = x + index * 276;
    roundFill(ctx, px, y, width, 70, 35, index === 1 && alternate ? alternate : accent);
    ctx.fillStyle = dark;
    ctx.font = '900 19px system-ui';
    ctx.fillText(label, px + 28, y + 44);
  });
}

function drawFinalCta(ctx, brand, reel, accent, dark, alternate = null) {
  glow(ctx, 540, 900, 520, accent, 0.20);
  ctx.fillStyle = '#f8fbff';
  ctx.font = '900 84px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(brand.name, 540, 710);
  ctx.fillStyle = alternate || accent;
  ctx.font = '800 24px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(reel.topic, 540, 760);
  ctx.fillStyle = '#b7c2d1';
  ctx.font = '600 30px system-ui';
  ctx.fillText('DAILY INTELLIGENCE · OFFICIAL DISCORD', 540, 830);
  ctx.textAlign = 'left';

  roundFill(ctx, 150, 940, 780, 128, 34, accent);
  ctx.fillStyle = dark;
  ctx.font = '900 44px system-ui';
  ctx.fillText('JOIN THE DISCORD', 250, 1019);

  ctx.strokeStyle = dark;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(810, 1004);
  ctx.lineTo(865, 1004);
  ctx.lineTo(840, 980);
  ctx.moveTo(865, 1004);
  ctx.lineTo(840, 1028);
  ctx.stroke();

  ctx.fillStyle = '#7f8da0';
  ctx.font = '600 19px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('New Reel every day', 540, 1128);
  ctx.textAlign = 'left';
}

function fillFrame(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, REEL_WIDTH, REEL_HEIGHT);
}

function drawGrid(ctx, color, stepX, stepY) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let x = 0; x <= REEL_WIDTH; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, REEL_HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= REEL_HEIGHT; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(REEL_WIDTH, y);
    ctx.stroke();
  }
}

function glow(ctx, x, y, radius, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha));
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function smallCaps(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '800 20px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(text, x, y);
}

function sceneAlpha(t, start, end, fade = 0.42) {
  if (t < start || t > end) return 0;
  const fadeIn = clamp((t - start) / fade, 0, 1);
  const fadeOut = clamp((end - t) / fade, 0, 1);
  return Math.min(fadeIn, fadeOut, 1);
}

function localProgress(t, start, end) {
  return clamp((t - start) / Math.max(0.001, end - start), 0, 1);
}

function withAlpha(ctx, alpha, draw) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  draw();
  ctx.restore();
}

function ease(value) {
  const x = clamp(value, 0, 1);
  return 1 - Math.pow(1 - x, 3);
}

function unit(seed, salt = 0) {
  let value = (Number(seed) >>> 0) ^ Math.imul((salt + 1) >>> 0, 2246822519);
  value ^= value >>> 15;
  value = Math.imul(value, 3266489917);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967295;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = clean(text).split(' ').filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);

  const visible = lines.slice(0, maxLines);
  if (lines.length > maxLines && visible.length) {
    let last = `${visible[visible.length - 1]}…`;
    while (ctx.measureText(last).width > maxWidth && last.length > 3) {
      last = `${last.slice(0, -2).trimEnd()}…`;
    }
    visible[visible.length - 1] = last;
  }

  visible.forEach((value, index) => ctx.fillText(value, x, y + index * lineHeight));
}

function roundFill(ctx, x, y, w, h, radius, fill) {
  ctx.fillStyle = fill;
  roundPath(ctx, x, y, w, h, radius);
  ctx.fill();
}

function roundStroke(ctx, x, y, w, h, radius, stroke) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.5;
  roundPath(ctx, x, y, w, h, radius);
  ctx.stroke();
}

function roundPath(ctx, x, y, w, h, radius) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, radius);
    return;
  }
  const r = Math.min(radius, w / 2, h / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hexToRgba(hex, alpha) {
  const cleanHex = String(hex || '#ffffff').replace('#', '');
  const normalized = cleanHex.length === 3
    ? cleanHex.split('').map((char) => char + char).join('')
    : cleanHex.padEnd(6, 'f').slice(0, 6);
  const value = parseInt(normalized, 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
}
