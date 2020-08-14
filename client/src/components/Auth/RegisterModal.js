import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from  '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegistrationModal extends Component {
    state = { 
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticate : PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    }

    componentDidUpdate(prepProps){
        const {error, isAuthenticate} = this.props;

        if(error !== prepProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg});
            }else{
                this.setState({msg : null});
            }
        }
        
        if(this.state.modal){
            if(isAuthenticate){
                this.toggle();
            }
        }
    }


    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e =>{
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();
        
        const  {name, email, password}  = this.state;
        const newUser = {
            name, 
            email, 
            password
        }
        this.props.register(newUser);
    }

    render() { 
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal 
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color='danger'>{this.state.msg }</Alert>)
                         : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button 
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                    >Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
   isAuthenticate: state.auth.isAuthenticate,
   error: state.error,
   register: PropTypes.func.isRequired,
   clearErrors: PropTypes.func.isRequired
});

export default connect(
    mapStateToProps, 
    { register, clearErrors}
)(RegistrationModal);