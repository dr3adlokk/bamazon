var mysql = require('mysql')
var inquire = require('inquirer')
var config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value))
  var sign = Math.sign(value)

  if (integer && (sign === 1)) {
    return true
  } else {
    return 'ERROR: Please enter a correct numeric value.'
  }
}

function selectInventory() {
  config.query('SELECT * FROM products', function (e, res) {
    if (e) throw e
    console.log('Welcome to Bamazon! Here is what we have in stock:')
    console.log("-------------------------------------------------------\n")
    for (var i = 0; i < res.length; i++) {
      console.log('ID: ' + res[i].item_id + ' | ' + 'PRODUCT: ' + res[i].product_name + ' | ' + 'DEPARTMENT: ' + res[i].department_name +
        ' | ' + 'PRICE: ' + res[i].price + ' | ' + 'QTY: ' + res[i].stock_quantity + '\n')
    }

    console.log("-------------------------------------------------------\n")
    inquirePurchase()
  })
}

function inquirePurchase() {
  inquire.prompt([{
      type: 'input',
      name: 'id',
      message: 'What is the ID of the product you would like to buy?',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to purchase?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function (input) {
    var quantityDesired = input.quantity
    var item = input.id
    makePurchase(item, quantityDesired)
  })

  function makePurchase(id, quantityNeeded) {
    config.query('SELECT * FROM products WHERE item_id = ' + id, function (e, res) {
      if (e) throw e

      if (quantityNeeded <= res[0].stock_quantity) {
        var total = res[0].price * quantityNeeded
        console.log('Thank you for your order')
        console.log("Your total cost for " + quantityNeeded + " " + res[0].product_name + " is " + total + ".")
        config.query("UPDATE products SET stock_quantity = stock_quantity - " + quantityNeeded + " WHERE item_id = " + id)
        // config.end()
      } else {
        console.log('Insufficient quantity! Please change your order.')
        selectInventory()
      }
    })
  }
}

function start() {
  selectInventory()
}

start()