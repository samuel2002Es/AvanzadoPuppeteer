module.exports = {
    click: async function(page,selector,opts={}){
        try {
            await page.waitForSelector(selector)
            await page.click(selector,opts)
        } catch (error) {
            throw new Error(`Error al dar click en el selector: ${selector}`)
        }
    },
    doubleClick: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector, {clickCount: 2})
        } catch (error) {
            throw new Error(`Error al dar click en el selector: ${selector}`)
        }
    },
    getText: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector,(element) => element.textContent)
        } catch (error) {
            throw new Error(`Error al obtener el texto en el selector ${selector}`)
        }
    },
    type: async function(page,selector,text,opts={}){
        try {
            await page.waitForSelector(selector)
            await page.type(selector,text,opts)
        } catch (error) {
            throw new Error(`Error al escribir texto en el selector ${selector}`)
        }
    },
    getCount: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector,(element) => element.length)
        } catch (error) {
            throw new Error(`Error al escribir texto en el selector ${selector}`)
        }
    }
    
}