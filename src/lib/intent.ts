class Intent {
    name: string;
    data: string;
    constructor(_name: string, _data: string = '') {
        this.name = _name;
        this.data = _data;
    }
}

const matchAny = (text: string, array: Array<RegExp>) => {
    return array.some((el) => {
        return el.test(text);
    });
};

export let intentMatch = (text: string) => {
    if (matchAny(text, [/^hi.*/i, /^hello.*/i, /^[你|妳|您]好.*/i, /^哈囉/])) {
        return new Intent('greeting');
    }
    if (matchAny(text, [/^好棒.*$/i, /^你好棒.*$/i, /^thank.*$/i, /^謝謝.*$/i, /^感謝.*$/i, /^沒關係.*/i])) {
        return new Intent('thanks');
    }
    if (matchAny(text, [/^XD.*$/i, /^OK.*$/i, /^[:|：][)|）]$/, /^\^[\s|_]*\^$/, /^哈+$/, /^haha$/i])) {
        return new Intent('smile');
    }
    if (matchAny(text, [/^ADD\s*(.+)$/i, /^[+＋]\s*(.+)$/])) {
        return new Intent('add_symbols');
    }
    if (matchAny(text, [/^DEL\s*(.+)$/i, /^[-－]\s*(.+)$/])) {
        return new Intent('del_symbols');
    }
    if (matchAny(text, [/^CLEAR$/i])) {
        return new Intent('remove_watchlist');
    }
    if (matchAny(text, [/新增自選/, /加入自選/, /加到自選/, /新增追蹤/, /加入追蹤/, /加到追蹤/, /刪除自選/, /自選刪除/, /刪除追蹤/, /追蹤刪除/])) {
        return new Intent('help', 'HELP_WATCHLIST');
    }
    if (matchAny(text, [/^LIST$/i, /^WATCHLIST$/i, /自選/, /自選追蹤/, /追蹤/])) {
        return new Intent('show_watchlist');
    }
    if (matchAny(text, [/^FUGLE$/i, /^連結$/, /^同步$/, /^綁定$/])) {
        return new Intent('linking_status');
    }
    if (matchAny(text, [/^#$/])) {
        return new Intent('suggest');
    }
    if (matchAny(text, [/^HELP\s*(.*)/i, /^怎麼.*/, /^[?？]\s*(.*)/i])) {
        return new Intent('help');
    }
    return new Intent('symbol_query');
};

export let quickReplyMatch = (text: string) => {
    if (matchAny(text, [/^HELP_/])) {
        return new Intent('help');
    }
    return new Intent('unknown');
};
