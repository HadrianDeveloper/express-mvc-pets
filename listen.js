const app = require("./app");

app.listen(8080, (err) => {
    console.log(
        err ? err : 'Listening on port 8080...'
    )
});