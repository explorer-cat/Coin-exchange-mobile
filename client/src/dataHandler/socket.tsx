import getUpbitCryptoList from "../settings/upbitCryptoSetting";

let socket: any; // 소켓

// 웹소켓 연결
function connectWS(symbol:any,exchange:any, callback:any) {
    getSocket().then((result:any) => {
        if(result) {
            socket = new WebSocket("wss://api.upbit.com/websocket/v1");
            socket.binaryType = 'arraybuffer';

            socket.onopen 	= function(e:any){
                //소켓이 연결되면
                // 		    {"type":"trade","codes":["KRW-BTC","KRW-ETH","KRW-XRP"]}
                filterRequest(`[
            {"ticket":"UNIQUE_TICKET"},
			{"type":"ticker","codes":${JSON.stringify(symbol)}}]`)
            }
            socket.onmessage = async function (e: any) {
                let enc = new TextDecoder("utf-8");
                let arr = new Uint8Array(e.data);
                let str_d = enc.decode(arr);
                let response = JSON.parse(str_d);

                switch (response.type) {
                    case 'ticker':
                        return callback(response)
                        break;
                    case 'trade' :
                        return callback(response)
                        //            console.log("res", response)
                        break;
                }
            };
            socket.onclose 	= function(e:any){
                socket = undefined;
            }
        }

    })
}



// 웹소켓 연결 해제
function closeWS() {
    if(socket != undefined){
        socket.close();
        socket = undefined;
    }
}

// 웹소켓 요청
function filterRequest(filter:any) {
    console.log("소켓 요청!!", socket)
    if(socket == undefined){
        alert('no connect exists');
        return;
    }
    socket.send(filter);
}

function getSocket() {
    return new Promise( (resolve, reject) => {
        if(socket) {
            closeWS()
            resolve(true)
        } else {
            resolve(true)
        }

    })

}

export {connectWS,closeWS,getSocket};
