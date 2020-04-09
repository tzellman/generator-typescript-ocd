module.exports = {
    '*': (files) => {
        return [
            ...files.map((filename) => `prettier --config ./.prettierrc --write '${filename}'`),
            ...files.map((filename) => `git add '${filename}'`)
        ];
    }
};
