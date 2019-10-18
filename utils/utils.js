/**
 * @desc: 计算相隔时间
 * 
 * @param: 参数 | 属性说明 | 参考值
 * @param: arr_time | 到达时间 | 14：10
 * @param: dep_time | 出发时间 | 12: 00
 * 
 * @return: 相隔时间的字符串
 */
export function computeTime(arr_time,dep_time){
    //使用export是因为可以返回多个函数,而export default只能返回一个
    // 如果参数有一个空值,直接返回
    if(!arr_time||!dep_time) return
    // 转化为分钟
    const dep = dep_time.split(":");
    const arr = arr_time.split(":");
    const depVal = dep[0] * 60 + +dep[1];
    const arrVal = arr[0] * 60 + +arr[1];

    // 到达时间相减得到分钟
    let dis = arrVal - depVal;

    // 如果是第二天凌晨时间段，需要加24小时
    if(dis < 0){
        dis = arrVal + 24 * 60 - depVal;
    }

    // 得到相差时间
    return `${ Math.floor(dis / 60)}时${dis % 60}分`
}


/**
 * 
 */
export function abc() { 

 }