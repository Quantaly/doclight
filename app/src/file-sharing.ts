// remove this once navigator.canShare is included in TypeScript declarations
declare let navigator: Navigator & {
    share: (data: ShareData & {
        files?: File[];
    }) => Promise<void>;
    canShare?: (data: {
        files?: File[];
    }) => boolean;
};

export function detectFeature(): boolean {
    return (navigator.canShare && navigator.canShare({ files: [new File([], 'test.pdf', { type: 'application/pdf' })] })) || false;
}

export async function share(file: File): Promise<boolean> {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        console.log("it's definitely telling me i can do this");
        try {
            await navigator.share({
                files: [file],
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    } else {
        return false;
    }
}
