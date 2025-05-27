// YouTube utility functions for blog posts

export interface YouTubeThumbnailOptions {
    quality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres';
    fallback?: string;
}

/**
 * Generate YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(
    videoId: string, 
    options: YouTubeThumbnailOptions = {}
): string {
    const { quality = 'high', fallback } = options;
    
    if (!videoId) {
        return fallback || '';
    }
    
    // YouTube thumbnail URL format
    const qualityMap = {
        'default': 'default',
        'medium': 'mqdefault', 
        'high': 'hqdefault',
        'standard': 'sddefault',
        'maxres': 'maxresdefault'
    };
    
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
        /youtube\.com\/user\/[^\/]+#p\/[a-z]\/[0-9]+\/([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

/**
 * Get multiple thumbnail sizes for a video
 */
export function getYouTubeThumbnails(videoId: string) {
    if (!videoId) return {};
    
    return {
        default: getYouTubeThumbnail(videoId, { quality: 'default' }),
        medium: getYouTubeThumbnail(videoId, { quality: 'medium' }),
        high: getYouTubeThumbnail(videoId, { quality: 'high' }),
        standard: getYouTubeThumbnail(videoId, { quality: 'standard' }),
        maxres: getYouTubeThumbnail(videoId, { quality: 'maxres' })
    };
}

/**
 * Check if a YouTube thumbnail exists (client-side only)
 */
export async function checkThumbnailExists(thumbnailUrl: string): Promise<boolean> {
    try {
        const response = await fetch(thumbnailUrl, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Get the best available thumbnail quality
 * Tries maxres first, falls back to lower qualities if not available
 */
export async function getBestThumbnail(videoId: string): Promise<string> {
    const qualities: Array<YouTubeThumbnailOptions['quality']> = ['maxres', 'high', 'standard', 'medium', 'default'];
    
    for (const quality of qualities) {
        const thumbnailUrl = getYouTubeThumbnail(videoId, { quality });
        const exists = await checkThumbnailExists(thumbnailUrl);
        if (exists) {
            return thumbnailUrl;
        }
    }
    
    // Fallback to default if nothing else works
    return getYouTubeThumbnail(videoId, { quality: 'default' });
} 