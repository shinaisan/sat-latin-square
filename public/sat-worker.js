if (false) {
  const solve = (size, callback) => {
    setTimeout(() => {
      const table = Array(size).fill().map((x, i) => (
        Array(size).fill().map((y, j) => (
          (i + j) % size
        ))
      ));
      const solution = {
        size,
        table
      };
      callback(null, solution);
    }, 1000);
  };
}

onmessage = function(e) {
  const size = e.data.size;
  const solve = e.data.solve;
  setTimeout(() => {
    const solution = solve(size, 1000);
    const error = null;
    postMessage({ error, size, solution });
    return;
    const table = Array(size).fill().map((x, i) => (
      Array(size).fill().map((y, j) => (
        (i + j) % size
      ))
    ));
    const solution = {
      size,
      table
    };
    postMessage({ error, solution });
  }, 1000);
};

