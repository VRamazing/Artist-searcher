class App extends React.Component{
  constructor(props){
  	super(props); 
    this.state = { loading: false,
                   name: '',
                   numOfTracks: 1,
                   data: [],
                   dataFetched: false
                 } 	

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.resetPage = this.resetPage.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("Submit entered");
    this.setState({loading: true});
    let url = "http://itunes.apple.com/search?";
    url += "term=" + this.state.name + "&limit=" + this.state.numOfTracks;
    console.log(url);
    $('#formModal').modal('hide');
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({data: data.results, loading: false, dataFetched: true}))
      .catch(error => this.setState({ error, loading: false }));
    
  }

  onValueChange(event){
    event.preventDefault();
    var targetId = event.target.id;
    var newState = {};
    newState[targetId] = event.target.value;
    this.setState(newState);
    // console.log(this.state);
  }

  resetPage(){
    event.preventDefault();
    this.setState({loading: false, dataFetched: false});
  }
  
  render(){

      const {data, loading, dataFetched, name} = this.state;

      if(dataFetched){
        if(data.length == 0){
          return(
            <div className = "row inside-2">
                <div className = "col">
                   <h1>No results for &ldquo;{name}&rdquo; <span onClick ={this.resetPage} className = "clear-anchor" > ( return ) </span> </h1> 
                </div>
            </div>

          )

        } 
        else{
          return( 
              <div className = "row inside-2">
                <div className = "col">
                <br />
                <h1>Search results for &ldquo;{name}&rdquo; <span onClick ={this.resetPage} className = "clear-anchor" > ( clear ) </span> </h1> 
                <ul className="list-unstyled">
                  <br />
                  { data.map((item, index) =>{
                      return (
                          <div key = {index}>
                            <br />
                            <li className="media" >
                              <img className="rounded-circle mr-3" src={item.artworkUrl100} alt={item.trackName} />
                              <div className="media-body mt-2">
                                <h6 className="mt-0 mb-1"><strong>Artist name : </strong> {item.artistName}</h6>
                                <h6 className="mt-0 mb-1"><strong>Track name : </strong> {item.trackName}</h6>
                                 {item.shortDescription}
                              </div>
                            </li>
                           
                            <hr />
                          </div>
                        )
                    })
                  }
                 
                </ul>
                </div>
              </div>
          )
        }       
      }
      else{
          return(
            <div>
                <div className = "row inside no-gutters">
                  <div className = "col-4">
                    <img src="img/arrow.png" className="img-fluid float-right arrow-img hidden-sm-down hidden-xl-up" alt="arrow image" />
                  </div>

                  <div className = "col artist-col">
                    <div className = "row">
                      <p className = "artist-text ">Find your artist below</p>
                    </div>
                    <div className = "row btn-row">
                        <button className = "btn btn-success text-center btn-search " data-toggle="modal" data-target="#formModal">Search artist</button>
                    </div>
                  </div>       
                </div>  
            
                <div className="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Enter Search Criteria</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group form-inline"> 
                              <div className = "col-4">
                                <label for="name">Artist name</label>
                              </div>   
                              <div className = "col-8">
                                <input type="text" className="form-control w100" placeholder="Enter name" id="name" value = {this.state.name} onChange={this.onValueChange} />
                              </div>            
                          </div>
                          <div className="form-group form-inline"> 
                              <div className="col-4">
                                <label for="numOfTracks">Number of tracks</label>              
                              </div>   
                              <div className="col-8"  >
                                <select id="numOfTracks" className="form-control w100" onChange={this.onValueChange} name="numOfTracks" >
                                  <option value={"1"}>1</option>
                                  <option value={"2"}>2</option>
                                  <option value={"3"}>3</option>
                                  <option value={"4"}>4</option>
                                </select>
                              </div>   
                          </div>
                          <button onClick = {this.handleSubmit} className="btn btn-primary float-right mr-15">Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           );   
        }       
	  }
}



ReactDOM.render(<App />, document.getElementById("app"));
