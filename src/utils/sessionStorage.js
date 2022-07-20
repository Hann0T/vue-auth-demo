const sessionStorage = (key, initialValue) => {
  let itemParsed = JSON.parse(localStorage.getItem(key));

  if (!itemParsed) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    itemParsed = initialValue;
  }

  let item = itemParsed;

  const saveItem = (newItem) => {
    let itemStringified = JSON.stringify(newItem);
    localStorage.setItem(key, itemStringified);
    item = newItem;
  };

  return [item, saveItem];
};

export default sessionStorage;
