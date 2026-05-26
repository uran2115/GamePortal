export function generateNumber(length: number) {
    let value = "";

    for (let i = 0; i < length; i++) {
        const digit =
            i === 0
                ? Math.floor(Math.random() * 9) + 1
                : Math.floor(Math.random() * 10);

        value += digit.toString();
    }

    return value;
}