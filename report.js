const printReport = (pagesObject) => {
  const sortedPagesObject = sortByValue(pagesObject);
  for (const [key, value] of Object.entries(sortedPagesObject)) {
    console.log(`Found ${value} internal links to ${key}`);
  }
};

const sortByValue = (pagesObject) => {
  const sortedPagesObject = Object.entries(pagesObject).sort(
    (a, b) => b[1] - a[1],
  );
  return Object.fromEntries(sortedPagesObject);
};

export { printReport };
