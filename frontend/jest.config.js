module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)',
    ],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./src/setupTests.js'],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};
