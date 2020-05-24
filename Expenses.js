import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import {Container, Input, Button, Label, Form, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';

class Expenses extends Component {
    state = { 
        date : new Date(),
        isLoading : true,
        expenses : [],
        Categories : []
     }

     async componentDidMount() {

        const response = await fetch('/api/categories');
        const body= await response.json();

        this.setState({Categories : body, isLoading : false});

     }

    handleChange

    render() { 
        const title=<h3>Add Expense</h3>
        const {Categories, isLoading} = this.state;

        if(isLoading)
            return(<div>Loading.....</div>)

            let optionList = Categories.map(category => 
                                                <option id={category.id}>
                                                     {category.name}
                                                </option>)
            
        return ( 
            <div>
                <AppNav/>
                    <Container>
                       {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label for='title'>Title</label>
                                <input type="text" name="title" id="title" 
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <label for='category'>Category</label>
                                <select>
                                        {optionList}
                                </select>
                            </FormGroup>  
                            <FormGroup>
                                <label for='expenseDate'>Expense Date</label>
                                <DatePicker selected={this.state.date}
                                   onChange={this.handleChange}/>
                            </FormGroup>   
                            <FormGroup>
                                <label for='location'>Location</label>
                                <input type="text" name="location" id="location" 
                                    onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit" >Save</Button>{' '}
                                <Button color="secondary" tag={Link} 
                                to="/categories">Cancel</Button>
                            </FormGroup>                                                                                
                        </Form>

                    </Container> 
            </div>
            );
    }
}
 
export default Expenses;