const express = require('express')
const logger = require('morgan')
const path = require('path')

const server = express()
server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Serve static files from the "public" folder
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Lab 7 – Mad Lib POST route
server.post('/ITC505/lab-7/', (req, res) => {
  const { name, animal, verb, adjective, place, number } = req.body

  if (!name || !animal || !verb || !adjective || !place || !number) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Error</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 3rem; background: #fff7ed; }
          h1 { color: #c2410c; margin-bottom: 1rem; }
          a { color: #ea580c; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>⚠️ Please fill out ALL fields</h1>
        <a href="/ITC505/lab-7/">← Go Back</a>
      </body>
      </html>
    `)
    return
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Your Mad Lib!</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          min-height: 100vh;
          background: #fff7ed;
          font-family: 'Nunito', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1rem;
        }
        h1 {
          font-family: 'Boogaloo', cursive;
          font-size: 2.8rem;
          color: #c2410c;
          margin-bottom: 1.5rem;
        }
        .story-box {
          background: #fff;
          border: 3px solid #1c1917;
          border-radius: 1.2rem;
          box-shadow: 6px 6px 0 #1c1917;
          padding: 2rem 2.5rem;
          max-width: 600px;
          width: 100%;
          font-size: 1.15rem;
          line-height: 1.9;
          color: #1c1917;
        }
        strong { color: #ea580c; }
        .back-link {
          margin-top: 2rem;
          display: inline-block;
          background: #ea580c;
          color: #fff;
          font-family: 'Boogaloo', cursive;
          font-size: 1.2rem;
          padding: 0.6rem 1.4rem;
          border: 3px solid #1c1917;
          border-radius: 0.6rem;
          box-shadow: 4px 4px 0 #1c1917;
          text-decoration: none;
        }
        .back-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1c1917;
        }
        footer { margin-top: 2.5rem; color: #a8a29e; font-size: 0.82rem; }
      </style>
    </head>
    <body>
      <h1>Your Mad Lib!</h1>
      <div class="story-box">
        <p>
          Once upon a time, a brave adventurer named <strong>${name}</strong> decided to travel to
          <strong>${place}</strong> with their trusty pet <strong>${adjective} ${animal}</strong>.
          After <strong>${number}</strong> exhausting days of <strong>${verb}</strong> through the wilderness,
          they finally arrived — only to discover the whole place was run by <strong>${animal}s</strong>!
          <strong>${name}</strong> gulped and said, "I've been <strong>${verb}</strong> for
          <strong>${number}</strong> years and I have <em>never</em> seen anything so
          <strong>${adjective}</strong>!" The crowd at <strong>${place}</strong> roared with applause.
        </p>
      </div>
      <a class="back-link" href="/ITC505/lab-7/">← Try Again</a>
      <footer>
        <p>Last updated: <span id="lastModified"></span></p>
      </footer>
      <script>
        document.getElementById('lastModified').textContent = document.lastModified;
      </script>
    </body>
    </html>
  `)
})

// Start server
const port = process.env.PORT || 8080
server.listen(port, () => console.log(`Running on port ${port}`))
