const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // Provider temporary for testing
    let index = 0;

    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.tracing.start({
     path: 'trace.json',
     categories: ['devtools.timeline']
    })
    await page.goto('https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+s%E1%BB%AFa+Kha+Ng%C3%A2n/@13.8809715,109.1064883,16.42z/data=!4m5!3m4!1s0x316f3f7c8c7d9fb9:0xb7d8c6d1a69a94b6!8m2!3d13.8836537!4d109.1094631')

    await page.setRequestInterception(true);

    page.on('request', async request => {
        if (request.resourceType() === 'xhr' && request.url().startsWith("https://www.google.com/maps/preview/place?authuser=0")) {
            // console.log(request);
        }
        request.continue();
    });
    

    page.on('response', async response => {
        if ('xhr' === response.request().resourceType() && response.request().url().startsWith("https://www.google.com/maps/preview/place?authuser=0")){
            const textResp = await response.text();
            const results = await fs.writeFile(__dirname + `google-${index}.json`, textResp, {
                encoding: 'utf-8'
            }, (err) => {
                if (!err) index++;
            });
        }
    })
})()