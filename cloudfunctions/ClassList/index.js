// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }

  //--------------------------批量更新----------------------------
  // try {
  //   return await db.collection('classlist').where({
  //     _openid: "o98L05auOqez8inPqNrxQ-aVCNsM"

  //   })
  //     .update({
  //       data: {
  //         // price: "100元"
  //       },
  //     })
  // } catch (e) {
  //   console.error(e)
  // }
  //------------------------------------------------------------

  try {
    return await db.collection('classlist').where({
      _id: this.data.id
    })
      .remove()
  } catch (e) {
    console.error(e)
  }


}