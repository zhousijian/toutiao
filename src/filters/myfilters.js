// 封装全局的过滤器

export const dateFormat = (time)=>{
    time = new Date(time)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    return `${year}年-${month}月-${day}日`
}