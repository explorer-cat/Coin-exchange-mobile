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
    }

    return info;

}


export {getCryptoInfo};
