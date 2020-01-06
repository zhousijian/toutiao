import myaxios from '@/utils/myaxios.js'

export const articleList = (params)=>{
    // eslint-disable-next-line no-undef
    return myaxios({
        url : '/post',
        params
    })
}