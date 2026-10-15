/* AI-prepared records enter through a URL fragment, never a query string. */
(function (root) {
    function validateRecord(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== 1) throw new Error('지원하지 않는 일정 형식입니다.');
        const text = (key, max) => {
            const value = input[key] == null ? '' : input[key];
            if (typeof value !== 'string' || value.length > max) throw new Error('일정 내용이 너무 길거나 형식이 잘못되었습니다.');
            return value;
        };
        const date = text('date', 10), time = text('time', 5);
        const parsed = new Date(date + 'T12:00:00Z');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error('날짜를 확인해주세요.');
        if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('시간을 확인해주세요.');
        const people = input.people == null ? 0 : input.people;
        if (!Number.isInteger(people) || people < 0 || people > 999) throw new Error('인원을 확인해주세요.');
        return { id: null, date, time, people, departure: text('departure', 200), arrival: text('arrival', 200), note: text('note', 5000), supplier: '', amount: '', color: '' };
    }
    root.LogritAIImport = { validateRecord };
    if (typeof module !== 'undefined') module.exports = { validateRecord };
})(typeof window !== 'undefined' ? window : globalThis);
