import React from 'react';
import PropTypes from 'prop-types';
import {getMatchingAuthorNames} from '../../utils/utils.js';
import './Publication.scss';

export const Publication = (props) => {
  let authorList = getMatchingAuthorNames(props.authors);

  /*const handleTopicClick = (topicName) => {
    props.handleTopicClick(topicName);
  }*/ // uncomment if we ever want to reimplement clickable topics

  return(
    <div className="Publication">
      <div className="Info">
        <div className="Title"><a href={process.env.PUBLIC_URL + props.url}>{props.title}</a></div>
        	<div className="AuthConf">
              <div>{authorList}</div>
              <div className="Conference">{props.conference}</div>
        	</div>
        <div className="PubTopics">
          {props.topics.map(
             (topic, idx) => <span className="Topic Secondary"> {topic} </span>
          )}
        </div>
      </div>
      <div className="Description">{props.description}</div>
    </div>
  );
}


Publication.propTypes = {
  title: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  conference: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  awards: PropTypes.array,
  topics: PropTypes.array,
  handleTopicClick: PropTypes.func.isRequired
}
