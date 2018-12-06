
import axios from 'axios'

class KeyWordModel{
    key = 'q'
    max = 10
    getHistory(){
       let words =  JSON.parse(localStorage.getItem(this.key))
       return words
    }

    getHot(){

    }
    setHistory(word){
        let keywords = this.getHistory()
        console.log(keywords)
        if (keywords) {
            let index = keywords.indexOf(word)
            if (index == -1) {
                let length = keywords.length
                if (length >= this.max) {
                    keywords.pop()
                }
                keywords.unshift(word)
            }
            localStorage.setItem(this.key, JSON.stringify(keywords))
        }
        else {
            keywords = [word]
            localStorage.setItem(this.key, JSON.stringify(keywords))
        }
    }
}

export default KeyWordModel