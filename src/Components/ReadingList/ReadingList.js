import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './ReadingList.css';
import Button from '@material-ui/core/Button';
import BookInformation from '../BookInformation/BookInformation'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

class ReadingList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			isChange: false,
			readList: [],
			delete: ''
		}
	}
	componentDidMount(){

		fetch('https://secure-refuge-83591.herokuapp.com/readinglist' , {
			method:'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id:this.props.userID
			})
		}).then(response => response.json())
		.then(data => {

			this.setState({readList: data})
		})
	}

	onClickShowInfo = (id) => {
		this.setState({id: id})
		this.props.onClickReadInfoInList();
	}
	onClickDeleteBook = (id) =>{
		fetch('https://secure-refuge-83591.herokuapp.com/deletebook' , {
			method:'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				isbn: this.state.readList[id].isbn,
				id:this.props.userID
			})
		}).then(response => response.json())
			.then(data => {
				this.setState({readList: data})
			})


	}
	render(){
		console.log(this.state.readList)
		return (
		<div >

		{
			this.state.readList.length >0?
			 !this.props.isChange?
			<div>
		<h1 style={{color:'black'}}>My Reading List</h1>
		<TableContainer >
      <Table   >
        <TableHead>
          <TableRow>
            <TableCell align='center'>Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">ISBN</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          	
          	this.state.readList.map((information,id) => {
          	return (
          	<TableRow key={id}>
              
              <TableCell align="center">{this.state.readList[id].title}</TableCell>
              <TableCell align="center">{this.state.readList[id].author}</TableCell>
              <TableCell align="center">{this.state.readList[id].isbn}</TableCell>
              <TableCell align ='center'>
              <Button  color='primary' onClick={() =>this.onClickShowInfo(id)}>
              Show Information</Button>
              <Button variant="contained"
          color="secondary" onClick = {() => this.onClickDeleteBook(id)}>Delete</Button></TableCell>
            </TableRow>
            )
          })
          }
            
          
        </TableBody>
      </Table>
    </TableContainer>
	</div>
		: // display book information
		<div>
			<BookInformation 
	  isbn={this.state.readList[this.state.id].isbn}
      author={this.state.readList[this.state.id].author}
      title={this.state.readList[this.state.id].title}
      description={this.state.readList[this.state.id].description}
      image={this.state.readList[this.state.id].image}
      publisher={this.state.readList[this.state.id].publisher}
      publishedDate={this.state.readList[this.state.id].publishedDate}
      country={this.state.readList[this.state.id].country}
      category={this.state.readList[this.state.id].category}
      pageCount={this.state.readList[this.state.id].pageCount}
 	  onClickGoBack = {this.props.onClickGoBackToList}
      />
		</div>
		:
		<div>
		<h1 style={{verticleDisplay:'middle'}}>Your Reading List is empty</h1>
		<h3 style={{fontWeight: 'normal'}}>To add books to the list, simply click on the (<ImportContactsIcon color='secondary' size='sm'/>) icon</h3>
		
		</div>
		}

		</div>
		)
	}
}


export default ReadingList;
