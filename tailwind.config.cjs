module.exports = {
    content: ["./server/views/**/*.ejs", "./client/bundle/*.js"],
    theme: {
        container: {
            center: true,
            padding: "2rem"
        },
        debugScreens: {
            position: ["bottom", "right"]
        }
    },
    safelist: [
        {
            pattern: /col-start-[^/]+$/,
            variants: [
                "sm",
                "md",
                "xl",
                "lg"
            ]
        }
    ],
    plugins: [
        require("@tailwindcss/forms"),
        require("tailwindcss-debug-screens")
    ]
};