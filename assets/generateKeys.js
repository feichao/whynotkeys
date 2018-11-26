const keys1 = ['1', '2', '3', '4', '5'];
const keys2 = ['q', 'w', 'e', 'r', 't'];
const keys3 = ['a', 's', 'd', 'f', 'g'];
const keys4 = ['y', 'u', 'i', 'o', 'p'];
const keys5 = ['h', 'j', 'k', 'l'];

function g1Keys(keys = []) {
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    keys.push(keys[i] + '' + keys[i]);
  }

  for (let i = 0; i < l; i++) {
    keys.push(keys[i] + '' + keys[i] + '' + keys[i]);
  }

  for (let i = 0; i < l; i++) {
    keys.push(keys[i] + '' + keys[i] + '' + keys[i] + '' + keys[i]);
  }

  for (let i = 0, j = 1; j < l; i++, j++) {
    keys.push(keys[i] + '' + keys[j]);
    keys.push(keys[i] + '' + keys[i] + '' +  keys[j]);
    keys.push(keys[i] + '' + keys[j] + '' +  keys[j]);
    keys.push(keys[j] + '' + keys[i]);
    keys.push(keys[j] + '' + keys[j] + '' +  keys[i]);
    keys.push(keys[j] + '' + keys[i] + '' +  keys[i]);
  }

  for (let i = 0, j = 1, k = 2; k < l; i++, j++, k++) {
    keys.push(keys[i] + '' + keys[j] + '' + keys[k]);
    keys.push(keys[i] + '' + keys[k] + '' + keys[k]);
    keys.push(keys[i] + '' + keys[i] + '' + keys[k]);
    keys.push(keys[k] + '' + keys[j] + '' + keys[i]);
    keys.push(keys[k] + '' + keys[i] + '' + keys[i]);
    keys.push(keys[k] + '' + keys[k] + '' + keys[i]);
  }
}

const keysOther = new Set();
const strings = '1234567890qwertyuioasdfghjklzxcvbnm';
const length = strings.length;

for(let i = 0; i < 1000; i++) {
  const i1 = Math.floor(Math.random() * length);
  const i2 = Math.floor(Math.random() * length);
  const i3 = Math.floor(Math.random() * length);
  const i4 = Math.floor(Math.random() * length);
  keysOther.add(strings[i1] + '' + strings[i2] + '' + strings[i3] + strings[i4]);
}

g1Keys(keys1);
g1Keys(keys2);
g1Keys(keys3);
g1Keys(keys4);
g1Keys(keys5);

const total = new Set(keys1.concat(keys2).concat(keys3).concat(keys4).concat(keys5).concat(Array.from(keysOther)));

console.log(JSON.stringify(Array.from(total)));