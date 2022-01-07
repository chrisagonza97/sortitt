import Time from './Time'

it ('returns the date of jan 6 2022', ()=>{
    expect(Time.utcToDate(1641456000)).toEqual('1/6/2022')
})