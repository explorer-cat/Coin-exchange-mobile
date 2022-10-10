    import getUpbitCryptoList from "../settings/upbitCryptoSetting";

    let socketUpbit: any; // 소켓
    let socketBithumb: any;
    let binanceSocket : any;
    // 웹소켓 연결

    function connectBinaceSocket(symbol: any, callback: any) {
    //     console.log("symbol",symbol)
    //     // let test:any = {'btcusdt','ethusdt'}
    //
    // // Symbol: ETH/USDT - Kline 30 minutes.
    // //     var socket = new WebSocket(`wss://stream.binance.com:9443/ws/${JSON.stringify({'btcusdt@kline_1m'})}`);
    //         var socket = new WebSocket(`wss://stream.binance.com:9443/ws/bitcoin@trade`)
    // // When message received from web socket then...
    //     socket.onmessage = function (event) {
    //
    //         // Easier and shorter.
    //         var data = JSON.parse(event.data);
    //
    //         console.log("data",data)
    //         // "x" means: Is this kline closed? Return "true" if closed. Closed means new line to be added.
    //         if (data.k.x === true) {
    //             // console.log("data",data)
    //             console.log("Add line.",data.k.c);
    //
    //             // Adding a line with my custom function.
    //             // addLine(data);
    //         } else {
    //             // console.log("data",data)
    //             console.log("dddd,line",data.k.c)
    //             // Updating line with my custom function.
    //             // updatePrice(data);
    //         }
    //     }

        binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws');
        // console.log("symbol",symbol)
        const msg = {
            method: 'SUBSCRIBE',
            params: symbol,
            id: 1,
        };

        binanceSocket.onopen = () => {
            binanceSocket.send(JSON.stringify(msg));
        };
        binanceSocket.onmessage = (event: any) => {
            // console.log("event", JSON.parse(event.data))
            return callback(JSON.parse(event.data))
        }
    }

    function connectWS(symbol: any, exchange: any, callback: any) {
        let connect: any;
        getSocket().then((result: any) => {
            if(result) {
                if (exchange === "upbit") {
                    // getSocket().then((result: any) => {
                    //     if (result) {
                    socketUpbit = new WebSocket("wss://api.upbit.com/websocket/v1");
                    socketUpbit.binaryType = 'arraybuffer';
                    socketUpbit.onopen = function (e: any) {
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

                            return callback(response)
                        }
                    }
                    socketUpbit.onclose = function (e: any) {
                        socketUpbit = undefined;
                    }
                    // }
                    // })
                } else if (exchange === "bithumb") {
                    // getSocket().then((result: any) => {
                    //     if (result) {
                    socketBithumb = new WebSocket("wss://pubwss.bithumb.com/pub/ws");
                    socketBithumb.binaryType = 'arraybuffer';

                    socketBithumb.onopen = function (e: any) {
                        //소켓이 연결되면
                        bithumbfilterRequest(`{"type":"ticker","symbols":${JSON.stringify(symbol)},"tickTypes":["MID"]}`);
                    }

                    socketBithumb.onmessage = async function (e: any) {
                        // console.log("e.data",e.data)
                        return callback(e.data)
                    };
                    socketBithumb.onclose = function (e: any) {
                        socketBithumb = undefined;
                    }
                }
            }
        })
    }


    // 웹소켓 연결 해제
    function closeWS() {
        if (socketUpbit !== undefined) {
            socketUpbit.close();
            socketUpbit = undefined;
        }

        if (socketBithumb !== undefined) {
            socketBithumb.close();
            socketBithumb = undefined;
        }
    }

    // 웹소켓 요청
    function upbitfilterRequest(filter: any) {
        if (socketUpbit == undefined) {
            alert('no connect exists upbit');
            return;
        }
        socketUpbit.send(filter);

    }

    // 웹소켓 요청
    function bithumbfilterRequest(filter: any) {
        if (socketBithumb == undefined) {
            alert('no connect exists bithumb');
            return;
        }
        socketBithumb.send(filter);

    }

    function getSocket() {
        return new Promise((resolve, reject) => {
            if (socketUpbit || socketBithumb) {
                closeWS()
                resolve(true)
            } else {
                resolve(true)
            }

        })

    }

    export {connectWS, closeWS, getSocket,connectBinaceSocket};
