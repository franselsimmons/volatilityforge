//file: components/DailyReelCard.js

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;
const PREVIEW_WIDTH = 720;
const PREVIEW_HEIGHT = 1280;
const PREVIEW_FPS = 30;
const EXPORT_FPS = 30;
const EXPORT_VIDEO_BITRATE = 16_000_000;
const EXPORT_AUDIO_BITRATE = 192_000;

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
            <span className="reel-chip">30 FPS · HQ</span>
            <span className="reel-chip">Sound ON</span>
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
                De Reel wordt lokaal in 1080×1920, 30 FPS en met eigen sound design opgebouwd. Houd dit scherm ongeveer {reel.durationSeconds} seconden open.
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
  const master = context.createGain();
  master.gain.value = 0.78;
  master.connect(destination);

  const buffer = buildReelAudioBuffer(context, brand, reel, durationSeconds);
  const source = context.createBufferSource();
  source.buffer = buffer;

  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 9000;
  filter.Q.value = 0.25;

  source.connect(filter);
  filter.connect(master);

  const track = destination.stream.getAudioTracks()[0];
  let started = false;

  return {
    track,
    start() {
      if (started) return;
      started = true;
      source.start(context.currentTime + 0.035);
    },
    async cleanup() {
      try { source.stop(); } catch {}
      try { track?.stop(); } catch {}
      try { await context.close(); } catch {}
    }
  };
}

function buildReelAudioBuffer(context, brand, reel, durationSeconds) {
  const sampleRate = context.sampleRate || 48000;
  const frameCount = Math.ceil(durationSeconds * sampleRate);
  const buffer = context.createBuffer(2, frameCount, sampleRate);

  const audioProfile = getBrandAudioProfile(brand?.visualMode);
  const beatSeconds = 60 / audioProfile.bpm;
  const transitionTimes = [0.15, 2.2, 6.25, 9.2];
  const seed = Number(reel.seed) >>> 0;

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    const stereoPhase = channel === 0 ? 0 : Math.PI * 0.44;

    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const fadeIn = clamp(t / 0.35, 0, 1);
      const fadeOut = clamp((durationSeconds - t) / 0.55, 0, 1);
      const envelope = Math.min(fadeIn, fadeOut);

      // Soft electronic bed.
      const pad =
        Math.sin(Math.PI * 2 * audioProfile.root * t + stereoPhase) * 0.040 +
        Math.sin(Math.PI * 2 * audioProfile.root * 1.5 * t + stereoPhase * 0.6) * 0.020 +
        Math.sin(Math.PI * 2 * audioProfile.root * 2 * t + stereoPhase * 0.25) * 0.013;

      // Light pulse gives the Reel rhythm without turning it into copyrighted music.
      const beatPhase = (t % beatSeconds) / beatSeconds;
      const pulseEnv = Math.exp(-beatPhase * 10.0);
      const pulse =
        Math.sin(Math.PI * 2 * audioProfile.pulse * t) *
        pulseEnv *
        0.032;

      // Small deterministic shimmer so every day's sound is subtly different.
      const noiseIndex = Math.floor(t * 180);
      const shimmerNoise = (unit(seed, 900 + noiseIndex + channel * 17) - 0.5) * 2;
      const shimmer =
        shimmerNoise *
        Math.sin(Math.PI * 2 * audioProfile.shimmer * t + stereoPhase) *
        0.006;

      // Scene transition whooshes / impacts.
      let transitions = 0;
      for (let k = 0; k < transitionTimes.length; k++) {
        const dt = t - transitionTimes[k];
        if (dt >= 0 && dt < 0.34) {
          const e = Math.exp(-dt * 12);
          const sweep = audioProfile.transition + k * 34;
          transitions += Math.sin(Math.PI * 2 * sweep * dt + stereoPhase) * e * 0.040;
        }
      }

      const sample = (pad + pulse + shimmer + transitions) * envelope;
      data[i] = Math.max(-0.22, Math.min(0.22, sample));
    }
  }

  return buffer;
}

