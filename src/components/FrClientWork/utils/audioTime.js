export const audioTime = (t) => {
    const m = Math.trunc(t / 60) + ''
    const s = (t % 60) + ''
    return m.padStart(2, 0) + ':' + s.padStart(2, 0)
}