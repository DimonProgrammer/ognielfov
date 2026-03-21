import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HTML_FILE = resolve(__dirname, '../../Downloads/ai_studio_code (2).html');
const FRAMES_DIR = resolve(__dirname, 'frames');
const OUTPUT_GIF = resolve(__dirname, 'chart_animation.gif');
const OUTPUT_MP4 = resolve(__dirname, 'chart_animation.mp4');

const FPS = 30;
const DURATION_SEC = 4; // capture 4 seconds to get full animation + pause
const TOTAL_FRAMES = FPS * DURATION_SEC;
const FRAME_INTERVAL = 1000 / FPS;

async function main() {
    // Clean up and create frames directory
    if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
    mkdirSync(FRAMES_DIR, { recursive: true });

    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 800, height: 500 },
        deviceScaleFactor: 2  // retina quality
    });

    console.log(`Opening ${HTML_FILE}...`);
    await page.goto(`file://${HTML_FILE}`);

    // Wait for fonts to load
    await page.waitForTimeout(200);

    console.log(`Capturing ${TOTAL_FRAMES} frames at ${FPS}fps...`);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const frameNum = String(i).padStart(4, '0');
        await page.screenshot({
            path: `${FRAMES_DIR}/frame_${frameNum}.png`,
            clip: { x: 0, y: 50, width: 800, height: 400 }
        });

        if (i < TOTAL_FRAMES - 1) {
            await page.waitForTimeout(FRAME_INTERVAL);
        }

        if (i % 30 === 0) {
            console.log(`  Frame ${i}/${TOTAL_FRAMES}`);
        }
    }

    await browser.close();
    console.log('Browser closed. Encoding...');

    // Create GIF with ffmpeg (high quality palette-based)
    try {
        // Step 1: Generate palette
        execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%04d.png" -vf "fps=${FPS},scale=800:-1:flags=lanczos,palettegen=max_colors=128:stats_mode=diff" "${FRAMES_DIR}/palette.png"`, { stdio: 'inherit' });

        // Step 2: Use palette to create GIF
        execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%04d.png" -i "${FRAMES_DIR}/palette.png" -lavfi "fps=${FPS},scale=800:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=sierra2_4a" "${OUTPUT_GIF}"`, { stdio: 'inherit' });
        console.log(`GIF saved: ${OUTPUT_GIF}`);
    } catch (e) {
        console.error('GIF encoding failed:', e.message);
    }

    // Create MP4 with ffmpeg
    try {
        execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow "${OUTPUT_MP4}"`, { stdio: 'inherit' });
        console.log(`MP4 saved: ${OUTPUT_MP4}`);
    } catch (e) {
        console.error('MP4 encoding failed:', e.message);
    }

    // Clean up frames
    rmSync(FRAMES_DIR, { recursive: true });
    console.log('Done! Frames cleaned up.');
}

main().catch(console.error);
