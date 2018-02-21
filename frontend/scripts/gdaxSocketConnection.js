let ethPrice
let bitPrice = 0
let litePrice = 0

let ethHoldings = 0
let bitHoldings  = 0
let liteHoldings = 0

let ethMarket  = 0
let bitMarket  = 0
let liteMarket  = 0

let ethPL = 0
let bitPL = 0
let litePL = 0

let ethInvested  = 0
let bitInvested = 0
let liteInvested = 0

let firstName

let allCoinMarket = 0
let netPL = 0

let timeArr = []

const ethPriceArr = []
const bitPriceArr = []
const litePriceArr =[]

const netPLArr = []

let initialized = false

let view = 'newTrans'

let liveData
let time

let params = {
  type: "subscribe",
  channels: ['ticker'],
  product_ids: ['BTC-USD', 'ETH-USD', 'LTC-USD']
}
const socket = new WebSocket('wss://ws-feed.gdax.com')
socket.onopen = function(event) {
  socket.send(JSON.stringify(params))
}

socket.onmessage = function(event) {
  let data = JSON.parse(event.data) //changing to obj to work with
  let userID = Number(sessionStorage.getItem('userID'))
  time = data.time
  if (userID && view != 'newTrans') {
      getCoins().then(() => {
      if (data.product_id == 'ETH-USD') {
          ethPrice = data.price
          ethMarket = ethPrice * ethHoldings
          ethPL = ethMarket - ethInvested 
      } else if (data.product_id == 'BTC-USD') {
          bitPrice = data.price
          bitMarket = bitPrice * bitHoldings
          bitPL = bitMarket - bitInvested 
      } else if (data.product_id == 'LTC-USD') {
          litePrice = data.price
          liteMarket = litePrice * liteHoldings
          litePL = liteMarket - liteInvested 
      }
      allCoinMarket = ethMarket + bitMarket + liteMarket || 'Loading..'
      netPL = allCoinMarket - (ethInvested + bitInvested + liteInvested)
      if (view == 'summary') {
        summaryDOM()
          netPLPriceGraph()
      } else if (view == 'bitcoin') {
          bitcoinDOM()
          btcPriceGraph()
      } else if (view == 'litecoin') {
          litecoinDOM()
          ltcPriceGraph()
      } else if (view == 'ethereum') {
          ethereumDOM()
          ethPriceGraph()
      }  
    })
  }
}

function ethPriceGraph() {
    ethPriceArr.push(ethPrice)
    timeArr.push(moment(time).format('h:mm a'))
    
    updateLineChart(timeArr, ethPriceArr)
    ethPriceArr.forEach(ele => {
        if (typeof ele == 'undefined') {
            const index = ethPriceArr.indexOf(ele)
            ethPriceArr = ethPriceArr.splice(index, 1)
            return ethPriceArr
        }
    })
    console.log(timeArr)
    console.log(ethPriceArr)
}

function btcPriceGraph() {
    bitPriceArr.push(bitPrice)
    timeArr.push(moment(time).format('h:mm a'))
    
    updateLineChart(timeArr, bitPriceArr)
    bitPriceArr.forEach(ele => {
        if (typeof ele == 'undefined') {
            const index = bitPriceArr.indexOf(ele)
            ethPriceArr = bitPriceArr.splice(index, 1)
            return btcPriceArr
        }
    })
    console.log(timeArr)
    console.log(bitPriceArr)
}

function ltcPriceGraph() {
    litePriceArr.push(litePrice)
    timeArr.push(moment(time).format('h:mm a'))
    
    updateLineChart(timeArr, litePriceArr)
    litePriceArr.forEach(ele => {
        if (typeof ele == 'undefined') {
            const index = litePriceArr.indexOf(ele)
            ethPriceArr = litePriceArr.splice(index, 1)
            return litePriceArr
        }
    })
    console.log(timeArr)
    console.log(litePriceArr)
}

function netPLPriceGraph() {
    netPLArr.push(netPL)
    timeArr.push(moment(time).format('h:mm a'))
    
    updateLineChart(timeArr, netPLArr)
    netPLArr.forEach(ele => {
        if (typeof ele == 'undefined') {
            const index = netPLArr.indexOf(ele)
            ethPriceArr = netPLArr.splice(index, 1)
            return netPLArr
        }
    })
    console.log(timeArr)
    console.log(netPL)
}