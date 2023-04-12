import '../style/App.css';
import axios from 'axios';
import React from 'react';


class App extends React.Component{
  state = { details: [],
    sortPrice: 'asc',
    sortYear: 'y',
  }

  componentDidMount(){
    let data;
    axios.get('http://127.0.0.1:8000/')
    .then(res => {
      data = res.data;
      console.log(data)
      data.sort((a, b) => a.price - b.price);
      data.sort((a,b) => a.year - b.year);
      this.setState({
        details: data,
        sortedDetails: data,
        sortDetails: data,
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleDelete = model => {
    const details = this.state.details.filter(detail => detail.model !== model);
    this.setState({
      details
    });
  }

  handleAdd(){
    const name = prompt('Название автомобиля:');
    const model = prompt('Модель:');
    const year = prompt('Год:');
    const color = prompt('Цвет:');
    const price = prompt('Цена:');

    const newCar = {
      name,
      model,
      year,
      color,
      price,
    };
    this.setState(prState => ({
      details: [...prState.details, newCar]
    }));
  }
  handleUpdate(model) {
    const updatedCar = prompt("Введите измененную цену:");
    const index = this.state.details.findIndex(car => car.model === model);
    const updatedDetails = [...this.state.details];
    updatedDetails[index] = {...updatedDetails[index], price: updatedCar};
    this.setState({ details: updatedDetails });
  }
  render() {
    return (
      <html>
        <div>
          <header><h1> Title </h1></header>
          <button className='asc' onClick={()=>{
            const sortedDetails = [...this.state.sortedDetails];
            if (this.state.sortPrice === 'asc') {
              sortedDetails.sort((a, b) => a.price - b.price);
              this.setState({ details: sortedDetails, sortPrice: 'desc' });
            } else {
              sortedDetails.sort((a, b) => b.price - a.price);
              this.setState({ details: sortedDetails, sortPrice: 'asc' });
            }
          }}>
            сортировать по цене
          </button>
          <button className='y' onClick={()=>{
            const sortDetails = [...this.state.sortDetails];
            if (this.state.sortYear === 'y') {
              sortDetails.sort((a, b) => a.year - b.year);
              this.setState({ details: sortDetails, sortYear: 'ye' });
            } else {
              sortDetails.sort((a, b) => b.year - a.year);
              this.setState({ details: sortDetails, sortYear: 'y' });
            }
          }}>
            сортировать по году
          </button>
          <button className='add' onClick={() => this.handleAdd()}>Добавить автомобиль</button>
          <hr></hr>
          {this.state.details.map((output, id) => (
            <div key={id}>
              <div className="car">
                <h3>{output.name}</h3>
                <p>Модель: {output.model}</p>
                <p>Год выпуска: {output.year}</p>
                <p>Цвет: {output.color}</p>
                <p>Цена: {output.price}</p>
                <button className='upd' onClick={() => this.handleUpdate(output.model)}>Изменить</button>
                <button className='del' onClick={() => this.handleDelete(output.model)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </html>
    )
  }
}

export default App;

