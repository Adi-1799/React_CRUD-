import { React,  Component } from 'react';

class App extends Component{
  constructor(){
    super();
    this.state={
      data : []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.data;
    let write = this.refs.txt.value;

    let newData = {
      "data" : data
    }
    data.push(newData);

    this.setState({
      data:data
    })

    this.refs.myForm.reset();
  }


  
  render(){
    let data = this.state.data;
    return(
      <div>

          <form ref="myForm">
            <label>Write Something</label>
            <input type="text" ref="txt"/>
            <button onClick={e => this.handleSubmit(e)}>Save</button>
        </form>

        <table>
          <tr>
            <th>Entered</th>
          </tr>
        </table>

      </div>
    )
  }
}
export default App;