
import axios from 'axios'
class ClassicModel  {
   
    /**
     * 获取最新期刊
     */
    getLatest(){
        return axios.get('classic/latest') 
    }
}

export default ClassicModel
