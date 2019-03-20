wx.cloud.init();
const db = wx.cloud.database();

Page({
  data: {
    array: ['第一大节', '第二大节', '第三大节', '第四大节', '第五大节', '第六大节','第七大节','第八大节'],
    index: 0,
    btn_txt: "__",
    cnum1: " ",
    cname1: " ",
    tname1: " ",
    peroid1: " ",
    name: 0,
  },

 

  bindPickerChange: function(e) {
    // console.log(e.detail.value);
    switch (parseInt(e.detail.value)) {
      case 0:
        var txt = '一';
        break;
      case 1:
        var txt = '二';
        break;
      case 2:
        var txt = '三';
        break;
      case 3:
        var txt = '四';
        break;
      case 4:
        var txt = '五';
        break;
      case 5:
        var txt = '六';
        break;
      case 6:
        var txt = '七';
        break;
      case 7:
        var txt = '八';
        break;
    };
   this.setData({
      index: e.detail.value,
      btn_txt: txt,
      name: parseInt(e.detail.value) + 1,
      cnum1: txt
    })
    // console.log(this.data.name)
  },

  onChange2(event2) {
    this.setData({
      cname1: event2.detail
    })
  },
  onChange3(event3) {
    this.setData({
      tname1: event3.detail
    })
  },
  onChange4(event4) {
    this.setData({
      peroid1: event4.detail
    })
  },


  insert() {
    if (this.data.cnum1 == " " || this.data.cname1 == " " || this.data.tname1 == " " || this.data.peroid1 == " "){
        wx.showModal({
          title: '插入失败',
          content: '还有空项噢！',
        })
    }else{
    db.collection('classlist').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          cnum: this.data.cnum1,
          cname: this.data.cname1,
          tname: this.data.tname1,
          peroid: this.data.peroid1,
          name: this.data.cnum1,
      }, 
      success: res => {
        this.setData({
          array: ['第一大节', '第二大节', '第三大节', '第四大节', '第五大节', '第六大节', '第七大节', '第八大节'],
          index: 0,
          btn_txt: "__",
          cnum1: " ",
          cname1: " ",
          tname1: " ",
          peroid1: " ",
          name: 0,
        })
        wx.showToast({
          title: '插入成功',
        })
        },
      fail: err => {
        wx.showModal({
          title: '失败',
          content: '网络不给力！',
        })
      },   
  })
 }
},

  cancel(){
    wx.reLaunch({
      url: '../Mon/Mon',
      fail: function () {
        console.info("跳转失败")
      }
    })
    
  this.setData({
    array: ['第一大节', '第二大节', '第三大节', '第四大节', '第五大节', '第六大节', '第七大节', '第八大节'],
    index: 0,
    btn_txt: "__",
    cnum1: " ",
    cname1: " ",
    tname1: " ",
    peroid1: " ",
    name: 0,
  })
},

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },

onLoad(){
  
  this.getOpenid();
},
onReady(){},
onShow(){},
onHide(){},
onUnload(){},
onPullDownRefresh(){},
onReachBottom(){},
onShareAppMessage(){
  success: res => {
    wx.showToast({
      title: '谢谢转发噢!',
    })
  }
},

})