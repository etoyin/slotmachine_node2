module.exports = {
    content: [
      "./node_modules/flowbite/**/*.js",
      "./views/**/*.ejs" // Replace with your EJS view directory
    ],
    theme: {
      extend: {}
    },
    plugins: [
      require('flowbite/plugin'),
    ]
}