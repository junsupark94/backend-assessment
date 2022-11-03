
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(value) {
    //empty list, first insertion
    if (this.head === null) {
      this.head = new Node(value);
      this.tail = this.head;
      return;
    }

    const {payer, points, timestamp} = value;
    if (timestamp < this.head.value.timestamp) {
      this.prepend(value);
    } else if (timestamp > this.tail.value.timestamp) {
      this.append(value);
    } else {
      let prev = this.traverse(value);
      let next = prev.next;
      const node = new Node(value);
      prev.next = node;
      node.next = next;
    }

  }

  prepend(value) {
    let next = this.head;
    this.head = new Node(value);
    this.head.next = next;
  }

  append(value) {
    let prev = this.tail;
    this.tail = new Node(value);
    prev.next = this.tail;
  }

  traverse(value) { // travel the list and return insertion point
    const {payer, points, timestamp} = value;
    let curr = this.head;
    while (curr) {
      if (timestamp > curr.value.timestamp) {
        if (timestamp < curr.next.value.timestamp)
          return curr;
      }
      curr = curr.next;
    }
    return curr;
  }
}

module.exports = LinkedList;