let tempObj = {
  Obj1: "test",
  obj2: "test",
  Obj3: "test",

  temp1: "test2",
  temp2: "test2",
  temp3: "test2",
};

// task1

// task2
//"test=obj1,obj2,obj3&test2=temp1,temp2,temp3"


let str = "";
let arr = [];
let arr2 = [];

    for (let key in tempObj) {
    arr.push(key);
    arr2.push(tempObj[key]);
    }
    console.log(... new Set(arr));
    // console.log(...new distinct(
    //     arr.map((item, index) => {
    //         return item + "=" + arr2[index];
    //     })));

