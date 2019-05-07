var request = require("request"); 
var cheerio = require('cheerio');
var url = 'https://www.airkorea.or.kr/web/dustForecast';

const air = async callback => {
  request(url, function(error, res, body)  { // 웹사이트 로드 
    var url = cheerio.load(body);
    
    var info_list = [];
    var colspan_index = [];
    
    //에러값 리턴  
    if (error) {
        console.error(err)
        callback('미세먼지 정보를 불러오는 중 오류가 발생했습니다')
        return
    }
    
        // 미세먼지 예보 정보를 가지고있는 첫번째 테이블을 확인 
        url('.st_2').eq(1).find('tr').each(function (index, elem) { 
    
        // 지역 구분 입력 
        if(index == 0){ 
            url(this).find('th').each(function (index, elem) { 
                info_list.push({ "강원" : url(this).text().trim() });

                if(url(this).attr('colspan') == '2') { 
                    colspan_index.push(index); 
                    info_list.push({"구분" : url(this).text().trim() });
                } 
            }); 
        }
        
        
        // 경기, 강원 구분 입력 
        if(index == 1){
            url(this).find('th').each(function (index, elem) {
                info = info_list[colspan_index[0] + index];
                info["강원"] = info["강원"] +" "+ url(this).text();
                info_list[colspan_index[0] + index] = info; 
            }); 
        } 
        
        // 미세면지, PM10, PM2.5 데이터 입력 
        if(index >= 2){ 
            
            // text 만 구분하여 입력한다. 
            info_str = url(this).text().split("\n");
            info_index = 0;
            info_key = "";
            
            
            for(index in info_str) {
                info = info_str[index].trim(); 
                if( info != "" ) {
                    if (info_index == 0){
                        info_key = info; 
                    } 
                    else {
                        dust_info = info_list[info_index]; 
                        dust_info[info_key]	= info;
                    } 
                    info_index++; 
                } 
            } 
        }
    });
    
    // 강원도 영서 지역만 파싱  
    function filterItems(query) {
        return info_list.filter(function(elem) {
            return elem['강원'].indexOf(query) > -1
        })
    }
    var airData = filterItems('영서')[0];
    var airStr = `미세먼지: ${airData['미세먼지']}\nPM10: ${airData.PM10}\nPM2.5: ${airData['PM2.5']}`;
      callback(airStr);
      
    let data3 = airStr;
      
  });
}

exports.get= air;
