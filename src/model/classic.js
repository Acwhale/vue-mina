
import axios from 'axios'
class ClassicModel  {
    /**
     * 获取最新期刊
     */
    getLatest(){
        return axios.get('classic/latest') 
    }
    /**
     * 获取当前一期的上一期
     */
    getPrevious(index){
        return axios.get(`classic/${index}/previous`)
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
       let latestIndex = localStorage.getItem('latest')
       return latestIndex == index ? true : false
    }
}

export default ClassicModel
