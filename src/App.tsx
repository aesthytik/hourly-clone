/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useReducer, useMemo, useCallback } from 'react'
import { history } from './index'
import { useQueryParam,NumberParam,StringParam, withDefault } from 'use-query-params'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { MdFlipCameraAndroid } from 'react-icons/md';
import Axios from "axios"
import { isNaN } from 'lodash';
// @ts-ignore
import paisa from 'paisa.js';
import logo from './Learning-Paths-Logo-Wide.png';

export interface ItemProps {
  title: string
  id: number
  image: string
  category: string
  price: string
}

function App() {


  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    history.listen(() => {
      forceUpdate()
    })
  }, [])

  const [info, setInfo] = useState([]);
  const [output, setOutput] = useState(0);

  const [input, setInput] = useQueryParam(
    'input',
    withDefault(NumberParam, 500000),
  );

  const [from, setFrom] = useQueryParam(
    'from',
    withDefault(StringParam, 'inr'),
  );

  const [to, setTo] = useQueryParam('to', withDefault(StringParam, 'usd'));

  const popularCurrencies: any = ['inr', 'usd', 'eur', 'cad', 'gbp'];

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`,
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  const convert = useCallback(() => {
    // @ts-ignore
    const rate = info[to];
    setOutput(input * rate);
  }, [info, input, to]);

  // console.log('info', info, output);

  useEffect(() => {
    convert();
  }, [convert, info]);

  async function handleAmountChange(e: any) {
    setInput(e.target.value);
    // setQuery({ input: e.target.value }, 'push');
    convert();
    console.log(output);
  }

  const defaultValues = useMemo(() => {
    const values = [
      {
        value: 500000,
        name: '5L',
      },
      {
        value: 1000000,
        name: '10L',
      },
      {
        value: 2000000,
        name: '20L',
      },
      {
        value: 5000000,
        name: '50L',
      },
      {
        value: 10000000,
        name: '1CR',
      },
    ];
    return values;
  }, []);

  const setInputFromDefault = (value: any) => {
    setInput(value);
    // setQuery({ input: value }, 'push');
    convert();
  };

  function flip() {
    const temp = from;
    setFrom(to);
    // setQuery({ from: to }, 'push');
    setTo(temp);
    // setQuery({ to: temp }, 'push');
    convert();
    // var rate = info[to];
    // const newOutput = input * rate;
    // setOutput(newOutput)
  }

  const isLastItem = (length: any, index: any) => {
    if (length === index + 1) {
      return true;
    } else {
      return false;
    }
  };

  const toValue = new Intl.NumberFormat('en-IN').format(input);
  const fromValue = new Intl.NumberFormat('en-IN').format(
    Number(output.toFixed(2)),
  );
  const monthlySplitTo = new Intl.NumberFormat('en-IN').format(
    Number((output / 12).toFixed(2)),
  );
  const monthlySplitFrom = new Intl.NumberFormat('en-IN').format(
    Number((input / 12).toFixed(2)),
  );
  const weeklySplitTo = new Intl.NumberFormat('en-IN').format(
    Number((output / 52).toFixed(2)),
  );
  const weeklySplitFrom = new Intl.NumberFormat('en-IN').format(
    Number((input / 52).toFixed(2)),
  );
  const dailySplitTo = new Intl.NumberFormat('en-IN').format(
    Number((output / 260).toFixed(2)),
  );
  const dailySplitFrom = new Intl.NumberFormat('en-IN').format(
    Number((input / 260).toFixed(2)),
  );
  const hourlySplitTo = new Intl.NumberFormat('en-IN').format(
    Number((output / 2080).toFixed(2)),
  );
  const hourlySplitFrom = new Intl.NumberFormat('en-IN').format(
    Number((input / 2080).toFixed(2)),
  );

  function numDifferentiation(value: string) {
    return value;
  }

  return (
    <div className="App">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="heading sm:text-6xl text-6xl font-semibold title-font mb-4 text-gray-900">
              Your Hourly Rate
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base py-4">
              Convert your hourly rates to popular currencies
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 pb-12 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-start border-b-2">
            <div className="relative flex-grow w-full text-left">
              <label
                htmlFor="full-name"
                className="leading-7 text-green-600 text-xl font-semibold"
              >
                Yearly compensation
              </label>
              <input
                type="number"
                placeholder="Enter Annual CTC"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={input}
                onChange={(e) => handleAmountChange(e)}
              />
              {from === 'inr' && (
                <div className="italic text-green-500">
                  {paisa.words(input * 100)}
                </div>
              )}
              {from === 'inr' && (
                <div className="flex">
                  {defaultValues.map((val, index) => (
                    <a
                      className="leading-relaxed text-gray-500 text-left font-semibold cursor-pointer hover:text-green-600"
                      onClick={() => setInputFromDefault(val.value)}
                    >
                      {val.name}
                      {isLastItem(defaultValues.length, index) ? ' ' : ', '}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="w-48" />
            <div className="relative flex-grow w-full text-left">
              <label
                htmlFor="email"
                className="leading-7 text-green-600 text-xl font-semibold"
              >
                From
              </label>
              <Dropdown
                options={popularCurrencies}
                onChange={(e) => {
                  setFrom(e.value);
                  // setQuery({ from: e.value }, 'push');
                }}
                value={from}
                placeholder="From"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="leading-7 text-white text-xl font-semibold"
              >
                To
              </label>
              <button
                onClick={flip}
                className="text-white bg-gray-300 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                <MdFlipCameraAndroid size={26} className="text-white" />
              </button>
            </div>
            <div className="relative flex-grow w-full text-left">
              <label
                htmlFor="email"
                className="leading-7 text-green-600 text-xl font-semibold"
              >
                To
              </label>
              <Dropdown
                options={popularCurrencies}
                onChange={(e) => {
                  setTo(e.value);
                  // setQuery({ to: e.value }, 'push');
                }}
                value={to}
                placeholder="To"
              />
            </div>
          </div>
          <div className="md:p-12 m-6">
            <div className="rounded-full">
              <p className="text-center text-2xl mb-3">Converted amount</p>
              <h1 className="title-font sm:text-7xl md:text-5xl mb-3 font-medium text-green-600 text-center">
                {`${toValue} ${from} = ${fromValue} ${to}`}
              </h1>
            </div>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Rate
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    {to}
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    {from}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">Monthly Rate</td>
                  <td className="px-4 py-3">
                    {' '}
                    {isNaN(monthlySplitTo) || monthlySplitTo === 'NaN'
                      ? 0
                      : numDifferentiation(monthlySplitTo)}
                  </td>
                  <td className="px-4 py-3">
                    {' '}
                    {isNaN(monthlySplitFrom) || monthlySplitFrom === 'NaN'
                      ? 0
                      : numDifferentiation(monthlySplitFrom)}
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    Weekly Rate
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    {isNaN(weeklySplitTo) || weeklySplitTo === 'NaN'
                      ? 0
                      : numDifferentiation(weeklySplitTo)}
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    {isNaN(weeklySplitFrom) || weeklySplitFrom === 'NaN'
                      ? 0
                      : numDifferentiation(weeklySplitFrom)}
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    Daily Rate
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    {isNaN(dailySplitTo) || dailySplitTo === 'NaN'
                      ? 0
                      : numDifferentiation(dailySplitTo)}
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    {isNaN(dailySplitFrom) || dailySplitFrom === 'NaN'
                      ? 0
                      : numDifferentiation(dailySplitFrom)}
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    Hourly Rate
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    {isNaN(hourlySplitTo) || hourlySplitTo === 'NaN'
                      ? 0
                      : numDifferentiation(hourlySplitTo)}
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    {isNaN(hourlySplitFrom) || hourlySplitFrom === 'NaN'
                      ? 0
                      : numDifferentiation(hourlySplitFrom)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer className="footer flex items-center justify-center mb-48">
        <a
          href="https://www.learningpaths.io/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logo} height={40} className="w-80" alt="Learning Paths" />{' '}
        </a>
      </footer>
    </div>
  )
}

export default App
