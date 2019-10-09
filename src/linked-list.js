const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = this._tail = node;
        }
        this.length++;

        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        let currentNode = this._head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.data;
    }

    insertAt(index, data) {
        if (!this.length) return this.append(data);

        let replacedNode = this._head;
        for (let i = 0; i < index; i++) {
            replacedNode = replacedNode.next;
        }

        if (index == 0) {
            let node = new Node(data, null, replacedNode);
            replacedNode.prev = node;
            this._head = node;
        } else if (index == this.length) {
            let node = new Node(data, replacedNode, null);
            replacedNode.next = node;
            this._tail = node;
        } else {
            let node = new Node(data, replacedNode.prev, replacedNode);
            replacedNode.prev.next = replacedNode.prev = node;
        }

        this.length++;
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        if (this.length == 1 && !index) {
            this._head = this._tail = null;
            this.length = 0;
            return this;
        }

        let deletedNode = this._head;
        for (let i = 0; i < index; i++) {
            deletedNode = deletedNode.next;
        }

        if (index == 0) {
            deletedNode.next.prev = null;
            this._head = deletedNode.next;
        } else if (index == this.length) {
            deletedNode.prev.next = null;
            this._tail = deletedNode.prev;
        } else {
            deletedNode.prev.next = deletedNode.next;
            deletedNode.next.prev = deletedNode.prev;
        }

        deletedNode = null;
        this.length--;
        return this;
    }

    reverse() {
        if (this.length == 1) return this;
        for (let j = 0, temp = this._head, currentNode = null; j < this.length; j++) {
            currentNode = temp;

            if (!j) this._tail = currentNode;
            if (j == this.length - 1) this._head = currentNode;

            temp = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = temp;
        }

        return this;
    }

    indexOf(data) {
        for (let i = 0, currentNode = this._head; i < this.length; i++) {
            if (currentNode.data == data) {
                return i;
            }
            currentNode = currentNode.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
