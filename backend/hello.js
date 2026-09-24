const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("TaskFlow data loaded");
    }, 2000);
  });
};

const run = async () => {
  console.log("A");

  const result = await getData();

  console.log(result);

  console.log("C");
};

run();