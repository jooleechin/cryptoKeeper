const signup = document.querySelector('#signup')
let loginButton = document.querySelector('#formLogin')
const main = document.querySelector('main')
let userID = Number(sessionStorage.getItem('userID'))
//const baseURL = 'http://localhost:3000'
const baseURL = 'https://bitkeeper.herokuapp.com'
//let eachTransaction

function getCoins() {
    return axios.get(`${baseURL}/summary/user/${Number(sessionStorage.getItem('userID'))}`)
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
    axios.post(`${baseURL}/login`, {email, password})
    .then (data => {
        if (data.data.matches) {
            sessionStorage.setItem('userID', data.data.matches.id) //stores as 'global'
            firstName = data.data.matches.firstName
            
            hi()
        } else {
            alert('wrong!')
        }
    })
    .catch(e => console.log(e))
})

function currency(n) {
    n=parseFloat(n)
    return isNaN(n)?'loading...':n.toFixed(2)
}

function getAllTrans() {
    let transactions
    let table = document.querySelector('#table')
    return axios.get(`${baseURL}/summary/user/${Number(sessionStorage.getItem('userID'))}`)
    .then (data => {
        transactions = data.data.AllTransactions
        return transactions.forEach(ele => {
            const type = ele.type_of_coin
            const newQty = ele.qty
            const newPrice = ele.purchase_price
            let newBS = ele.isBuy
            const total = newQty * newPrice
            
            const newDiv = document.createElement('div')
            newDiv.classList.add('TD')
            const newSpan = document.createElement('span')
            newSpan.innerHTML = type
            newDiv.appendChild(newSpan)
            
            const newDiv1 = document.createElement('div')
            newDiv1.classList.add('TD')
            const newSpan1 = document.createElement('span')
            newSpan1.innerHTML = newQty
            newDiv1.appendChild(newSpan1)
            
            const newDiv2 = document.createElement('div')
            newDiv2.classList.add('TD')
            const newSpan2 = document.createElement('span')
            newSpan2.innerHTML = `$${currency(newPrice)}`
            newDiv2.appendChild(newSpan2)
            
            const newDiv3 = document.createElement('div')
            newDiv3.classList.add('TD')
            const newSpan3 = document.createElement('span')
            if (newBS) {
                newBS = 'buy'
            } else {
                newBS = 'sell'
                newSpan3.classList.add('sell')
            }
            newSpan3.innerHTML = newBS
            newDiv3.appendChild(newSpan3)
            
            const newDiv4 = document.createElement('div')
            newDiv4.classList.add('TD')
            const newSpan4 = document.createElement('span')
            newSpan4.innerHTML = `$${currency(total)}`    
            newDiv4.appendChild(newSpan4) 
            
            const newDiv5 = document.createElement('div')
            newDiv5.classList.add('TD', 'update')
            const edit = document.createElement('div')
            edit.innerHTML = `<img src="./assets/edit.gif" alt="edit">`
            edit.classList.add('mr1', 'pointer', 'edit')
            const deleteIcon = document.createElement('div')
            deleteIcon.innerHTML = `<img src="./assets/delete.png" alt="delete">`
            deleteIcon.classList.add('delete', 'pointer')
            newDiv5.appendChild(edit)
            newDiv5.appendChild(deleteIcon)
            
            const row = document.createElement('div')
            row.classList.add('tableRow')
                        
            if (newSpan3.innerHTML == 'sell') {
                newSpan.classList.add('sell')
                newSpan1.classList.add('sell')                
                newSpan2.classList.add('sell')
                newSpan4.classList.add('sell')
            }
            
            //create and add row 
            row.appendChild(newDiv)
            row.appendChild(newDiv1)
            row.appendChild(newDiv2)
            row.appendChild(newDiv3)
            row.appendChild(newDiv4)
            row.appendChild(newDiv5)
            
            table.appendChild(row)
            
//            let count = 0
//            table.addEventListener('click', e => {
//                console.log(count++)
//                console.log('table clicked', e.target)
//                
//                // determine what was clicked in the table
//                
//                // if it isn't something valid to click. Do nothing.
//                
//                // otherwise, determine if this is an edit or delete operation
//                
//                // look up information in that row
//            })
            return table
        })
    })
}

