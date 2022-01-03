const parseFile = async (event) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      resolve(JSON.parse(event.target.result));
    };
    reader.readAsText(event.target.files[0]);
  });
};

const saveFile = ({ input, name, type }) => {
  //create temp a tag to download file
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(input)], {
    type,
  });
  element.href = URL.createObjectURL(file);
  element.href = URL.createObjectURL(file);
  element.download = `${name}.json`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export { parseFile, saveFile };
