//temporary hardcoded values for prices on websites

var bose = document.querySelector("body > main > div.parent.bose-productPage > div.ecommerceArea2 > div > div > form > div.bose-ecommerceArea2__ctaArea.js-ecommerceArea2-ctaArea.grid-6.grid-medium-6.grid-small-12 > div.bose-price > div:nth-child(2)")
var bestbuy = document.querySelector("#root > div > div > div.x-page-content.container_3Sp8P > div.x-product-detail-page > div.row_1Rbqw > div.col-xs-12_1GBy8.col-sm-6_9CRts.col-md-4_2WnBH.collapseColContainer_ueBNu > div.pricingContainer_25k3c > div.productPricingContainer_3gTS3 > span > span")
var bodyshop = document.querySelector("body > div.container.main > div > div.container.main > div:nth-child(1) > main > div.wrapper-product-details > section > div > div.columns.five.product-info > form > div.wrapper-qty-price > div.product-price > span:nth-child(1) > strong")
var buybuybaby = document.querySelector("#first > div:nth-child(4) > div > div.ProductDetailsLayout-inline_6DZQ2P > div.ProductDetailsLayout-inline_5T3BMO > div:nth-child(5) > div > span.PDPPrice-inline_2DaTZO")
var columbia = document.querySelector("#pdpMain > div.row.m-lg-0.heading-rating-container > div > div.product-price > span")
var columbiasales = document.querySelector("#pdpMain > div.row.m-lg-0.heading-rating-container > div > div.product-price > span.price-sales")
var garage = document.querySelector("#pdpProductDetails > div:nth-child(2) > div.pdpstyle__PdpPrice-s1btvkqz-27.iSMrkD > div > span")
var fossil = document.querySelector("#main-content > div.container.product-detail.product-wrapper > div:nth-child(1) > div.col-12 > div > div > div.prices.prices-mobile > div > span > span > span")
var thebay = document.querySelector("#maincontent > div.container.product-detail.product-wrapper > div:nth-child(3) > div.col-12.col-md-5.col-sm-6.pdp-right-section > div > div:nth-child(3) > div > div > div > span > span > span > span > span")
var chapters = document.querySelector("#item-page__item-purchase-container > div.item-purchase-container__price-and-format > div.item-price.item-purchase-container__item-price > div")
var nike = document.querySelector("#RightRail > div > div.mb2-sm > div > div.d-lg-ib.mb0-sm.u-full-width.css-kb1vqg > div.headline-5.ta-sm-r.css-1122yjz > div > div")
var walmart = document.querySelector("body > div.js-content > div > div:nth-child(4) > div > div > div.css-0.eewy8oa0 > div.css-12rl50h.eewy8oa2 > div.css-18f77yw.eewy8oa4 > div > div.css-w3hdpp.e1cd9jig0 > div > div.css-5ki3bg.e1yn5b3f5 > div > div > div.css-k008qs.e1ufqjyx0 > span > span")
var thesource = document.querySelector("#content > section > section > div.productDescription > div.pdp-details-wrap.mobile-container > div > div.pdp-sale-price.common-price")

//places hard coded values in array for easy access/ and easy additions
var brandprices = [bestbuy,document.querySelector("#priceblock_ourprice"),bose,bodyshop,buybuybaby,columbia,garage,fossil,thebay,chapters,nike,walmart,thesource]
var webimages = [2,6,3,3,1,5,21,38,6,2,3,34];

//how we access the values associated with brands
var brands = {
    "bestbuy": 0,
    "amazon": 1,
    "bose": 2,
    "thebodyshop": 3,
    "buybuybaby": 4,
    "columbiasportswear": 5,
    "garageclothing": 6,
    "fossil": 7,
    "thebay": 8,
    "chapters": 9,
    "nike": 10,
    "walmart": 11,
    "thesource": 12,
    };

 //calculate price of items   
function price(){
    var webbrand = window.location.hostname.split(".")[1].trim();
    console.log(webbrand)
    var finalprice = 0
    if (webbrand == 'amazon'){
        if (brandprices[brands[webbrand]] == null){
            finalprice = '$'+document.querySelector("#priceblock_dealprice").innerHTML.trim().split(";")[1]
        }else{
        finalprice = '$'+brandprices[brands[webbrand]].innerHTML.trim().split(";")[1]
        }


    }else if (webbrand == 'columbia' || brandprices[brands[webbrand]] == null ||brandprices[brands[webbrand]].innerHTML.trim().length > 20){
        var finalprice = 'NULL'

    }else if (webbrand == 'thesource'){
        part1 = brandprices[brands[webbrand]].innerHTML.trim().replace('<','>').split('>')[0]
        part2 = brandprices[brands[webbrand]].innerHTML.trim().replace('<','>').split('>')[2].substring(0,3)
        finalprice = part1+part2
    
        
    }else{
        finalprice = brandprices[brands[webbrand]].innerHTML.trim()
    }
    
    return finalprice

}

//obtain image of item
function image(){
    var webbrand = window.location.hostname.split(".")[1].trim();
    var images = document.getElementsByTagName('img'); 
    var srcList = [];
    
    var productImage = "no image"
    for(var i = 0; i < images.length; i++) {
        srcList.push(images[i].src);
    }
    for (var j = 0; j < srcList.length; j++){
        if (srcList[j].includes("storage.googleapis.com")){
            return srcList[j]
        }
    }
    console.log(srcList)
    if (webbrand == 'amazon' || webbrand == 'walmart' || webbrand == 'thesource'){
        return productImage
    }else{
        productImage = srcList[webimages[brands[webbrand]]]

    }
    if (brandprices[brands[webbrand]] == null){
        var productImage = "no image"
    }
    return productImage
}

//bundle all information from website and sends it to popup extention 
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
    'price': price(),
    'image': image()
});

