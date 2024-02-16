module.exports = {
    content: ["./server/views/**/*.ejs"],
    theme: {
        container: {
            center: true,
            padding: "2rem"
        },
        debugScreens: {
            position: ["bottom", "right"]
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("tailwindcss-debug-screens")
    ]
};