function getBrandAudioProfile(mode) {
  const map = {
    kryvant: { root: 110.0, pulse: 220.0, shimmer: 1760, transition: 155, bpm: 92 },
    lumeriq: { root: 146.83, pulse: 293.66, shimmer: 2349, transition: 205, bpm: 98 },
    rangenest: { root: 98.0, pulse: 196.0, shimmer: 1568, transition: 138, bpm: 86 },
    ninetyvale: { root: 130.81, pulse: 261.63, shimmer: 2093, transition: 184, bpm: 104 },
    arcynth: { root: 164.81, pulse: 329.63, shimmer: 2637, transition: 232, bpm: 94 }
  };
  return map[mode] || map.arcynth;
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

  withAlpha(ctx, sceneAlpha(t, 0, 2.8), () => {
    drawHeroText(ctx, reel.hook, 78, 380, 920, brand.color);
    smallCaps(ctx, 'READ BELOW THE CANDLE', 80, 730, brand.color);
  });

  const flowAlpha = sceneAlpha(t, 2.2, 7.0);
  withAlpha(ctx, flowAlpha, () => {
    const p = ease(localProgress(t, 2.2, 6.7));
    drawKryvantFlow(ctx, brand, reel.seed, p);
    drawBodyText(ctx, reel.insight, 80, 1310, 920, '#aab8ca');
  });

  withAlpha(ctx, sceneAlpha(t, 6.2, 9.8), () => {
    drawPills(ctx, ['FLOW', 'LIQUIDITY', 'RESPONSE'], 80, 1290, brand.color, '#07111c');
    drawPayoff(ctx, reel.payoff, 80, 1490, 920, '#f4f8ff');
  });

  withAlpha(ctx, sceneAlpha(t, 9.2, 12.01, 0.5), () => drawFinalCta(ctx, brand, reel, brand.color, '#06101a'));
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

  withAlpha(ctx, sceneAlpha(t, 0, 2.8), () => {
    drawHeroText(ctx, reel.hook, 78, 390, 920, brand.color);
    smallCaps(ctx, 'ADAPTIVE STRATEGY SELECTION', 80, 760, '#c084fc');
  });

  withAlpha(ctx, sceneAlpha(t, 2.1, 7.1), () => {
    const p = ease(localProgress(t, 2.1, 6.8));
    drawLumeriqNodes(ctx, brand, reel.seed, p);
    drawBodyText(ctx, reel.insight, 80, 1365, 900, '#cdbde0');
  });

  withAlpha(ctx, sceneAlpha(t, 6.3, 9.8), () => {
    drawPills(ctx, ['REGIME', 'SETUP', 'SELECT'], 80, 1310, brand.color, '#160923');
    drawPayoff(ctx, reel.payoff, 80, 1510, 900, '#fff8ff');
  });

  withAlpha(ctx, sceneAlpha(t, 9.2, 12.01, 0.5), () => drawFinalCta(ctx, brand, reel, brand.color, '#160923'));
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

  withAlpha(ctx, sceneAlpha(t, 0, 2.8), () => {
    drawHeroText(ctx, reel.hook, 78, 390, 920, brand.color);
    smallCaps(ctx, 'WEEKLY CONFIGURATION INTELLIGENCE', 80, 760, brand.color);
  });

  withAlpha(ctx, sceneAlpha(t, 2.0, 7.2), () => {
    const p = ease(localProgress(t, 2.0, 6.9));
    drawRangeEngine(ctx, brand, reel.seed, p);
    drawBodyText(ctx, reel.insight, 80, 1380, 900, '#accabd');
  });

  withAlpha(ctx, sceneAlpha(t, 6.3, 9.8), () => {
    drawPills(ctx, ['RANGE', 'VOLATILITY', 'STRUCTURE'], 80, 1320, brand.color, '#071812');
    drawPayoff(ctx, reel.payoff, 80, 1515, 900, '#f3fff8');
  });

  withAlpha(ctx, sceneAlpha(t, 9.2, 12.01, 0.5), () => drawFinalCta(ctx, brand, reel, brand.color, '#071812'));
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

  withAlpha(ctx, sceneAlpha(t, 0, 2.8), () => {
    drawHeroText(ctx, reel.hook, 78, 390, 920, '#4f8cff');
    smallCaps(ctx, 'FOOTBALL VALUE INTELLIGENCE', 80, 760, '#d7aa62');
  });

  withAlpha(ctx, sceneAlpha(t, 2.0, 7.2), () => {
    const p = ease(localProgress(t, 2.0, 6.9));
    drawNinetyValeModel(ctx, reel.seed, p);
    drawBodyText(ctx, reel.insight, 80, 1390, 900, '#b9c3d2');
  });

  withAlpha(ctx, sceneAlpha(t, 6.3, 9.8), () => {
    drawPills(ctx, ['MODEL', 'MARKET', 'VALUE'], 80, 1320, '#4f8cff', '#07101e', '#d7aa62');
    drawPayoff(ctx, reel.payoff, 80, 1515, 900, '#fffaf2');
  });

  withAlpha(ctx, sceneAlpha(t, 9.2, 12.01, 0.5), () => drawFinalCta(ctx, brand, reel, '#4f8cff', '#07101e', '#d7aa62'));
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

  withAlpha(ctx, sceneAlpha(t, 0, 2.8), () => {
    drawHeroText(ctx, reel.hook, 78, 390, 920, brand.color);
    smallCaps(ctx, 'MULTI-HORIZON FORECAST INTELLIGENCE', 80, 760, brand.color);
  });

  withAlpha(ctx, sceneAlpha(t, 2.0, 7.2), () => {
    const p = ease(localProgress(t, 2.0, 6.9));
    drawForecastRoutes(ctx, brand, reel.seed, p);
    drawBodyText(ctx, reel.insight, 80, 1400, 900, '#aac5cb');
  });

  withAlpha(ctx, sceneAlpha(t, 6.3, 9.8), () => {
    drawPills(ctx, ['24H', '7D', '30D'], 80, 1320, brand.color, '#071921');
    drawPayoff(ctx, reel.payoff, 80, 1515, 900, '#f2fdff');
  });

  withAlpha(ctx, sceneAlpha(t, 9.2, 12.01, 0.5), () => drawFinalCta(ctx, brand, reel, brand.color, '#071921'));
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