function getTransByCoin() {
    let transactions
    let table = document.querySelector('#table')
    return axios.get(`${baseURL}/summary/user/${Number(sessionStorage.getItem('userID'))}/coin/${view}`)
    .then (data => {
        transactions = data.data.Transactions
        return transactions.forEach(ele => {
            const newQty = ele.qty
            const newPrice = ele.purchase_price
            let newBS = ele.isBuy
            const total = newQty * newPrice
            
            const newDiv = document.createElement('div')
            newDiv.classList.add('TD')
            const newSpan = document.createElement('span')
            newSpan.innerHTML = newQty
            newDiv.appendChild(newSpan)
            
            const newDiv2 = document.createElement('div')
            newDiv2.classList.add('TD')
            const newSpan2 = document.createElement('span')
            newSpan2.innerHTML = `$${currency(newPrice)}`
            newDiv2.appendChild(newSpan2)
            
            const newDiv3 = document.createElement('div')
            newDiv3.classList.add('TD')         
            const newSpan3 = document.createElement('span')
            if (newBS) {
                newBS = 'buy'
            } else {
                newBS = 'sell'
                newSpan3.classList.add('sell')   
            }            
            newSpan3.innerHTML = newBS
            newDiv3.appendChild(newSpan3)
            
            const newDiv4 = document.createElement('div')
            newDiv4.classList.add('TD')
            const newSpan4 = document.createElement('span')
            newSpan4.innerHTML = `$${currency(total)}`
            newDiv4.appendChild(newSpan4)
            
            const row = document.createElement('div')
            row.classList.add('tableRow')
            
            
            if (newSpan3.innerHTML == 'sell') {
                newSpan.classList.add('sell')
                newSpan2.classList.add('sell')
                newSpan4.classList.add('sell')
            }
            
            //create and add row 
            row.appendChild(newDiv)
            row.appendChild(newDiv2)
            row.appendChild(newDiv3)
            row.appendChild(newDiv4)
            
            table.appendChild(row)
            return table
        })
    })
}


