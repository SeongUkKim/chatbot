const request = require('request');

const $KEY_1 = require('./key.js').getKey1();

const requestOptions = async callback => {
  var time = new Date();
    time.toString();

    let currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    let dayString = ''
    dayString += `${year}-${month}-${day}`;
    
    // wFLLnmHZE1 캠퍼스의 지정한 식당 ID의 메뉴
  var requestOptions = {
    headers: {
      Accesstoken: $KEY_1
    },   
    url: 'https://bablabs.com/openapi/v1/campuses/wFLLnmHZE1/stores/MjEyMDA2MDI1?date='+dayString,
    method: 'GET',
  }; 


  request(requestOptions, function(error, _, body) {
    // 에러 발생 시 Reject
    if (error) {
      console.error(error)
      callback('학식 정보를 불러오는 중 오류가 발생했습니다')
      return
    }

    let data2 = JSON.parse(body)
    let menus = data2.store.menus
    let menuString = ''
    
    
    // 메뉴 데이터 한 문자열로 묶어서 응답
    for (let menu of menus) {
      menuString += `날짜: ${menu.date}\n메뉴: ${menu.name}\n설명: ${menu.description}\n가격: ${menu.price}\n===============\n`;
    }
    callback(menuString);
  });
}

exports.get = requestOptions;
