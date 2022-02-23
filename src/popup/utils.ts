export const getTitle = () => {
    return document.querySelector('.text-normal')?.textContent;
};

export const getIntro = () => {
    return document.querySelector('.bg-secondary')?.textContent;
};

interface Chapter {
    title: string;
    url?: string;
}

export const getChapterList = () => {
    const chapterListNode = document.querySelector('#chapterList');
    const childNodes = chapterListNode?.children;
    if (childNodes) {
        const chapters: Chapter[] = Array.from(childNodes).map((node) => {
            if (node.tagName.toLowerCase() === 'a') {
                return {
                    title: '',
                    url: (node as HTMLAnchorElement).href,
                };
            }

            if (node.tagName.toLowerCase() === 'p') {
                const text = node.querySelector('span')?.textContent;
                return {
                    title: text || '',
                    url: '',
                };
            }

            return {
                title: '',
            };
        });

        console.log(chapters);
        return chapters;
    }
    return [];
};
