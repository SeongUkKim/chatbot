/*
* post.js
*
* 스윗트래커 Open API 이용
* 
* 키 발급: http://www.sweettracker.co.kr/
* 
* 사용중인 API 
* - 배송정보 
*
*/

const request = require('request'),
  cheerio = require('cheerio');                   

const $url = 'http://info.sweettracker.co.kr/api/v1/trackingInfo';

const API_ERR = 'API 서버에 문제가 발생하였습니다\n\n[왜 문제가 발행하나요?]\n- 일일 트래픽 제한 초과\n- 운송장 데이터 없음\n- 서버 접속 오류\n\n잠시 후 다시 시도하거나\n내일 다시 시도해주세요';

const $KEY = require('./key.js').getKey();

const search = async (code, number) => {
     result = await new Promise((resolve, reject) => {
           
        //url
        var baseurl = $url + '?t_key=' + $KEY + '&t_code=' + code + '&t_invoice=' + number;
        
        //xml 불러오기 
        request(baseurl, (err,res, body) => {
        try{    
            if(err){
                reject(err);
            }
            
            body = JSON.parse(body);
            
            var str =`보내신 분: ${body.senderName}\n받으실 분: ${body.receiverName}\n상품명: ${body.itemName}\n======================`;
            
            var tracking = body.trackingDetails;
             
            if (tracking !== undefined){
                for(let i=0; i<tracking.length; i++) {
                    str += `위치: ${tracking[i].where}\n상태: ${tracking[i].kind}\n시간: ${tracking[i].timeString}\n문의전화: ${tracking[i].telno}\n======================`; 
                }
            }
            else{
                str = API_ERR;
            }  
            resolve(str);
        }
            catch(e){
                return API_ERR;
            }
        });
    })
    return result;
}

exports.search = search;
