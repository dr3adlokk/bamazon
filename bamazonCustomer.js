var mysql = require('mysql')
var inquire = require('inquirer')
var config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

// config.connect(function (e) {
//   if (e) throw e
// })

function start() {
  config.query('SELECT * FROM products', function (e, res) {
        if (e) throw e
        console.log('Welcome to Bamazon! Here is what we have in stock:')

        for (var i = 0; i < res.length; i++) {
          console.log('\n' + 'ID: ' + res[i].item_id + ' | ' + 'PRODUCT: ' + res[i].product_name + ' | ' + 'DEPARTMENT: ' + res[i].department_name +
            ' | ' + 'PRICE: ' + res[i].price + ' | ' + 'QTY: ' + res[i].stock_quantity + '\n')
        }

        console.log(' ')
        inquire.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the ID of the product you would like to buy?',

            validate: function (value) {
              if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                return true
              } else {
                return false
              }
            }
          },
          {
            type: 'input',
            name: 'qty',
            message: 'How many would you like to purchase?',
            validate: function (value) {
              if (isNaN(value)) {
                return false
              } else {
                return true
              }
            }
          }
        ]).then(function (ans) {
          var itemToBuy = (ans.id) - 1
          var howMany = parseInt(ans.qty)
          var total = parseFloat(((res[itemToBuy].price) * howMany).toFixed(2))

          if (res[itemToBuy].stock_quantity >= howMany) {
            config.query('UPDATE products SET ? WHERE ?', [{
                  stock_quantity: (res[itemToBuy].stock_quantity - howMany)
                },
                {
                  item_id: ans.id
                }
              ],
              function (e, res) {
                if (e) throw e
                console.log('Thank for your order. Your total is $' + total.toFixed(2))
              })
          }
          // config.query('SELECT * FROM department_name', function (e, deptRes){
          //   if(e) throw e
          //   var index
          //   for(var i = 0; i <deptRes.length; i++){
          //     if(deptRes[i].department_name === res[itemToBuy].department_name){
          //       index = i
          //     }
          //   } 
          else {
            console.log('Sorry, your item is not in stock.')
          }
          reprompt()
        })
      })
  
      function reprompt() {
        inquirer.prompt([{
          type: 'confirm',
          name: 'reply',
          message: 'Would you like to purchase another item?'
        }]).then(function (ans) {
          if (ans.reply) {
            start()
          } else {
            console.log('Thank you for shopping!')
          }
        })
      }
    }
      start()
      // config.end(function (e) {
      //   if (e) throw e
      // })