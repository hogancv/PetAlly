export default function getDate(adjustment = null) {
    const now = new Date();

    if (Array.isArray(adjustment) && adjustment.length === 2) {
        const [unit, value] = adjustment;
        switch (unit) {
            case 'year':
                now.setFullYear(now.getFullYear() + value);
                break;
            case 'month':
                now.setMonth(now.getMonth() + value);
                break;
            case 'day':
                now.setDate(now.getDate() + value);
                break;
            case 'hour':
                now.setHours(now.getHours() + value);
                break;
            case 'minute':
                now.setMinutes(now.getMinutes() + value);
                break;
            case 'second':
                now.setSeconds(now.getSeconds() + value);
                break;
            default:
                throw new Error('Invalid time unit');
        }
    }

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    if (adjustment && adjustment[0] === 'hour') {
        return hour;
    }

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}