import myaxios from '@/utils/myaxios.js'

export const categoryList = ()=>{
    return myaxios({
        url : '/category'
    })
}