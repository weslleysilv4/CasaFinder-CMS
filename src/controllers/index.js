//app use
const fs = require('fs').promises;

const addToJson = async(postJSON) => {
  const data = await fs.readFile(DB_PATH, 'utf-8', (error) => {
    if(error) throw error;
    const  parseData = JSON.parse(data);
    parseData.push(postJSON);
    fs.writeFile(DB_PATH), JSON.stringify(parseData, null, 2), (error) => {
      if(error) throw error;
    }
  })
}