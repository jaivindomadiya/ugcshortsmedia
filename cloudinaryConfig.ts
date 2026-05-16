// Public Cloudinary config used by the frontend.
// NEVER put the API secret (or the full CLOUDINARY_URL) here — that is server-only.
export const CLOUDINARY_CONFIG = {
    cloudName: 'dgahlea2q',
};

// Cloudinary video player configuration
export const VIDEO_PLAYER_CONFIG = {
    cloud_name: 'dgahlea2q',
    secure: true,
    controls: true,
    autoplay: false,
    muted: true,
    loop: true,
    fluid: true,
};

// Category tags applied to videos in Cloudinary.
// Convention: each Cloudinary folder has matching videos tagged with the
// folder name (lowercase). To add a new category in the future, just add
// one more line below — no other code change is needed.
//
// `label` = pill text shown to users.
// `tag`   = the exact Cloudinary tag (must match what's on the assets).
export const VIDEO_CATEGORIES: { label: string; tag: string }[] = [
    { label: 'Beauty',    tag: 'beauty' },
    { label: 'Food',      tag: 'food' },
    { label: 'Hospital',  tag: 'hospital' },
    { label: 'Interior',  tag: 'interior' },
    { label: 'Jewellery', tag: 'jewellery' },
    { label: 'UGC',       tag: 'ugc' },
    { label: 'Vehicle',   tag: 'vehicle' },
];

// Public list endpoint — requires "Resource list" delivery type to be enabled
// in Cloudinary → Settings → Security.
export const cloudinaryListUrl = (tag: string) =>
    `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/list/${tag}.json`;

// Build a delivery URL for a video resource returned by the list API.
export const cloudinaryVideoUrl = (publicId: string, version: number, format: string) =>
    `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/v${version}/${publicId}.${format}`;

