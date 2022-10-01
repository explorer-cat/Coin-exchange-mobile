function getCryptoInfo(symbol:string) {
    let info = {
        name : ""
    }
    switch(symbol) {
        case "BTC":
            info.name = "비트코인"
            break;
        case "YFI":
            info.name = "연파이낸스"
            break;
        case "ETH":
            info.name = "이더리움"
            break;
        case "MKR":
            info.name = "메이커"
            break;
        case "BNB":
            info.name = "바이낸스코인"
            break;
        case "BCH":
            info.name = "비트코인 캐시"
            break;
        case "AAVE":
            info.name = "에이브"
            break;
    }

    return info;

}


export {getCryptoInfo};
