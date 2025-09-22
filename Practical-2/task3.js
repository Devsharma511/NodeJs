const obj = {
  name: "Demo Object",
  normalFunc: function() {
    console.log("Normal Function:", this.name);
  },
  arrowFunc: () => {
    console.log("Arrow Function:", this.name);
  }
};

obj.normalFunc();
obj.arrowFunc();
