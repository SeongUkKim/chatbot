const post = require('./post.js');

const weather = require('./weather.js');

const db = require('./database.js');

const schedule = require('node-schedule'); 

const http = require('http'), 
  express = require('express'), 
  bodyParser = require('body-parser'), 
  cheerio = require('cheerio'); 

const app = express();

const router = express.Router();

const $button = ['회사정보','행사일정','날씨','운송장조회','문의하기','챗봇정보'];
const $button2 = ['홈 페이지로 이동','직원수','회사위치'];
const $button3 = ['개발자','처음으로'];

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.get('/keyboard', function(req, res) {
       var data = {
           'type': 'buttons',
           'buttons': $button
       };
    
        res.json(data);
    });

app.post('/message', function(req, res) {
    
    var msg = req.body.content;
        console.log('입력: ' + msg);
    
    var send = {};
    
    switch(msg) {
        case '회사정보':
            res.json({
                'message':{
                    'text': '회사정보를 선택하셨습니다!'
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button2
                }
            });
            break;  
            
        
        case '홈 페이지로 이동':
            res.json({
                'message':{
                    'text':'아래 버튼을 클릭하면\n회사 홈 페이지로 이동합니다.',
                  'message_button': {
                      'label': '회사 홈 페이지',
                      'url': 'http://www.sundosoft.co.kr/'
                  }
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;    
        
        case '직원수':
            res.json({
                'message':{
                    'text': '(주)선도소프트의 직원수는 현재 37명 입니다.'
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;
            
        case '행사일정':
            res.json({
                'message':{
                    'text': '5월 11일: 창립 기념일 휴무\n'+
                            '6월 4일: 회사 이전 기념식\n'+
                            '6월 14일: 고척 야구장 야구관람\n'+
                            '6월 25일: 뮤지컬 관람'
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;
            
        case '회사위치':
            res.json({
                'message':{
                    'text': '구글지도에서 직접 확인해보세요!',
                  'message_button': {
                      'label': '회사위치',
                      'url': 'https://goo.gl/seijE7'
                  }    
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;    
  //*************************************회사정보***************************************************************************          
        case '날씨': {
            weather.get((data, err) => {
                if(err){
                    weather.set();
                }
                res.json({
                    'message':{
                        'text': data
                    },
                    keyboard:{
                        'type': 'buttons',
                        'buttons': $button
                    }   
                });
            })
            break;
        }
         
        case '챗봇정보':
            res.json({
                'message':{
                    'text':'(주)선도소프트의 정보제공서비스입니다!\n\n기능 및 오류 신고는 문의하기로 부탁드립니다.\n\n'+
                    '> 챗봇에서 상담원으로 전환하기\n\n> swkim@sundosoft.co.kr\n\n'+
                    '> 010-9172-2550\n\n본 서비스는 오픈소스로 Github에 모두 공개되어있으며 MIT 라이센스를 적용하고 있습니다!'+
                    '\n\nServer: Node.js\nDB: MySQL 5.7',
                'message_button': {
                    'label': '소스코드',
                    'url': 'https://github.com/SeongUkKim/chatbot'
                  }   
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button3
                }
            });
            break;
                  
        case '문의하기':
            res.json({
                'message':{
                    'text': '기능 및 오류 신고는\n아래에 문의해주세요',
                  'message_button': {
                      'label': '문의하기',
                      'url': 'https://open.kakao.com/o/sGt7J3J'
                  }
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;    
        
        case '개발자':
            res.json({
                'message':{
                    'text': '[개발자 정보]\n\n개발자: 김성욱\n이메일: swkim@sundosoft.co.kr\n깃허브: SeongUkKim'
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;
            
            
        case '처음으로':
            res.json({
                'message':{
                    'text': '다양한 기능을 이용해보세요!'
                },
                keyboard:{
                    'type': 'buttons',
                    'buttons': $button
                }
            });
            break;
        
        case '운송장조회':
            res.json({
                'message':{
                    'text': '[운송장조회]\n\n=======[국내택배]=======\n'+
                    '건영택배 - 18\n경동택배 - 23\n고려택배 - 19\n굿투럭 - 40\n'+
                    '대신택배 - 22\n로젠택배 - 06\n롯데택배 - 08\n애니트랙 - 43\n'+
                    '우체국택배 - 01\n일양로지스 - 11\n천일택배 - 17\n'+
                    '쿠팡 로켓배송 - 36\n한덱스 - 20\n한의사랑택배 - 16\n한진택배 - 05\n'+
                    '합동택배 - 32\n호남택배 - 45\nCJ대한통운 - 04\nCU편의점택배 - 46\n'+
                    'CVSnet - 24\nKGB택배 - 10\nKGL네트웍스 - 30\n드림택배 - 39\n'+
                    'SLX - 44\n=======[국제택배]=======\n롯데글로벌 로지스 - 99\n'+
                    '범한판토스 - 37\n에어보이익스프레스 - 29\n포시즌익스프레스 - 35\n'+
                    'APEX - 38\nCJ대한통운 국제특송 - 42\nDHL - 13\nDHL Global Mail - 33\n'+
                    'EMS - 12\nFedex - 21\nGSI Express - 41\nGSMNtoN - 28\n'+
                    'i-Parcel - 34\nTNT Express - 25\nTPL - 27\nUPS - 14\nUSPS - 26\n\n'+
                    '조회하실 택배사의 운송장을 입력하여 택배의 상황을 조회 할 수 있습니다.\n\n'+
                    '예)"택배 택배사번호 운송장번호"\nex)"택배 01 12345678"\n'+
                    '(운송장 번호는 -제외)\n\n해당 양식에 맞춰 명령어를 입력해주시면 됩니다.\n\n'+
                    '취소를 원하시면 "처음으로"를 입력 해주세요'
                },
            });
            
default: {
    if(msg.match(/^택배 /)){
        var code_idx = msg.search(/[0-9]{2}/);
        var number_idx = msg.search(/[0-9]{7,20}/);
    
        if(code_idx !== -1 && number_idx !== -1){
            var code = msg.substr(code_idx, 2);
            var number = msg.substr(number_idx);
        }
         post.search(code, number).then(result => {
             
           res.json({
            'message': {
              'text': result               
            },
            'keyboard': {
              'type': 'buttons',
              'buttons': $button
            }
          });
        });
    }
    else {  
        res.json({
          'message': {
            'text': '알 수 없는 명령입니다.\n\n형식과 일치하게 입력해주세요!'
          }, 
          'keyboard': {
            'type': 'buttons',
            'buttons': $button
          }
        });
      }
      break;
}
    //--------------------------------------------디폴트끝--------------------------------------        
  }
});

http.createServer(app).listen(9090, function() {
    console.log('서버실행중...');
    
    try {
    
    // 매분 간격으로 날씨데이터 갱신
    schedule.scheduleJob('0 * * * * * *', () => {
      weather.set();  
    }); 
  } 
    catch(e) {
    console.log(e);
    console.log("Database init() failed.");
  }
  
});
