const signup = document.querySelector('#signup')
let loginButton = document.querySelector('#formLogin')
const main = document.querySelector('main')
let userID = Number(sessionStorage.getItem('userID'))

//let eachTransaction

function getCoins() {
    return axios.get(`http://localhost:3000/summary/user/${userID}`)
    .then(data => {
        ethHoldings = data.data.Ethereum
        bitHoldings = data.data.Bitcoin
        liteHoldings = data.data.Litecoin
        
        ethInvested = data.data.NetInvestedinEthereum
        bitInvested = data.data.NetInvestedinBitcoin
        liteInvested = data.data.NetInvestedinLitecoin
    })
    .catch(err => {
        console.log(err)
    })
}

loginButton.addEventListener('submit', (e) => { //just get user id and to see if it matches
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    axios.post('http://localhost:3000/login', {email, password})
    .then (data => {
        if (data.data.matches) {
            sessionStorage.setItem('userID', data.data.matches.id) //stores as 'global'
            // let userID = Number(sessionStorage.getItem('userID))
            firstName = data.data.matches.firstName
            hi()
        } else {
            alert('wrong!')
        }
    })
    .catch(e => console.log(e))
})

signup.addEventListener('click', (e) => {
    e.preventDefault()
    const h1 = document.querySelector('.cryptokeep h1')
    h1.style.display = 'inline-block'
    h1.className = 'tl pt4 avenir tracked lh-title dim pointer' 
    h1.id = 'keeperLog'
    const cryptokeepdiv = document.querySelector('.cryptokeep')
    cryptokeepdiv.classList.add('bb','bw2')
    const keeperlog = document.querySelector('#keeperLog')
    keeperlog.addEventListener('click', () => {
        window.location.href = "./index.html"
    })
    const head = document.querySelector('head')
    head.innerHTML =
    `
    <meta charset="utf-8">
    <title>summary</title>
    <link rel="stylesheet" href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="./style/signup.css">
    `
    main.innerHTML = 
    `
    <form class="signupForm">
        <div class="letter tl avenir fw6 pt4">
            <p>
            Hey there, I'm cryptoKeeper. You must be 

            <input type="text" name="fname" placeholder="first name" class= "fName" required> 
            <input type='text' name="lname" placeholder='last name' class= "lName" required>.<br>

            Nice to meet you. I'm so excited for you to sign up with us so that you can keep track of your wallet value in <span class="light-purple">real time</span>.<br>
            Now let's set up your account; to login, I need an email from you (don't worry I won't spam you). My email is 

            <input type="email" name="email" class= "signupEmail" required placeholder=" ...">.
            
            </li><br>
            Perfect, now I need a password 

            <input type="password" name="password" class= "password" required placeholder=" ...".>
            
            </li><br>
            You are now ready to go! To check if you're a GOOD HUMAN click on <span class='thiss light-purple pointer dim'>this</span> (jk, it's just to see if you're spam or not).
            </p>
        </div>
        <div class='tc mt5'>
            <button type='submit' value="submit" class="tracked btn btn-outline-secondary avenir" id="formComplete">submit</button>
        </div>
    </form>
    `
    const signupButt = document.querySelector('.signupForm')
    signupButt.addEventListener('submit', (e) =>{
        e.preventDefault()
        const fName = document.querySelector('.fName').value
        const lName = document.querySelector('.lName').value
        const pass = document.querySelector('.password').value
        const email = document.querySelector('.signupEmail').value
        const newUser = {
            firstName: fName,
            lastName: lName,
            password: pass,
            email: email
        }
        if (newUser) {
            axios.post('http://localhost:3000/users', newUser)
            .then (data => {
                
                console.log(data)
                main.innerHTML = 
                `
                <div class='tc avenir mt6 f2 tracked'>
                    <h2 class="pb1 fw6">You have created a successful account!<h2>
                    <h2 class="fw6">Welcome to the keeper community ${fName} :)</h2>
                </div>
                `
            })
            .catch(e => console.log(e))
        }
    })
//    input.setAttribute('size',input.getAttribute('placeholder').length)
})

