import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import os from 'os';

export async function downloadYoutubeAudio(url: string): Promise<string> {
    const videoId = ytdl.getVideoID(url);
    const outputPath = join(os.tmpdir(), `\${videoId}.mp3`);

    return new Promise((resolve, reject) => {
        const stream = ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly',
        });

        ffmpeg(stream)
            .audioBitrate(128)
            .toFormat('mp3')
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                reject(err);
            })
            .on('end', () => {
                resolve(outputPath);
            })
            .save(outputPath);
    });
}

export function getBase64Audio(path: string): string {
    const buffer = readFileSync(path);
    return buffer.toString('base64');
}

export function cleanupFile(path: string) {
    try {
        unlinkSync(path);
    } catch (e) {
        console.error('Failed to cleanup file:', path, e);
    }
}

export async function getVideoTitle(url: string): Promise<string> {
    try {
        const info = await ytdl.getBasicInfo(url);
        return info.videoDetails.title;
    } catch (e) {
        console.error('Failed to get video title:', e);
        return 'Untitled Lecture';
    }
}

export function isValidYoutubeUrl(url: string): boolean {
    return ytdl.validateURL(url);
}
