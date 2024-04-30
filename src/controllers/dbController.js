const fs = require('fs');

module.exports = {
    // Verifica se o database existe
    isDbCreated: (Path) => {
        if (!fs.existsSync(Path)) {
            fs.writeFileSync(Path, "[]", (error) => {
                if(error) return console.log(err);
            })
        } 
    },
    
    // Adiciona o conteúdo ao database
    addToDB: (Content, Path) => {
        const fileContent = JSON.parse(fs.readFileSync(Path, 'utf-8'));
        fileContent.push(Content);
    
        fs.writeFile(Path, JSON.stringify(fileContent, null, 2), (error) => {
            if (error) throw error;
        })
    },
    
    // Retornar um JSON com as informações do database
    getJSON: async function(Path) {
        const fileContent = fs.readFileSync(Path, 'utf-8');
        return JSON.parse(fileContent);
    },
    
    getMap: async function(Path) {
        const jsonContent = await this.getJSON(Path);
        const map = new Map();
        jsonContent.forEach(user => map.set(user.id, user));
        return map;
    }
}