const puppeteer = require('puppeteer');
const {KnownDevices} = require('puppeteer')
const {getCount,getText} = require('../lib/helpers');
describe('Emulando dispositivos', () => {
    let browser;
    let page
    beforeAll(async() => {
        browser = await puppeteer.launch({ headless: false, defaultViewport: null })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('https://platzi.com',{waitUntil: 'networkidle2'})
        jest.setTimeout(80000);
    },80000);
    it('Emulando dispositivos de forma manual y obteniendo el texto', async () => {
        await page.emulate({
            viewport:{
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false
            },
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        })
        const texto =await getText(page,'#cms-landings > section > section.Hero.Bg-animation > div > h1')
        console.log('Texto: ',texto);
        await new Promise(r => setTimeout(r, 3000))
	});
    it('Emulando un sitio de escritorio y obtener el numero de imagenes', async () => {
        await page.setViewport({
            width: 375,
            height: 667,
        })
        const numeroImages = await getCount(page,'img')
        console.log('El numero de imagenes que hay son: ', numeroImages);
        await new Promise(r => setTimeout(r, 3000))

	});
    it('Emular el sitio de un iphone', async () => {
        const iPhone = KnownDevices['iPhone 6'];
        await page.emulate(iPhone);
        await page.goto('https://www.google.com');
    })
    afterAll(async () => {
        await browser.close()
    });
});