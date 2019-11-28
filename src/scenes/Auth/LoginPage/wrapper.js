import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form from '../components/LoginForm';
import Card from '../../../components/Card';

class LoginWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      error: nextProps.error,
    };
  }

  removeError = () => {
    this.setState(() => ({
      error: false,
    }));
  };

  render() {
    const {
      locale,
      locale: { trans },
      doLogin,
    } = this.props;
    const { error } = this.state;
    return (
      <Card hoverable={false} clickable={false} hasShadow>
        <h1 style={{ textAlign: 'center' }}>{trans('Log In')}</h1>
        <Form error={error} onSubmit={values => doLogin(values)} locale={locale} removeError={() => this.removeError()} />
        <div>
          <Link to="/" style={{ float: 'right' }}>
            {`${trans('Forgot password')}?`}
          </Link>
        </div>
      </Card>
    );
  }
}

LoginWrapper.propTypes = {
  doLogin: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
};

export default ((LoginWrapper));