function hi() {
    const h1 = document.querySelector('.cryptokeep h1')
    h1.style.display = 'none'
    main.innerHTML =
        `
        <div class='tc avenir tracked f1 measure h-50 pv7'>
            <p>hi ${firstName.toLowerCase()} <img class="w-10" src="/assets/handwave.gif" alt="handwave" title="handwave"/></p>
            <p>welcome to your portfolio!</p>
        </div>
        `
    setTimeout(summary, 2000)
}

function currency(n) {
    n=parseFloat(n)
    return isNaN(n)?'loading...':n.toFixed(2)
}

function summary() {
    const h1 = document.querySelector('.cryptokeep h1')
    h1.style.display = 'inline-block'
    h1.className = 'tl pt4 avenir tracked lh-title pointer dim' 
    h1.id = 'keeper'
    const cryptokeepdiv = document.querySelector('.cryptokeep')
    cryptokeepdiv.classList.remove('tc')
    cryptokeepdiv.classList.add('bb','bw1')
    const keeper = document.querySelector('#keeper')
    keeper.addEventListener('click', () => {
        summary()
    })
    
    const head = document.querySelector('head')
    head.innerHTML =
    `
    <meta charset="utf-8">
    <title>summary</title>
    <link rel="stylesheet" href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="./style/summary.css">
    `
    main.innerHTML = 
`
<div class="half">
    <h2 class="avenir tracked pl3 pt1 pr3 pb1 bg-white">overview</h2>
    <div class="content">
        <div class="graph">
            <div onload="updateLineChart(timeArr, ethPriceArr)">
              <div class="box">
                <canvas id="lineChart" height="460" width="800"></canvas>
              </div>
              <script src="./scripts/charts.js" charset="utf-8"></script>
            </div>
        </div>
        <div class="overviewStats">
            <div class='addnew b ba b--solid b--black br1 pt1 pl2 pr2 grow pointer'>+</div>
            <ul class="list">
                <li class="b bg-white dib">total wallet value</li>
                <li class="netValue"> </li>
                <li class="b bg-white dib">profit/loss</li>
                <li class="netPL"> </li>
            </ul>
        </div>
    </div>
</div>
<div class="half2">
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer bitcoin">bitcoin</p>
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer ethereum">etherum</p>
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer litecoin">litecoin</p>
</div>

`
    view = 'summary'
    const bitButton = document.querySelector('.bitcoin')
    const liteButton = document.querySelector('.litecoin')
    const ethButton = document.querySelector('.ethereum')
    const content = document.querySelector('.half')
    const addnewButt = document.querySelector('.addnew')
    
    addnewButt.addEventListener('click', () => {
        window.location.href = "./addNew.html"
    })
    
    
    bitButton.addEventListener('click', () => {
        bitButton.style.backgroundColor = 'white'
        liteButton.style.backgroundColor = 'none'
        ethButton.style.backgroundColor = 'none'
//        const title = document.querySelector('.cryptokeep')
//        title.classList.add('colorTitle')
        view = 'bitcoin'
//        function getTransactions() {
//            return axios.get(`http://localhost:3000/summary/user/${userID}/coin/Bitcoin`)
//            .then(data => {
//                console.log(data)
//                return data
//            })
//            .catch(err => {
//                console.log(err)
//            })
//        }
//        getTransactions()
//        .then(result => {
//            console.log(result)
//        })
        
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white">${bitButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <img src="http://via.placeholder.com/800x460" alt="placeholder for graph">
            </div>
            <div class="overviewStats">
                <div class='addnew b ba b--solid b--black br1 pt1 pl2 pr2 grow pointer'>+</div>
                <ul class="list">
                    <li class="b pt2 bg-white dib">holdings</li>
                    <li class="holdings">${bitHoldings} coins</li>

                    <li class="b bg-white dib">market value</li>
                    <li class="marketValue pb2"> </li>

                    <li class="b pt2 bg-white dib">profit/loss</li>
                    <li class="coinPL"> </li>

                    <li class="b pt2 bg-white dib">total invested</li>
                    <li class="invested">$${currency(bitInvested)} </li>
                </ul>
            </div>
        </div>
        `
        const addnewButt = document.querySelector('.addnew')
        addnewButt.addEventListener('click', () => {
            window.location.href = "./addNew.html"
        })
    })
    liteButton.addEventListener('click', () => {
        liteButton.style.backgroundColor = 'white'
        bitButton.style.backgroundColor = 'none'
        ethButton.style.backgroundColor = 'none'
        view = 'litecoin'
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white ">${liteButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <img src="http://via.placeholder.com/800x460" alt="placeholder for graph">
            </div>
            <div class="overviewStats">
                <div class='addnew b ba b--solid b--black br1 pt1 pl2 pr2 grow pointer'>+</div>
                <ul class="list">
                    <li class="b pt2 bg-white dib">holdings</li>
                    <li class="holdings">${liteHoldings} coins</li>

                    <li class="b bg-white dib">market value</li>
                    <li class="marketValue pb2"> </li>

                    <li class="b pt2 bg-white dib">profit/loss</li>
                    <li class="coinPL"> </li>

                    <li class="b pt2 bg-white dib">total invested</li>
                    <li class="invested">$${currency(liteInvested)} </li>
                </ul>
            </div>
        </div>
        `
        const addnewButt = document.querySelector('.addnew')
        addnewButt.addEventListener('click', () => {
            window.location.href = "./addNew.html"
        })
    })
    ethButton.addEventListener('click', () => {
        ethButton.style.backgroundColor = 'white'
        bitButton.style.backgroundColor = 'none'
        liteButton.style.backgroundColor = 'none'
//        const title = document.querySelector('.cryptokeep')
//        title.classList.add('colorTitle')
        view = 'ethereum'
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white ">${ethButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <img src="http://via.placeholder.com/800x460" alt="placeholder for graph">
            </div>
            <div class="overviewStats">
                <div class='addnew b ba b--solid b--black br1 pt1 pl2 pr2 grow pointer'>+</div>
                <ul class="list">
                    <li class="b pt2 bg-white dib">holdings</li>
                    <li class="holdings">${ethHoldings} coins</li>

                    <li class="b bg-white dib">market value</li>
                    <li class="marketValue pb2"> </li>

                    <li class="b pt2 bg-white dib">profit/loss</li>
                    <li class="coinPL"> </li>

                    <li class="b pt2 bg-white dib">total invested</li>
                    <li class="invested">$${currency(ethInvested)} </li>
                </ul>
            </div>
        </div>
        `
        const addnewButt = document.querySelector('.addnew')
        addnewButt.addEventListener('click', () => {
            window.location.href = "./addNew.html"
        })
    })
}

function summaryDOM() {
    let netValue = document.querySelector('.netValue')
    netValue.innerHTML = `$${currency(allCoinMarket)}`

    let allPL = document.querySelector('.netPL')
    allPL.innerHTML = `$${currency(netPL)}`
}

function bitcoinDOM() {
    let pillbit2 = document.querySelector('.marketValue')
    pillbit2.innerHTML = `$${currency(bitMarket)}`
    
    let pillbit3 = document.querySelector('.coinPL')
    pillbit3.innerHTML = `$${currency(bitMarket - bitInvested)}`
    if (pillbit3 < 0) {
        pillbit3.style.color = '#DB7F8E'
    }
}

function litecoinDOM() {
    let pillbit2 = document.querySelector('.marketValue')
    pillbit2.innerHTML = `$${currency(liteMarket)}`
    
    let pillbit3 = document.querySelector('.coinPL')
    pillbit3.innerHTML = `$${currency(liteMarket - liteInvested)}`
}

function ethereumDOM() {
    let pillbit2 = document.querySelector('.marketValue')
    pillbit2.innerHTML = `$${currency(ethMarket)}`
    
    let pillbit3 = document.querySelector('.coinPL')
    pillbit3.innerHTML = `$${currency(ethMarket - ethInvested)}`
    if (pillbit3 < 0) {
        pillbit3.style.color = '#DB7F8E'
    }
}