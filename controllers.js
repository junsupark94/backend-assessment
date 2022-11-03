// keep record of all transactions
const transactions = [];

// transaction will be added to balances, which is a Linked List
const LinkedList = require('./linkedList.js');
const balances = new LinkedList();

module.exports = {
  get: (req, res) => {
    const record = {};
    let curr = balances.head;
    while (curr) {
      if (curr.value.payer in record === false)
        record[curr.value.payer] = curr.value.points;
      else record[curr.value.payer] += curr.value.points;
      curr = curr.next;
    }
    res.send(record);
  },
  post: (req, res) => {
    const transaction = req.body;
    transactions.push(transaction);
    balances.insert(transaction);
    res.end();
  },
  patch: (req, res) => {
    let spend = req.body.points;
    const spends = {}; // record all points deducted per payer

    let curr = balances.head; // loop through balances list
    while (curr && spend) {
      if (curr.value.points <= spend) {
        spend -= curr.value.points;
      } else {
        curr.value.points -= spend;
        const payer = curr.value.payer;
        if (payer in spends === false) {
          spends[payer] = 0;
        }
        spends[payer] -= spend;
        spend = 0;
        break;
      }
      const payer = curr.value.payer;
      if (payer in spends === false) {
        spends[payer] = 0;
      }
      spends[payer] -= curr.value.points;
      curr = curr.next;
    }

    balances.head = curr; // remove all balances that were used up

    const arr = []; // convert spends obj into an array of points spent per payer
    for (let payer in spends) {
      arr.push({ payer: payer, points: spends[payer] })
    }

    res.send(arr);
  }
}