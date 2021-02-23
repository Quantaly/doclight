export function detectImageCapture(): boolean {
    // if debugging, always show the mobile interface
    if (process.env.NODE_ENV === 'development') {
        return true;
    }
    const dummy = document.createElement('input');
    dummy.type = 'file';
    dummy.accept = 'image/jpeg';
    return 'capture' in dummy;
}

export function detectWebShare(): boolean {
    return !!navigator.share;
}
