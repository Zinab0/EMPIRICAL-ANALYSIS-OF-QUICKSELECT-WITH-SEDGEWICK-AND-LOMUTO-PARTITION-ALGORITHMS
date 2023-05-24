// CPCS-223 Project
// Name: Zinab Alsaggaf
// ID: 2006531

// fill array with random numbers from 0 to 100
function Fill(size) {
  var a = [];
  for (let i = 0; i < size; i++) {
    a.push(Math.floor(Math.random() * 101));
  }
  return a;
}
// find median value
function Median(a) {
  let r = a.length - 1,
    l = 0;
  return Math.floor(l + r / 2);
}

var a = []; // Empty array (to fill later)
var k; // Median
var countL;
var countS; // Basic operation counter
var limit = 1000000; // Array size = from current num to limit

//for each size 10 trial
for (let trial = 1; trial <= 1; trial++) {
  // Generate different input sizes that increase by 100,000
  for (let current = 100000; current <= limit; current += 500000) {
    a = Fill(current);
    k = Median(a);

    console.log("Trial ", trial);
    console.log("Array size =", current);
    console.log("---");
    countS = 0;
    console.log("Quickselect (Sedgewick) Partition");
    // call
    console.time("Execution Time");
    console.log("Median:", QuickselectS(a, k));
    console.timeEnd("Execution Time");

    console.log("Basic Operation count:", countS);
    //---------------------------------------
    console.log("--------------");
    a = a.sort(() => Math.random() - 0.5); //shuffle the array
    countL = 0;
    console.log("Quickselect (Lomuto) Partition");
    // call
    console.time("Execution Time");
    console.log("Median:", QuickselectL(a, k));
    console.timeEnd("Execution Time");
    console.log("Basic Operation count:", countL);
    console.log(
      "-------------------------------------------------------------------"
    );
  }
}
function QuickselectS(a, k) {
  var l = 0,
    r = a.length - 1;
  //Sedgewick Partition
  var p = a[r], //pivot
    i = l - 1, //left pointer
    j = r; //right pointer
  while (true) {
    //while (i<j)
    while (++countS && a[++i] < p) {} // a[r] acts as sentinel
    while (++countS && a[--j] > p) {
      if (j < l) break;
    }
    if (i >= j) break;
    [a[i], a[j]] = [a[j], a[i]]; //swap(a[i],a[j])
  }
  [a[i], a[r]] = [a[r], a[i]]; //swap(a[i],a[r]->pivot)

  if (i == k) {
    return a[i];
  } else if (i > k) {
    r = i - 1; // left subarray
  } else {
    l = i + 1; // right subarray
    k = k - l;
  }
  a = a.slice(l, r + 1);
  return QuickselectS(a, k);
}

function QuickselectL(a, k) {
  var l = 0,
    r = a.length - 1;
  //Lomuto Partition
  var p = a[l], //pivot
    s = l; //split
  for (var i = l + 1; i <= r; i++) {
    if (++countL && a[i] <= p) {
      s++;
      [a[s], a[i]] = [a[i], a[s]]; //swap(a[s],a[i])
    }
  }
  [a[l], a[s]] = [a[s], a[l]]; //swap(a[l],a[s])

  if (s == k) {
    return a[s];
  } else if (s > k) {
    r = s - 1; // left subarray
  } else {
    l = s + 1; // right subarray
    k = k - l;
  }
  a = a.slice(l, r + 1);
  return QuickselectL(a, k);
}
