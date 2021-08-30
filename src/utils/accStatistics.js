const calTransaction = arr => {
  const tranArr = arr?.map(data => data?.amount);
  const sum = arr
    ?.map(inc => inc?.amount)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  const avg = sum / 2;
  const min = Math.min(...tranArr);
  const max = Math.max(...tranArr);
  return {
    sumTotal: sum,
    avg,
    min,
    max,
  };
};

export default calTransaction;
