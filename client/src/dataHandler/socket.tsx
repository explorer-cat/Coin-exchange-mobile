import getUpbitCryptoList from "../settings/upbitCryptoSetting";

let socketUpbit: any; // 소켓
let socketBithumb : any;

// 웹소켓 연결
function connectWS(symbol:any,exchange:any, callback:any) {
    let connect : any;
    getSocket().then((result:any) => {
        if(result) {
             if(exchange === "upbit") {
                socketUpbit = new WebSocket("wss://api.upbit.com/websocket/v1");
                socketUpbit.binaryType = 'arraybuffer';
                socketUpbit.onopen= function(e:any){
                     //소켓이 연결되면
                     // 		    {"type":"trade","codes":["KRW-BTC","KRW-ETH","KRW-XRP"]}

                     connect = "upbit"
                     upbitfilterRequest(`[
                                        {"ticket":"UNIQUE_TICKET"},
                                        {"type":"ticker","codes":${JSON.stringify(symbol)}}]`)
                 }
                 socketUpbit.onmessage = async function (e: any) {
                     if (connect === "upbit") {
                         let enc = new TextDecoder("utf-8");
                         let arr = new Uint8Array(e.data);
                         // console.log("arr",arr)
                         let str_d = enc.decode(arr);
                         // console.log("str_d",str_d)
                         let response = JSON.parse(str_d);
                         //  console.log("response",response)
                         return callback(response)
                     }
                 }
                 socketUpbit.onclose 	= function(e:any){
                     socketUpbit = undefined;
                 }
             } else if(exchange === "bithumb") {
                socketBithumb = new WebSocket("wss://pubwss.bithumb.com/pub/ws");
                socketBithumb.binaryType = 'arraybuffer';

                socketBithumb.onopen= function(e:any){
                     //소켓이 연결되면
                     bithumbfilterRequest(`{"type":"ticker","symbols":${JSON.stringify(symbol)},"tickTypes":["MID"]}`);
                 }

                 socketBithumb.onmessage = async function (e: any) {
                     // console.log("e.data",e.data)
                     return callback(e.data)
                 };
                 socketBithumb.onclose 	= function(e:any){
                     socketBithumb = undefined;
                 }
             }
        }
    })
}



// 웹소켓 연결 해제
function closeWS() {
    if(socketUpbit != undefined){
        socketUpbit.close();
        socketUpbit = undefined;
    }

    if(socketBithumb != undefined){
        socketBithumb.close();
        socketBithumb = undefined;
    }
}

// 웹소켓 요청
function upbitfilterRequest(filter:any) {
    if(socketUpbit == undefined){
        alert('no connect exists');
        return;
    }
    socketUpbit.send(filter);

}

// 웹소켓 요청
function bithumbfilterRequest(filter:any) {
    if(socketBithumb == undefined){
        alert('no connect exists');
        return;
    }
    socketBithumb.send(filter);

}

function getSocket() {
    return new Promise( (resolve, reject) => {
        if(socketUpbit || socketBithumb) {
            closeWS()
            resolve(true)
        } else {
            resolve(true)
        }

    })

}

export {connectWS,closeWS,getSocket};
