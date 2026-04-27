/**
 * Browser-side WebP encoding via Canvas (`toBlob('image/webp')`).
 * Firestore Lite / CMS uploads stay on the client; no WASM bundle is required
 * for typical browsers. If `createImageBitmap` or WebP export fails, the
 * original `File` is returned so uploads still succeed.
 *
 * WASM-backed encoders (e.g. fixed output across Safari versions) can be
 * added later behind the same exports without changing call sites.
 */

const webpEncodeSupportCache = { value: null }

/**
 * Whether this browser can rasterize to a canvas and export as WebP
 * (lossy quality parameter is honored in Chromium; others still emit WebP).
 */
const browserSupportsWebpEncode = () => {
    if (webpEncodeSupportCache.value !== null) return webpEncodeSupportCache.value
    if (typeof document === 'undefined') {
        webpEncodeSupportCache.value = false
        return false
    }
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const dataUrl = canvas.toDataURL('image/webp')
    webpEncodeSupportCache.value = dataUrl.startsWith('data:image/webp')
    return webpEncodeSupportCache.value
}

/**
 * @typedef {object} EncodeWebpOptions
 * @property {number} [quality=0.82] Lossy quality in (0, 1], passed to `toBlob` where supported.
 * @property {number} [effort=4] Encoder “effort” 0–6; canvas has no real effort knob, so this
 *   slightly scales quality (higher effort → slightly lower quality / smaller files).
 * @property {number} [maxEdge=8192] If the image exceeds this on the longest side, it is scaled down
 *   before encode to avoid canvas memory limits.
 */

const DEFAULT_ENCODE_WEBP_OPTIONS = {
    quality: 0.82,
    effort: 4,
    maxEdge: 8192,
}

const blendQualityForEffort = (quality, effort) => {
    const e = Math.min(6, Math.max(0, Number(effort) || 0))
    const factor = 1 - (e / 6) * 0.18
    return Math.min(1, Math.max(0.1, quality * factor))
}

const fileBaseName = (file) => {
    const name = file.name ?? 'image'
    const dot = name.lastIndexOf('.')
    return dot > 0 ? name.slice(0, dot) : name
}

/**
 * @param {File} file
 * @param {EncodeWebpOptions} [options]
 * @returns {Promise<File>}
 */
const encodeFileToWebp = async (file, options = {}) => {
    if (!file || !(file instanceof File)) return file
    if (!file.type.startsWith('image/')) return file

    if (!browserSupportsWebpEncode()) {
        console.warn('[saloe-webp] Canvas WebP export not supported; keeping original file.')
        return file
    }

    const {
        quality = DEFAULT_ENCODE_WEBP_OPTIONS.quality,
        effort = DEFAULT_ENCODE_WEBP_OPTIONS.effort,
        maxEdge = DEFAULT_ENCODE_WEBP_OPTIONS.maxEdge,
    } = options

    const finalQuality = blendQualityForEffort(quality, effort)

    try {
        const bitmap = await createImageBitmap(file)
        try {
            let width = bitmap.width
            let height = bitmap.height
            const longest = Math.max(width, height)
            if (longest > maxEdge) {
                const scale = maxEdge / longest
                width = Math.max(1, Math.round(width * scale))
                height = Math.max(1, Math.round(height * scale))
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                console.warn('[saloe-webp] No 2d context; keeping original file.')
                return file
            }
            ctx.drawImage(bitmap, 0, 0, width, height)

            const blob = await new Promise((resolve, reject) => {
                canvas.toBlob(
                    (b) => {
                        if (b && b.size > 0) resolve(b)
                        else reject(new Error('toBlob returned empty'))
                    },
                    'image/webp',
                    finalQuality,
                )
            })

            const outName = `${fileBaseName(file)}.webp`
            return new File([blob], outName, {
                type: 'image/webp',
                lastModified: Date.now(),
            })
        } finally {
            bitmap.close?.()
        }
    } catch (err) {
        console.warn('[saloe-webp] Encode failed, keeping original file.', err)
        return file
    }
}

/**
 * @param {File[]} files
 * @param {EncodeWebpOptions} [options]
 * @returns {Promise<File[]>}
 */
const encodeFilesToWebp = async (files, options = {}) => {
    if (!Array.isArray(files) || files.length === 0) return files ?? []
    return Promise.all(files.map((f) => encodeFileToWebp(f, options)))
}

export {
    browserSupportsWebpEncode,
    encodeFileToWebp,
    encodeFilesToWebp,
    DEFAULT_ENCODE_WEBP_OPTIONS,
}
