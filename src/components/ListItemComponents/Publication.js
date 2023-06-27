import React from 'react';
import PropTypes from 'prop-types';
import {getMatchingAuthorNames} from '../../utils/utils.js';
import './Publication.scss';

// pdf icon by https://www.flaticon.com/authors/good-ware

export const Publication = (props) => {
  let authorList = getMatchingAuthorNames(props.authors);

  // check if paper is stored locally or on web
  let paper_loc = null;
  if (props.url.includes("https://") || props.url.includes("http://")) {
    paper_loc = props.url;
  } else {
    paper_loc = process.env.PUBLIC_URL + props.url;
  }

  /*const handleTopicClick = (topicName) => {
    props.handleTopicClick(topicName);
  }*/ // uncomment if we ever want to reimplement clickable topics

  return(
    <div className="Publication">
      <div className="Info">
        <div className="Title">{props.title}</div>
        	<div className="AuthConf">
              <div className="Authors">{authorList}</div>
              <div className="Conference">{props.conference}</div>
        	</div>
        <div className="PubTopics">
          {props.topics.map(
             (topic, idx) => 
              <span className="Topic Secondary" key={`topic-${idx}`}> {topic} </span>
          )}
        </div>
      </div>
      <div className="Description">
        <a download href={paper_loc} type="application/pdf">
          <img src={process.env.PUBLIC_URL + "/images/pdf.png"} alt="" className="PdfIcon"/>
        </a><br/>
      </div>
    </div>
  );
}

       /* {props.description}*/

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
