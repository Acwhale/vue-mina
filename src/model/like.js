import axios from 'axios'

class LikeModel {
    like(like,artID,category){
        let url = like ? 'like' :'like/cancel'
        let params = {
            'art_id':artID,
            'type':category   
        }
        return axios.post(url,params)
    }
}
export default LikeModel