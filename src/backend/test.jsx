import * as React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';

import './test.css';

async function fetchData(comp)
{
    let json_data = {}
    json_data.companies = []

    for (let i = 0; i < comp.length; ++ i)
    {
        const res = await fetch('https://finnhub.io/api/v1/stock/profile2?symbol=' + comp[i] + '&token=bt89klv48v6srkbhfun0');
        const data = await res.json();

        await json_data.companies.push(
            {
                "name": data["name"],
                "ticker": data["ticker"]
            }
        );
    }
    
    return json_data;
}

const comp = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'FB', 'BABA', 'TSLA', 'WMT', 'V', 'NVDA'];

export default () =>
{
    let [data, setData] = useState([]);
    const [action, setAction] = useState([]);


    useLayoutEffect(() =>
    {    
        fetchData(comp).then((res) => setData(res.companies));
    }, []);

    useEffect(() => {
        setAction(data.map((res) =>
        {
            return(
                <tr key = {res.ticker}>
                    <td>{res.name}</td>
                    <td className="tickers">{res.ticker}</td>
                </tr>
            );
        }));
    }, [data]);


    return (
        <table className="ticker_table">
            <tr>
                <th> <h2> Company Name </h2> </th>
                <th> <h2> Ticker </h2> </th>
            </tr>
            <tr>
                <td className="names">Apple Inc</td>
                <td className="tickers">AAPL</td>
            </tr>
            <tr>
                <td className="names">Microsoft Corp</td>
                <td className="tickers">MSFT</td>
            </tr>
            <tr>
                <td className="names">Amazon.com Inc</td>
                <td className="tickers">AMZN</td>
                </tr>
            <tr>
                <td className="names">Alphabet Inc</td>
                <td className="tickers">GOOGL</td>
            </tr>
            <tr>
                <td className="names">Facebook Inc</td>
                <td className="tickers">FB</td>
            </tr>
            <tr>
                <td className="names">Alibaba Group Holding Ltd</td>
                <td className="tickers">BABA</td>
            </tr>
            <tr>
                <td className="names">Tesla Inc</td>
                <td className="tickers">TSLA</td>
            </tr>
            <tr>
                <td className="names">Walmart Inc</td>
                <td className="tickers">WMT</td>
            </tr>
            <tr>
                <td className="names">Visa Inc</td>
                <td className="tickers">V</td>
            </tr>
            <tr>
                <td className="names">NVIDIA Corp</td>
                <td className="tickers">NVDA</td>
            </tr>
        </table>
    );
}