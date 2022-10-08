function getCryptoInfo(symbol: string) {
    let info = {
        name: ""
    }
    switch (symbol) {
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
        case "COMP":
            info.name = "컴파운드"
            break;
        case "EGLD":
            info.name = "엘론드"
            break;
        case "BSV":
            info.name = "비트코인에스브이"
            break;
        case "KSM":
            info.name = "쿠사마"
            break;
        case "SOL":
            info.name = "솔라나"
            break;
        case "ETC":
            info.name = "이더리움 클래식"
            break;
        case "BTG":
            info.name = "비트코인 골드"
            break;
        case "AVAX":
            info.name = "아발란체"
            break;
        case "NMR":
            info.name = "뉴메레르"
            break;
        case "ATOM":
            info.name = "코스모스"
            break;


    }

    return info;

}


export {getCryptoInfo};
