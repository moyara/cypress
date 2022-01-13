const systemTests = require('../lib/system-tests').default

// TODO: hide UI in run mode
const tempSkip = Date.now() > new Date('2022-01-20') ? systemTests.it : systemTests.it.skip

const onServer = (app) => {
  return app.get('/fullPage', systemTests.sendHtml(`\
<style>body { margin: 0; }</style>
<div class="black-me-out" style="position: absolute; left: 10px; top: 10px; width: 10px; height: 10px;"></div>
<div class="black-me-out" style="position: absolute; left: 30px; top: 10px; width: 10px; height: 10px;"></div>
<div style="background: white; height: 200px;"></div>
<div style="background: black; height: 200px;"></div>
<div style="background: white; height: 100px;"></div>\
`))
}

describe('e2e screenshot fullPage capture', () => {
  systemTests.setup({
    servers: {
      port: 3322,
      onServer,
    },
  })

  // this tests that consistent screenshots are taken for fullPage captures,
  // that the runner UI is hidden and that the page is scrolled properly
  tempSkip('passes', {
    spec: 'screenshot_fullpage_capture.cy.js',
    snapshot: true,
  })
})
