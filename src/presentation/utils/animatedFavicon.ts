/**
 * Animated Favicon Engine for Ambica Engineers
 * - Native continuous playback on Firefox
 * - Hardware-accelerated WebCodecs ImageDecoder frame stepper on Chromium (Chrome, Edge, Brave, Opera)
 * - Automatic pause handling when tab is inactive to preserve CPU / battery
 */
export function initAnimatedFavicon(gifUrl: string = '/favicon.gif') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Firefox plays animated GIF favicons natively without script overhead
  const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');
  if (isFirefox) return;

  // For Chrome, Edge, and other Chromium browsers, use WebCodecs ImageDecoder
  if ('ImageDecoder' in window) {
    fetch(gifUrl)
      .then((res) => (res.ok ? res.blob() : null))
      .then(async (blob) => {
        if (!blob) return;
        try {
          const ImageDecoderClass = (window as unknown as { ImageDecoder?: new (init: unknown) => { tracks?: { selectedTrack?: { frameCount?: number } }; decode: (options: { frameIndex: number }) => Promise<{ image: CanvasImageSource & { duration?: number } }> } }).ImageDecoder;
          if (!ImageDecoderClass) return;

          const decoder = new ImageDecoderClass({ data: blob.stream(), type: 'image/gif' });
          const track = decoder.tracks?.selectedTrack;
          const frameCount = track?.frameCount ?? 0;
          if (frameCount <= 1) return;

          const frames: { url: string; delay: number }[] = [];
          const canvas = document.createElement('canvas');
          canvas.width = 50;
          canvas.height = 50;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          for (let i = 0; i < frameCount; i++) {
            const frame = await decoder.decode({ frameIndex: i });
            ctx.clearRect(0, 0, 50, 50);
            ctx.drawImage(frame.image, 0, 0, 50, 50);
            const durationMicros = frame.image.duration || 40000;
            const delayMs = Math.round(durationMicros / 1000);
            frames.push({
              url: canvas.toDataURL('image/png'),
              delay: Math.max(30, delayMs),
            });
          }

          let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }

          let currentFrame = 0;
          let timer: number | null = null;

          function step() {
            if (!link || frames.length === 0) return;
            link.href = frames[currentFrame].url;
            const nextDelay = frames[currentFrame].delay;
            currentFrame = (currentFrame + 1) % frames.length;
            timer = window.setTimeout(step, nextDelay);
          }

          // Pause animation if user switches away to save CPU, resume when active
          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              if (timer) window.clearTimeout(timer);
            } else {
              step();
            }
          });

          step();
        } catch {
          // Silent fallback to standard static favicon
        }
      })
      .catch(() => {
        // Silent fallback
      });
  }
}
