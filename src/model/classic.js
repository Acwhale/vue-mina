
import axios from 'axios'
class ClassicModel  {
    /**
     * 获取最新期刊
     */
    getLatest(){
        return axios.get('classic/latest') 
    }
    /**
     * 获取当前一期的上一期/下一期
     */
    getClassic(index,nextOrOPrevious){
        switch(nextOrOPrevious){
            case 'previous' :
                return axios.get(`classic/${index}/previous`)
            case 'next':
                return axios.get(`classic/${index}/next`)
        }
        
    }
    /**
     * 是否是第一期
     */
    isFirst(index){
        return index == 1 ? true : false
    }
    /**
     * 是否是最新一期
     */
    isLatest(index){
       try {
            let latestIndex = localStorage.getItem('latest')
            return latestIndex == index ? true : false
       } catch (error) {
           console.log(error)
       }  
    }
}

export default ClassicModel
