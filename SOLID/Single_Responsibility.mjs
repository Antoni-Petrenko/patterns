import fs from "fs";


// Group and separate functionality of objects

class Journal{
    constructor() {
        this.entries = {};
    }
    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
    }
    removeEntry(index){
        delete this.entries[index];
    }
    toString(){
        return Object.values(this.entries).join("\n");
    }
    // save(filename){
    //     fs.writeFileSync(filename, this.toString())
    // }
    // load(fileName){
    //
    // }
    // loadFromUrl(url){
    //
    // }
}
class PersistenceManager{
    saveToFile(journal, filename){
        fs.writeFileSync(filename, journal?.toString())
    }
    // load(fileName){
    //
    // }
    // loadFromUrl(url){
    //
    // }
}



Journal.count = 0;

const j = new Journal();

j.addEntry("Hi every one ");
j.addEntry("My name is Anthony");
const store = new PersistenceManager();

store.saveToFile(j,"logs.txt")

console.log(j.toString());

//Separation of concerns

