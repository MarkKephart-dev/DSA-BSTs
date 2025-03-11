class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // If the tree is empty, initialize the root with a new Node
    if (!this.root) {
      this.root = new Node(val);
      return this;  // Return the tree
    }

    let currentNode = this.root;
    while (true) {
      // Check if value already exists
      if (currentNode.val === val) {
        return this;
      }

      if (val < currentNode.val) {
        // Go to the left
        if (currentNode.left === null) {
          currentNode.left = new Node(val);  // Insert new node
          return this;
        } else {
          currentNode = currentNode.left;  // Move left
        }
      } else {
        // Go to the right
        if (currentNode.right === null) {
          currentNode.right = new Node(val);  // Insert new node
          return this;
        } else {
          currentNode = currentNode.right;  // Move right
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
      // If tree is empty, initialize the root with a new Node
      if (!this.root) {
        this.root = new Node(val);
        return this;  // Return the tree after inserting the root
      }
  
      // Recursive helper function to insert a node at the correct position
      const insertRecursive = (node, val) => {
        // Base case: if the node is null, create a new node and return it
        if (!node) {
          return new Node(val);
        }
  
        // If the value is less than the current node's value, insert on the left
        if (val < node.val) {
          node.left = insertRecursive(node.left, val);
        }
        // If the value is greater than the current node's value, insert on the right
        else if (val > node.val) {
          node.right = insertRecursive(node.right, val);
        }
  
        // Return the node (important for keeping the parent node reference intact)
        return node;
      };
  
      // Start the recursion from the root node
      insertRecursive(this.root, val);
  
      return this;  // Return the tree after insertion
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) {
      return undefined;
    }
    
    let currentNode = this.root;
    while(currentNode) {
      if (val === currentNode.val) return currentNode;
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }           
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findRecursive = (node, val) => {
      // Base case: if the node is null return undefined.
      if (!node) {
        return undefined;
      }

      if (node.val === val) {
        return node;
      }

      if (val < node.val) {
        return findRecursive(node.left, val);
      } 

      if (val > node.val) {
        return findRecursive(node.right, val);
      }
    }

    // Start the recursion from the root node
    return findRecursive(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let resultArray = [];

    const traverse = (node) => {
      if (!node) return;

      resultArray.push(node.val);

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    
    traverse(this.root); // Start the recursion at the root
    return resultArray;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let resultArray = [];

    const traverse = (node) => {
      if (!node) return;

      if (node.left) traverse(node.left);
      resultArray.push(node.val);
      if (node.right) traverse(node.right);
    };
    
    traverse(this.root); // Start the recursion at the root
    return resultArray;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let resultArray = [];

    const traverse = (node) => {
      if (!node) return;

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      resultArray.push(node.val);
    };
    
    traverse(this.root); // Start the recursion at the root
    return resultArray;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return []; // If the tree is empty, return an empty array

    let resultArray = [];
    let queue = [this.root];  // Start with the root node in the queue

    while (queue.length > 0) {
      let currentNode = queue.shift();  // Dequeue the first node from the queue
      resultArray.push(currentNode.val); // Process the current node

      // Enqueue left and right children if they exist
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return resultArray;  // Return the result array after the traversal
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  /** remove(val): removes a node from the BST with value val and returns the removed node. */
  remove(val) {
    const removeRecursive = (node, val) => {
      if (!node) return null;  // Base case: If the node doesn't exist, return null

      // Case 1: If value is less, go left
      if (val < node.val) {
        node.left = removeRecursive(node.left, val);
        return node;
      }
      // Case 2: If value is greater, go right
      if (val > node.val) {
        node.right = removeRecursive(node.right, val);
        return node;
      }

      // Case 3: If the node to be deleted is found
      if (node.val === val) {
        // Case 3a: Node has no children (leaf node)
        if (!node.left && !node.right) {
          return null;
        }

        // Case 3b: Node has one child (left or right)
        if (!node.left) {
          return node.right; // Replace node with its right child
        }
        if (!node.right) {
          return node.left; // Replace node with its left child
        }

        // Case 3c: Node has two children
        // Find the in-order successor (smallest in the right subtree)
        let minRightNode = this.findMin(node.right);
        node.val = minRightNode.val; // Replace the value of the node with the in-order successor
        node.right = removeRecursive(node.right, minRightNode.val); // Recursively remove the successor
        return node;
      }

      return node;
    };

    this.root = removeRecursive(this.root, val);
    return this.root;
  }

  /** findMin(node): helper function to find the minimum value node in the subtree */
  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
