import  puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'


const getwebContnet = async()=>{

// Launch the browser and open a new blank page
console.log("Launch the browser and open a new blank page")
const browser = await puppeteer.launch();
const page = await browser.newPage();

console.log("Navigate the page to a URL - will take couple of minutes")
// Navigate the page to a URL
await page.goto('https://130point.com/cards', {waitUntil: 'load', timeout: 0});
// await page.goto('https://developer.chrome.com/');

// Set screen size
// await page.setViewport({width: 1080, height: 1024});
console.log("Type into search box")
// Type into search box
await page.type('#searchBar', 'pokemon');
await page.click('#submit_ebay');

console.log("Wait for the results")
// Wait for the results
await page.waitForSelector('#salesDataTable-1');

const content  = await page.content()
return content;

}

const getResults = async ()=>{
    console.log("Starting ...")
const webContnet = await getwebContnet();
const $  = cheerio.load(webContnet)
//Get results
const table = $('#salesDataTable-1').html();
const tr = $('#dRow',table).text()
const trl = $('#dRow',table).length
console.log(tr)
console.log("Total count:",trl)
console.log("Done...")


}

getResults();
