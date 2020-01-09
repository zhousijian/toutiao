import myaxios from '@/utils/myaxios.js'

export const articleList = (params)=>{
    // eslint-disable-next-line no-undef
    return myaxios({
        url : '/post',
        params
    })
}

// 新闻详情
export const articlexq = (id)=>{
    return myaxios({
        url : `/post/${id}`
    })
}

// 点赞
export  const dzarticle = (id)=>{
    return myaxios({
        url : `/post_like/${id}`
    })
}

// 收藏文章
export const scarticle = (id)=>{
    return myaxios({
        url : `/post_star/${id}`
    })
}

// 评论列表
export const commentlist = (id,params)=>{
    return myaxios({
        url : `/post_comment/${id}`,
        params
    })
}