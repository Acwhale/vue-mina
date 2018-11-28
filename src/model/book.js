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
}

export default BookModel