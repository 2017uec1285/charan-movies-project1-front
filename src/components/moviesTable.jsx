import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns=[
    {
      path:"title",
      lable:"Title",
    content:movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    {path:"genre.name",lable:"Genre"},
    {path:"numberInStock",lable:"Stock"},
    {path:"dailyRentalRate",lable:"Rate"},
    {
      key:"like",
      content: movie=><Like onClick={() => this.props.onLike(movie)} liked={movie.liked}></Like>  
    }
  ];
  deleteColumn={
    key:"delete",
    content:movie=>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
      Delete
      </button>
  }
  constructor(){
    super();
    const user=auth.getCurrentUser();
    if(user&&user.isAdmin)
     this.columns.push(this.deleteColumn);
  }
  render() { 
    const {movies,onSort,sortColumn}=this.props;
    return ( 
      <Table 
       columns={this.columns}
       data={movies}
       onSort={onSort}
       sortColumn={sortColumn}
      />
  );
  }
}

export default MoviesTable;