import axios from 'axios'

class BookModel {
    /**
     * 获取热门书籍(概要)
     */
    getHotList(){
        return axios.get('book/hot_list')
    }

    /**
     * 获取喜欢书籍数量
     */
    getMyBookCount(){
        return axios.get('book/favor/count')
    }

    /**
     * 获取书籍详细信息
     */
    getBookDeatail(id){
        return axios.get(`book/${id}/detail`)
    }
    /**
     * 获取书籍点赞信息
     */
    getLikeStatus(id){
        return axios.get(`book/${id}/favor`)
    }
    /**
     * 获取书籍的短评
     */
    getBookComments(id){
        return axios.get(`book/${id}/short_comment`)
    }
    /**
     * 新增短评
     */
    addComment(id,content){
        let url = 'book/add/short_comment'
        let params = {
            book_id:id,
            content:content
        }
        return axios.post(url,params)
    }
}

export default BookModel