import axios from 'axios';

async function getZksEra(address) {
    try {
        let url = "https://zksync2-mainnet-explorer.zksync.io/address/" + address;
        let getErc20Url = "https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address=" + address;
        const response = await axios.get(url);
        const res = await axios.get(getErc20Url);
        let tx2, balance2, usdcBalance, zatBalance;
        if ("0x0000000000000000000000000000000000000000" in response.data.info.balances) {
            balance2 = (parseInt(response.data.info.balances["0x0000000000000000000000000000000000000000"]
                .balance, 16) / 10 ** 18).toFixed(3)
        } else {
            balance2 = 0;
        }
        if ("0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4" in response.data.info.balances) {
            usdcBalance = (parseInt(response.data.info.balances["0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4"]
                .balance, 16) / 10 ** 6).toFixed(3)
        } else {
            usdcBalance = 0;
        }
        res.data.result.map(item => {
            if (item.contractAddress.toLowerCase() === "0x47EF4A5641992A72CFd57b9406c9D9cefEE8e0C4".toLowerCase()) {
                zatBalance = item.balance/1000000000000000000
            }
        })
        tx2 = response.data.info.sealedNonce;
        return {balance2, tx2, usdcBalance, zatBalance};
    } catch (error) {
        console.error(error);
        return {balance2: "Error", tx2: "Error", usdcBalance: "Error", zatBalance: "Error"};
    }
}

export default getZksEra;
