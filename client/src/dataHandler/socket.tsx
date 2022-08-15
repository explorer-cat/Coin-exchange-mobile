import getUpbitCryptoList from "../settings/upbitCryptoSetting";

let socket: any; // 소켓

// 웹소켓 연결
function connectWS(connectionType:string, callback:any) {

    if(socket != undefined){
        socket.close();
        closeWS();
    }

    let listingData: Array<string> = [];


    if(connectionType === "upbit") {
        listingData = getUpbitCryptoList().listing;
    } 

    let codes :any = [];

    listingData.map((code:any)=> {
        codes.push(code.market);
    })

    socket = new WebSocket("wss://api.upbit.com/websocket/v1");
    socket.binaryType = 'arraybuffer';

    socket.onopen 	= function(e:any){
        //소켓이 연결되면
        // 		    {"type":"trade","codes":["KRW-BTC","KRW-ETH","KRW-XRP"]}
        filterRequest(`[
            {"ticket":"UNIQUE_TICKET"},
			{"type":"ticker","codes":${JSON.stringify(codes)}}]`)
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
    if(socket) {
        return true;
    } else {
        return false;
    }
}

export {connectWS,closeWS,getSocket};
