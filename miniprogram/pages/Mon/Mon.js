const app = getApp();
// wx.cloud.init();
// const db = wx.cloud.database();
// const classlist = db.collection("classlist");

Page({
  /**
   * 页面的初始数据
   */
  data: {

    days: " ",
    daystx: ' ',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    dates1:[],

    activeNames: ['0']
  },



  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

//--------------------原获取_id事件------------------------
// get: function(e){
  // const db = wx.cloud.database();
  // db.collection('classlist').field({
  //   _id: true,
  // }).get();
  // console.log(event.currentTarget.id.toString());
  // this.setData({
  //   id1: event.currentTarget.id.toString()
  // })
  // console.log(this.data.id1)

    // this.setData({
    //   id: e.currentTarget.dataset.id
    // }) 


    // let id = e.currentTarget.dataset.id;
    // const db = wx.cloud.database();
    // db.collection("classlist").doc(id).remove({
    //   success: res => {
    //     wx.showToast({
    //       title: '删除成功',
    //     })
    //     this.onLoad()//删除成功重新加载
    //   }, fail: err => {
    //     wx.showToast({
    //       title: '删除失败',
    //     })
    //   }
    // })
    // console.log(id)

  // if (this.data.id1){
  // const db = wx.cloud.database();
  // db.collection('classlist').doc(this.data.id1).remove({
  //   success: res => {
  //     wx.showToast({
  //       title: '删除成功',
  //     })
  //     this.setData({
  //       id1: '',
  //       count: null
  //     })
  //   }
  // })
  // }
// },
//---------------原获取_id事件结束------------------------------

//---------------原删除事件------------------------------------
// delete(event){
  
//   console.log(this.data.id);
//   db.collection('classlist').doc('XHYeankPDdDCJ6Fq').remove({
//     success(res) {
//       wx.showToast({
//         title: '删除成功',
//       })
//     }
//   })
// },
//---------------原删除事件结束----------------------------------

touchstart(e){
  this.startTime = e.timeStamp;
  console.log(e.timeStamp);
},

touchend(e){
  this.endTime = e.timeStamp;
  console.log(e.timeStamp);
},

longpress(event){
  if (this.endTime - this.startTime > 350);
  // console.log("长按");
  let id = event.currentTarget.dataset.id;
  wx.showModal({
    title: '提示',
    content: '确定要删除吗？',
    success: function (e) {
      if (e.confirm) {
        // 用户点击了确定 可以调用删除方法了
        const db = wx.cloud.database();
        db.collection("classlist").doc(id).remove({
          success: res => {
            wx.showToast({
              title: '删除成功',
            })
            this.onLoad()//删除成功重新加载
          }, fail: err => {
            wx.showToast({
              title: '删除失败',
            })
          }
        })
      } else if (e.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day = "日一二三四五六".split(/(?!\b)/)[new Date().getDay()];
    switch (day) {
      case "一":
      var mon = 1/7;
      var lastMon = 1-1/7; 
        this.setData({
          daystx:"新的一周也要元气满满鸭！",
        });
        break;
      case '二':
        this.setData({
          daystx: "第二天也要加油鸭！"
        });
        break;
      case '三':
    
        this.setData({
          daystx: "一个星期已经过了一大半啦！"
        });
        break;
      case '四':
        this.setData({
          daystx: "明天就是星期五啦！"
        });
        break;
      case '五':
        this.setData({
          daystx: "周末在等你！"
        });
        break;
      case '六':
        this.setData({
          daystx: "周末"
        });
        break;
      case '日':
        this.setData({
          daystx: "周末"
        });
        break;
    };
    this.setData({
      days: day
    })
    // console.log(day) 结果是当前的中文星期
    const db = wx.cloud.database();
    db.collection('classlist').get({
      success: res => {
        // res.data 是包含以上定义的两条记录的数组
        this.setData({
          dates1: res.data,
        })
        // console.log(res.data)
      },
      fail: err => {
        console.error(error);
      }
    })

    // ------------------背景音乐设置--------------------------
    //  wx.playBackgroundAudio({
    //   dataUrl: 'http://other.web.nf01.sycdn.kuwo.cn/resource/n1/81/26/3400124396.mp3',
    //  })
    // ------------------背景音乐设置结束-----------------------



    //-------------------动态进度条设置-------------------------
    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
    //---------------------动态进度条设置结束--------------------
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const db = wx.cloud.database();
    wx.startPullDownRefresh(
      db.collection('classlist').get({
        success: res => {
          // console.log(res.data[0]) ;
          this.setData({
            dates1: res.data
          })
        }
      })
    ),
      wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      success:res =>{
        wx.showToast({
          title: '谢谢转发噢!',
        })
      }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  },

})