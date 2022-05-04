import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {


  useEffect(() => {
    axios.get('http://localhost:5000/getLogs').then(res => {
      setLogData(res.data.sendLog)
    })
    axios.get('http://localhost:5000/getUsers').then(res => {
      setUserData(res.data.users)
    })
    axios.get('http://localhost:5000/getCountries').then(res => {
      setCountryData(res.data.countries)
    })
  }, [])


  const [logs, setLogData] = useState([])
  const [users, setUserData] = useState([])
  const [countries, setCountryData] = useState([])

  const [user, setUser] = useState('')
  const [country, setCountry] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterLogs, setFilterLogs] = useState([])
  const [betweenDate, setBetweenDate] = useState([])



  const getDaysArray = function (start, end) {
    for (var arrOfDate = [], date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
      arrOfDate.push(new Date(date));
    }
    return arrOfDate
  };

  const handleFilterClick = () => {
    if (
      user === '' ||
      country === '' ||
      startDate === '' ||
      endDate === '') {
      alert('Please fill out all fields !')
    }
    else {
      const arrStart = startDate.split('-')
      const arrEnd = endDate.split('-')
      let daylist = getDaysArray(new Date(`${arrStart[1]}/${arrStart[2]}/${arrStart[0]}`), new Date(`${arrEnd[1]}/${arrEnd[2]}/${arrEnd[0]}`));
      setBetweenDate(daylist.map((date) => `${date.getFullYear()}-${date.getMonth() > 9 ? +date.getMonth() + 1 : ('0' + (+date.getMonth() + 1))}-${+date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())}`))
      axios.post('http://localhost:5000/', { user, country, startDate, endDate }).then((req) => {
        let logsArray = req.data.logMess;
        setFilterLogs(logsArray)
      })
    }

  }


  return (
    <div className="App">
      <div className='container'>
        <div className='row '>
          <div className='col-6'>
            <form>
              <label className="form-label m-3">User</label>
              <select className="form-select w-100" aria-label="Default select example" onChange={(e) => {
                setUser(e.target.value)
              }}>
                {
                  users.map((user, index) => {
                    return (
                      <option key={index} value={user.id} > {user.name}</option>
                    )
                  })
                }
              </select>
              <label className="form-label m-3">Country</label>
              <select className="form-select w-100" aria-label="Default select example" onChange={(e) => {
                setCountry(e.target.value)
              }}>
                {
                  countries.map((country, index) => {
                    return (
                      <option key={index} value={country.id}> {country.title}</option>
                    )
                  })
                }
              </select>
              <label className="form-label m-3">Start Date</label>
              <input className='form-control w-100' type='date' value={startDate} onChange={(e) => {
                setStartDate(e.target.value)
              }} />
              <label className="form-label m-3">End Date</label>
              <input className='form-control w-100 ' type='date' value={endDate} onChange={(e) => {
                setEndDate(e.target.value)
              }} />
              <div className='d-flex justify-content-center'>
                <p className='btn btn-primary mt-3' onClick={handleFilterClick}>Filter Logs</p>
              </div>
            </form>
          </div>
          <div className='col-6'>
            {filterLogs.length ? <div className='row w-100 mt-3'>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Successfully</th>
                      <th scope="col">Failed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      betweenDate?.map((element, index) => {
                        const foundSuccess = filterLogs?.filter(el => el.createdAt === element && el.success === 1)[0]
                        const foundFailed = filterLogs?.filter(el => el.createdAt === element && el.success === 0)[0]
                        return (
                          <tr key={index}>
                            <td>{element}</td>
                            <td>{foundSuccess ? foundSuccess.countOfSuccess : '-'}</td>
                            <td>{foundFailed ? foundFailed.countOfSuccess : '-'}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              </div>
            </div> : ''}
          </div>
        </div>
      </div >
    </div >
  );
}

export default App;
