import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction, currentIsFetched } from '../actions/imageAction';
import { incrementComment, decrementComment } from '../actions/likeAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentWillMount() {
    this.fetchCurrentComments();
    this.props.urlAction('comments');
  }

  fetchCurrentComments() {
    const { postId } = this.props.params;
    this.props.currentPhotoAction(postId);
    this.setState({
      comment: ''
    });
  }

  componentWillUnmount() {
    this.props.currentIsFetched(false);
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.comment.length === 0) {
      return;
    }
    const { postId } = this.props.params;
    const { index } = this.props.params;
    this.props.incrementComment(postId, { text: this.state.comment }, index, () => {
      this.fetchCurrentComments();
    });
  }
  
  handleRemoveComment(index, commentId) {
    this.props.decrementComment(index, commentId, ()=> {
      this.fetchCurrentComments();
    });
  }

  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
      let isUsersComment = this.props.photoArray[this.props.params.index].profile_id === comment.profile_id; 
      const firstName = comment.username ? comment.username.split(' ')[0] : '';
      const photo = comment.profile_photo ? comment.profile_photo : 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg';
      return (
        <li className="comments-li" key={i}> 
          <div>
            <img src={photo} className="comments-icon"/>
            <span className="comment-combined">
              <strong> { firstName } </strong> &nbsp;
              { comment.text } 
              { isUsersComment ? <button className='deleteComments' onClick={ this.handleRemoveComment.bind(this, i, comment.comment_id)}> &times; </button> : ''}
            </span>           
          </div>
        </li>
      );
    });

    const { isFetched } = this.props;

    if (!isFetched) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="comments-component">
          <div>
            <ul className="comments-Ul">
              { comments }
            </ul>
          </div>
          <form role="form" onSubmit={this.handleSubmit.bind(this)}className="comments-form">
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control input-lg" placeholder="Write a comment..." value={this.state.comment} onChange={this.handleChange.bind(this)}/>
                  <span className="input-group-btn">
                    <button className="btn btn-default btn-lg" type="submit" onClick={this.handleSubmit.bind(this)}>Send</button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    currentPhoto: state.currentPhoto.current,
    isFetched: state.currentPhoto.isFetched,
    url: state.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, incrementComment, decrementComment, currentIsFetched, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
