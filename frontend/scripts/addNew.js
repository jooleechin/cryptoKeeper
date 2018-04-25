const newTransSubmit = document.querySelector('#formSubmit')
const baseURL = 'https://bitkeeper.herokuapp.com'
//const baseURL = 'http://localhost:3000'


function currency(n) {
    n=parseFloat(n)
    return isNaN(n)?'loading...':n.toFixed(2)
}

const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    sessionStorage.removeItem('userID')
    window.location.href = "./index.html"
})

newTransSubmit.addEventListener('submit', (e) => {
    
    view == 'newTrans'
    e.preventDefault()
    const coin = document.querySelector('#coins')
    let quantity = document.querySelector('#quantity')
    let price = document.querySelector('#price')
    let selection
    let bought = document.querySelector('#buy')
    let sold = document.querySelector('#sell')
    
    if (bought.checked) {
        selection = true
    } else if (sold.checked){
        selection = false
    }
    let UserID = Number(sessionStorage.getItem('userID')) 
    const status = document.querySelector('.status')
    const newTrans = {
        user_id: UserID,
        type_of_coin: coin.options[coin.selectedIndex].innerHTML,
        qty: quantity.value,
        purchase_price: price.value,
        isBuy: selection
    }
    if (newTrans) {
        axios.post(`${baseURL}/transactions`, newTrans)
        .then (result => {
            status.innerHTML = 'yay! you have successfully entered in your transaction!'
            console.log(result.data[0].isBuy)

        })
        .catch(e => console.log(e))
    }
})