signup.addEventListener('click', (e) => {
    e.preventDefault()    
    const h1 = document.querySelector('.splashTitle h1')
    const nav = document.querySelector('nav')
    nav.classList.remove('pb4')
    h1.style.display = 'inline-block'
    h1.classList.add('tl', 'pt4', 'avenir', 'tracked', 'lh-title', 'dim', 'pointer') 
    h1.id = 'keeperLog'
    const cryptokeepdiv = document.querySelector('.splashTitle')

    cryptokeepdiv.style.display = 'none'
    const logout = document.querySelector('#logout')
    logout.style.display = 'none'
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

            <input type="text" name="fname" placeholder="first name" class= "fName" style='width:20%' required autocapitalize> 
            <input type='text' name="lname" placeholder='last name' class= "lName" style='width:20%' required autocapitalize>.<br>

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
        <div class='tc mt4'>
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
        const keeper = document.querySelector('#keeper')
        keeper.addEventListener('click', ()=> {
            window.location.href = "./index.html"
        })
        const newUser = {
            firstName: fName,
            lastName: lName,
            password: pass,
            email: email
        }
        if (newUser) {
            axios.post(`${baseURL}/users`, newUser)
            .then (data => {
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
})

function hi() {
    const h1 = document.querySelector('.splashTitle')
    h1.style.display = 'none'
    main.innerHTML =
        `
        <div class='tc avenir tracked f1 mt6'>
            <p>hi ${firstName.toLowerCase()} <img class="w-10" src="/assets/handwave.gif" alt="handwave" title="handwave"/></p>
            <p>welcome to your portfolio!</p>
        </div>
        `
    setTimeout(summary, 1000)
}

function summary() {
    const keeper = document.querySelector('#keeper')
    keeper.addEventListener('click', () => {
        summary()
    })
    const cryptoKeepTitle = document.querySelector('.splashTitle')
    cryptoKeepTitle.style.display = 'none'
    const nav = document.querySelector('nav')
    nav.classList.remove('dNone')
    
    const logout = document.querySelector('#logout')
    logout.addEventListener('click', () => {
        sessionStorage.removeItem('userID')
        window.location.href = "./index.html"
    })
    
    const head = document.querySelector('head')
    head.innerHTML =
    `
    <meta charset="utf-8">
    <title>summary</title>
    <link rel="stylesheet" href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="./style/summary.css">
    <link rel="stylesheet" href="./style/transTable.css">
    `
    main.innerHTML = 
`
<div class="half pt3">
    <h2 class="avenir tracked pl3 pt1 pr3 pb1 bg-white">overview</h2>
    <div class="content">
        <div class="graph">
            <div onload="updateLineChart(timeArr, ethPriceArr)">
                <canvas id="lineChart"></canvas>
              <script src="./scripts/charts.js" charset="utf-8"></script>
            </div>
        </div>
        <div class="overviewStats">
            <div class='addnew b ba b--solid b--black br1 pt1 pl2 pr2 grow pointer'>+</div>
            <ul class="list">
                <li class="b bg-white dib">total wallet value</li>
                <li class="netValue">$loading...</li>
                <li class="b bg-white dib">profit/loss</li>
                <li class="netPL">$loading...</li>
            </ul>
        </div>
    </div>
    <div class="transactions">
        <h2 class="dib tc avenir bg-white pl3 pr3 tracked">transactions</h2>
        <div class="table" id="table">
            <div class="tableRow tableHeader avenir f4">
                <div class="TD">coin type</div>
                <div class="TD">quantity</div>
                <div class="TD">price</div>
                <div class="TD">buy/sell</div>
                <div class="TD">total</div>
                <div class="update TD"></div>
                
            </div>
            <div class="tableRow">
                <div class="none"><span></span></div>
                <div class="none"><span></span></div>
                <div class="none"><span></span></div>
                <div class="none"><span></span></div>
                <div class="none update">
                    <div class="edit"></div>
                    <div class="deleteIcon"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="half2">
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer bitcoin">bitcoin</p>
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer ethereum">ethereum</p>
    <p class="br-pill ba b--white-50 b pl3 pt2 pr3 grow pointer litecoin">litecoin</p>
</div>
`
    getAllTrans()
    document.querySelector('.table').addEventListener('load', () => {
        alert('yay!')
        console.log('yay!')
    })
    
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
        bitButton.classList.add('bcSelected')
        ethButton.classList.remove('bcSelected')
        liteButton.classList.remove('bcSelected')
        view = 'Bitcoin'
        
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white">${bitButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <div onload="updateLineChart(timeArr, ethPriceArr)">
                  <canvas id="lineChart"></canvas>
                  <script src="./scripts/charts.js" charset="utf-8"></script>
                </div>
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
        <div class="transactions">
            <h2 class="dib tc avenir bg-white pl3 pr3 tracked">transactions</h2>
            <div class="table" id="table">
                <div class="tableRow tableHeader avenir f4">
                    <div class="TD"">quantity</div>
                    <div class="TD">price</div>
                    <div class="TD">buy/sell</div>
                    <div class="TD">total</div>
                </div>
                <div class="tableRow"></div>
            </div>
        </div>
        `
        getTransByCoin()
        const addnewButt = document.querySelector('.addnew')
        addnewButt.addEventListener('click', () => {
            window.location.href = "./addNew.html"
        })
    })
    liteButton.addEventListener('click', () => {
        liteButton.classList.add('bcSelected')
        ethButton.classList.remove('bcSelected')
        bitButton.classList.remove('bcSelected')
        view = 'Litecoin'
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white ">${liteButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <div onload="updateLineChart(timeArr, ethPriceArr)">
                  <canvas id="lineChart"></canvas>
                  <script src="./scripts/charts.js" charset="utf-8"></script>
                </div>
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
        <div class="transactions">
            <h2 class="dib tc avenir bg-white pl3 pr3 tracked">transactions</h2>
            <div class="table" id="table">
                <div class="tableRow tableHeader avenir f4">
                    <div class="TD"">quantity</div>
                    <div class="TD">price</div>
                    <div class="TD">buy/sell</div>
                    <div class="TD">total</div>
                </div>
                <div class="tableRow"></div>
            </div>
        </div>
        `
        getTransByCoin()
        const addnewButt = document.querySelector('.addnew')
        addnewButt.addEventListener('click', () => {
            window.location.href = "./addNew.html"
        })
    })
    ethButton.addEventListener('click', () => {
        ethButton.classList.add('bcSelected')
        bitButton.classList.remove('bcSelected')
        liteButton.classList.remove('bcSelected')
        view = 'Ethereum'
        content.innerHTML = 
        `
        <h2 class="tc avenir tracked pl3 pt1 pr3 pb1 bg-white ">${ethButton.innerHTML}</h2>
        <div class="stats">
            <div class="graph">
                <div onload="updateLineChart(timeArr, ethPriceArr)">
                  <canvas id="lineChart"></canvas>
                  <script src="./scripts/charts.js" charset="utf-8"></script>
                </div>
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
        <div class="transactions">
            <h2 class="dib tc avenir bg-white pl3 pr3 tracked">transactions</h2>
            <div class="table" id="table">
                <div class="tableRow tableHeader avenir f4">
                    <div class="TD"">quantity</div>
                    <div class="TD">price</div>
                    <div class="TD">buy/sell</div>
                    <div class="TD">total</div>
                </div>
                <div class="tableRow"></div>
            </div>
        </div>
        `
        getTransByCoin()
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