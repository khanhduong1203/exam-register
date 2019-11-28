import React from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import WithLoading from '../../hoc/WithLoading';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

    onUpload = (file) => {
      if (file.current.files.length === 0) {
        message.error('Chọn file để nhập dữ liệu !');
      } else {
        this.props.onUpload(file);
      }
    };

    render() {
      return (
        <div>
          <input type="file" ref={this.fileUpload} />
          <Button onClick={() => this.onUpload(this.fileUpload)}>
                    Thêm dữ liệu từ File
          </Button>
        </div>
      );
    }
}

UploadForm.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default WithLoading(UploadForm);
