/**
 *
 * Login (Unique UI/UX Edition)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

import actions from '../../actions';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';

class Login extends React.PureComponent {
  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      formErrors,
      isLoading,
      isSubmitting
    } = this.props;

    if (authenticated) return <Redirect to='/dashboard' />;

    const registerLink = () => {
      this.props.history.push('/register');
    };

    const handleSubmit = event => {
      event.preventDefault();
      login();
    };

    return (
      <div className='auth-page-wrapper'>
        {isLoading && <LoadingIndicator />}
        
        <Container>
          <Row className="justify-content-center">
            <Col xs='12' sm='10' md='9' lg='8' xl='7'>
              
              {/* Unique UI Element: Centered Minimalist Authentication Card */}
              <div className='ux-auth-card'>
                <div className='auth-header text-center'>
                  <h2>Welcome Back</h2>
                  <p className="text-muted">Log in to manage your orders and profile</p>
                </div>
                
                <form onSubmit={handleSubmit} noValidate className="mt-4">
                  <Row className="align-items-center">
                    
                    {/* Primary Form Fields Column */}
                    <Col xs='12' md='6' className='px-md-3 order-1'>
                      <div className="form-fields-holder">
                        <Input
                          type={'text'}
                          error={formErrors['email']}
                          label={'Email Address'}
                          name={'email'}
                          placeholder={'Enter your email'}
                          value={loginFormData.email}
                          onInputChange={(name, value) => {
                            loginChange(name, value);
                          }}
                        />
                        
                        <div className="password-input-wrapper position-relative">
                          <Input
                            type={'password'}
                            error={formErrors['password']}
                            label={'Password'}
                            name={'password'}
                            placeholder={'Enter your password'}
                            value={loginFormData.password}
                            onInputChange={(name, value) => {
                              loginChange(name, value);
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                    
                    {/* Social Authentication Column */}
                    <Col xs='12' md='6' className='px-md-3 mt-4 mt-md-0 order-2'>
                      <SignupProvider />
                    </Col>
                    
                  </Row>

                  <div className='ux-auth-footer-divider' />
                  
                  {/* Action Controls Footer Row */}
                  <div className='auth-actions-toolbar'>
                    <div className='main-actions-group'>
                      <Button
                        type='submit'
                        variant='primary'
                        text='Sign In'
                        disabled={isSubmitting}
                        loading={isSubmitting} // Connects to our custom loading wave logic!
                      />
                      <Button
                        text='Create an account'
                        variant='link'
                        className='ux-secondary-action-btn'
                        onClick={registerLink}
                      />
                    </div>
                    
                    <Link
                      className='redirect-link forgot-password-link'
                      to={'/forgot-password'}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  
                </form>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting
  };
};

export default connect(mapStateToProps, actions)(Login);