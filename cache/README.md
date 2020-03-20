# In Memory Cache (Application Level)
In Memory Cache is used for caching the data to memory application. The purpose of this package is to save a global data in memory, so the other file can access the data easily.

# Usage
```js
const cache = require('./cache');

// parameters: key -> String, value -> any
// store the value with key
cache.put('key', { value: 'value' });


// parameters: key -> String, value -> any, expiration -> Number in seconds
// store the value with key
cache.put('key1', { value: 'value1' }, 120);

// parameters: key -> String
// get value by key
const data = cache.get('key');
console.log(data);
// { value: 'value' }

// remove by key
const deletedData = cache.del('key');
console.log(deletedData);
// { value: 'value' }

cache.put('key', { value: 'value' });
cache.put('key1', { value: 'value' });
cache.put('key2', { value: 'value' });

// clear all data that stored in cache
cache.clear();

const [data1, data2, data3] = [cache.get('key'), cache.get('key1'), cache.get('key2')];
console.log(data1); // null
console.log(data2); // null
console.log(data3); // null

```

# Why not redis?
instead we accessing the persistent constant value from redis, its better to store that data in our application memory.

