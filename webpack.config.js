
module.exports = {
    resolve: {
        preferRelative: true,
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "assert": require.resolve("assert/"),
            "zlib": require.resolve("browserify-zlib"),
            "stream": require.resolve("stream-browserify")
        },
    }
}