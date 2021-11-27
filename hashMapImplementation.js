class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(
    prevBucketCapacity = 2,
    thresholdCapacity = 0.6,
    bucketIncrementFactor = 2
  ) {
    this.bucketArray = new Array(prevBucketCapacity);
    this.hashMapLength = 0;
    this.filledBuckets = 0;
    this.thresholdCapacity = thresholdCapacity;
    this.bucketIncrementFactor = bucketIncrementFactor;
  }
  // To store Key value pair in Hash map
  set(key, value) {
    const index = this.getIndex(key);
    let node = this.bucketArray[index];
    // If node is present
    if (node) {
      while (true) {
        // key found
        if (node.key == key) {
          node.value = value;
          break;
        }
        //  key does not found
        if (node.next == null) {
          const newNode = new Node(key, value);
          this.hashMapLength = this.hashMapLength + 1;
          node.next = newNode;
          break;
        }
        node = node.next;
      }
    } else {
      // node is not present
      this.hashMapLength = this.hashMapLength + 1;
      this.bucketArray[index] = new Node(key, value);
      this.filledBuckets = this.filledBuckets + 1;
    }
    this.checkAndUpdateBucketCapacity();
  }

  getIndex(key) {
    let weightedSumOfString = 0;
    const stringKey = `${key}`;
    for (let index = 0; index < stringKey.length; index++) {
      const charCode = stringKey.charCodeAt(index) * Math.pow(7, index);
      weightedSumOfString += charCode;
    }

    return weightedSumOfString % this.bucketArray.length;
  }

  // To check if key is present or not
  get(key) {
    const index = this.getIndex(key);
    let node = this.bucketArray[index];
    // If Node is present
    if (node) {
      while (true) {
        //  key exist
        if (node.key == key) {
          return node.value;
        }
        // key does not exist
        if (!node.next) {
          return undefined;
        }
        node = node.next;
      }
    } else {
      // No node is present
      return undefined;
    }
  }

  // TO delete key
  delete(key) {

    let index = this.getIndex(key);
    let node = this.bucketArray[index];
    if (node) {
      let prevNode = null;
      while (true) {
        //  key exist
        if (node.key == key) {
          if (!prevNode) {
            this.bucketArray[index] = node.next;
            if (node.next == null) {
              this.filledBuckets = this.filledBuckets - 1;
            }
          } else {
            prevNode.next = node.next;
          }
          this.hashMapLength = this.hashMapLength - 1;
          return true;
        }
        //  key does not exist
        if (node.next == null) {
          break;
        }
        prevNode = node;
        node = node.next;
      }
    }
    // key not found
    return false;
  }

  checkAndUpdateBucketCapacity() {
    if (this.filledBuckets / this.bucketArray.length > this.thresholdCapacity) {
      let oldBucketArray = this.bucketArray;
      this.bucketArray = new Array(
        oldBucketArray.length * this.bucketIncrementFactor
      );
      this.hashMapLength = 0;
      this.filledBuckets = 0;
      oldBucketArray.forEach((node) => {
        while (node) {
          this.set(node.key, node.value);
          node = node.next;
        }
      });
    }
  }
  getKeys() {
    let keys = new Array();
    this.bucketArray.forEach((node) => {
      while (node) {
        keys.push(node.key);
        node = node.next;
      }
    });
    return keys;
  }

  getValues() {
    let values = new Array();
    this.bucketArray.forEach((node) => {
      while (node) {
        values.push(node.value);
        node = node.next;
      }
    });
    return values;
  }

  len() {
    return this.hashMapLength;
  }
}

let hashMap = new HashMap();

console.log(`............................Initialized Hash Map.................`);
console.log(`structure of hashmap  :: ${JSON.stringify(hashMap.bucketArray)}`);
console.log(`Actual length of bucket before Insertion :: ${JSON.stringify(hashMap.bucketArray.length)}`);

console.log(`............................Inserting Sample data in Hash Map.................`);
//sample data
let keys = [8489544881, 8489544882, 8489544883, 8489544884, 8489544885, 848954486, 8489544887];
let values = ["Harsh", "Aman", "Manav", "Adheesh", "Ritik", "Ashish", "Yatish"];

//inserting key-value pair in hashMap
keys.forEach((elem, i) => {
  hashMap.set(keys[i], values[i]);
});

console.log(`............................ Hash Map After Inserting Data.................`);
console.log(`structure of hashmap after Insert operation :: ${JSON.stringify(hashMap.bucketArray)}`);
console.log(`Actual length of bucket after Insertion :: ${JSON.stringify(hashMap.bucketArray.length)}`);


//existing keys and values in hashMap
console.log(`............................Displaying Hash Map Data.................`);
console.log(`keys after adding elements to hashmap :: ${JSON.stringify(hashMap.getKeys())}`);
console.log(`values after adding elements to hashmap :: ${JSON.stringify(hashMap.getValues())}`);

//get hashmap length
console.log(`Number of element in map after adding elements to hashmap :: ${JSON.stringify(hashMap.len())}`);

// Insert Operation
//Inserting more sample data
keys = [4387849777, 8888888899, 9678756465]
values = ['Rishabh', 'Abhijeet', 'Krishnam']

//inserting key-value pair in hashMap
keys.forEach((elem, i) => {
  hashMap.set(keys[i], values[i])
});

//Hashmap after Insertion
console.log(`............................Perforing Insertion Operation on Hash Map.................`);
console.log(`keys after adding more elements to hashmap :: ${JSON.stringify(hashMap.getKeys())}`);
console.log(`values after adding more elements to hashmap :: ${JSON.stringify(hashMap.getValues())}`);
console.log(`Number of element in map after adding more elements to hashmap :: ${JSON.stringify(hashMap.len())}`);

// Search Operation
//if key exist in hashMap it will give value
console.log(`............................Perforing Search Operation on Hash Map.................`);
console.log(`value got for existing key (value for given key is 4387849777) :: ${hashMap.get(4387849777)}`);

//if key does not exist in hashMap it will give undefined
console.log(`value got for not existing key  11111111111:: ${hashMap.get(11111111111)}`);

//Update operation
console.log(`............................Perforing Update Operation on Hash Map.................`);
console.log(`value of key 8489544881 before updation :: ${hashMap.get(8489544881)}`);
hashMap.set(8489544881, 'Windows');
console.log(`value of key 8489544881 After updation :: ${hashMap.get(8489544881)}`);

// Deletion Operation
console.log(`............................Perforing Deletion Operation on Hash Map.................`);
console.log('value for existing key before deletion : ' + hashMap.get(4387849777));
console.log(` structure of hashmap before delete operation :: ${JSON.stringify(hashMap.bucketArray)}`);
console.log(`Number of element in map before delete operation : ${hashMap.len()}`);

hashMap.delete(4387849777);

console.log(` structure of hashmap after delete operation :: ${JSON.stringify(hashMap.bucketArray)}`);
console.log('value for existing key after deleting : ' + hashMap.get(4387849777));
console.log(`Number of element in map after delete operation : ${hashMap.len()} \n`);

console.log(`............................Final Hash Map after all operation .................`);
console.log(`structure of hashmap after All operation :: ${JSON.stringify(hashMap.bucketArray)}`);
