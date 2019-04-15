const express = require('express')
const app = express()


// get fighter data
app.get('/fighter/:fighter', (req, res, next) => {
  res.json({"fighter_name": req.params.fighter});
});

// save fighter data (edit mode), need to check authorization
app.post('/fighter/:fighter', (req, res, next) => {
  res.send("TODO")
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
