import myaxios from '@/utils/myaxios.js'

export const upload = (data)=>{
    return myaxios({
        method : 'post',
        url : '/upload',
        data
    })
}