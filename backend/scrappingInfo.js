const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());


async function getInfoFromPage(page) {
    return await page.evaluate(() =>{
        let vuelos = document.querySelectorAll(".pIav2d")
        let mejoresVuelos = []
        for(let i = 0; i <= 4; i++){
            let el = vuelos[i];
            const thumbnailString = el.querySelector(".EbY4Pc")?.getAttribute("style");
            const startIndex = thumbnailString?.indexOf("url(");
            const endIndex = thumbnailString?.indexOf(";");
            const thumbnail = thumbnailString?.slice(startIndex + 4, endIndex - 1).replaceAll("\\", "") || "No thumbnail";
            mejoresVuelos.push({
            thumbnail,
            companyName: el.querySelector(".Ir0Voe .sSHqwe")?.textContent.trim(),
            description: el.querySelector(".mv1WYe")?.getAttribute("aria-label"),
            airportLeave: el.querySelectorAll(".Ak5kof .sSHqwe .eoY5cb")[0]?.textContent.trim(),
            airportArive: el.querySelectorAll(".Ak5kof .sSHqwe .eoY5cb")[1]?.textContent.trim(),
            price: el.querySelector(".U3gSDe .YMlIz > span")?.textContent.trim(),
            })
        }
        return mejoresVuelos;
    })
  }

module.exports = {

    async scrapeGoogleFlights(origin, destination,date) {
        const browser = await puppeteer.launch(
            {
            headless: false,
        });

        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(200000);
        // Navegar a la página de Google Flights con la búsqueda específica
        await page.goto("https://www.google.com/travel/flights?hl=es-ES&curr=EUR");
        // Esperar a que la página cargue completamente

        try {
            await page.waitForSelector('.VtwTSb');
            await page.locator('button').click();
        }catch(e){
            console.log('no google cookie consent')
        }
        await page.waitForSelector(".e5F5td");
        const inputs = await page.$$(".e5F5td");
        // colocar origen
        await inputs[0].click();
        await page.waitForTimeout(1000);
        await page.keyboard.type(origin);
        await page.keyboard.press("Enter");
        await inputs[1].click();
        await page.waitForTimeout(1000);
        await page.keyboard.type(destination);
        await page.waitForTimeout(1000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);
        //solo de ida
        await page.click(".VfPpkd-TkwUic")
        await page.waitForTimeout(1000);
        var li = await page.$$('span[jsname="K4r5Ff"]')
        li[1].click()
        await page.waitForTimeout(1000);

        // fecha de salida
        await page.click('.AotkO');
        await page.waitForTimeout(1000);
        await page.keyboard.type(date);
        await page.waitForTimeout(1000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);

        //boton buscar
        await page.click('.xFFcie > button')

        await page.waitForTimeout(2000);

        try{
            await page.click('.I0Kcef')
            await page.waitForTimeout(1000);
        }catch(e){
            console.log('no pop up de precios')
        }

        //ordenar por precio
        try{
            await page.click('button[jsname="AefGQb"]')
            await page.waitForTimeout(1000);

            li = await page.$$('.VfPpkd-StrnGf-rymPhb-ibnC6b')
            await li[1].click()
        }catch(e){
            await browser.close();
            throw new Error('no se encontraron resultados')
        }
        const flights = await getInfoFromPage(page)
        await browser.close();
        return flights;
    }    
}