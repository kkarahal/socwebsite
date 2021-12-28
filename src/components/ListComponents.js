import React from 'react';
import PropTypes from 'prop-types';

import { Person } from './ListItemComponents/Person';
import { Alumni } from './ListItemComponents/Alumni';
import { Publication } from './ListItemComponents/Publication';
import { Course } from './ListItemComponents/Course';

import Grid from '@material-ui/core/Grid';


export const PeopleList = (props) => {

  let people = props.json.entries;
  let currentPeople;
  let alumniPeople;
  currentPeople = people.filter(list => {
    return list.status.toLowerCase() === "current student";
  });
  alumniPeople = people.filter(list => {
    return list.status.toLowerCase() === "alumni";
  });

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8}>

       <div className="StudentList">Faculty</div>
       <Grid container className="Person" justify="flex-start" spacing={8}>
          <Grid item>
          <div className="ImageContainer">
            <img className="Image" alt="Karrie Karahalios" src="http://social.cs.uiuc.edu/people/images/people%20pics/karrie.jpg" />
          </div>
          </Grid>
          <Grid item container xs={8} spacing={8} justify="flex-start" direction="column">
            <Grid item>
              <div className="Name">Karrie Karahalios</div>
            </Grid>
            <Grid item>
              <div className="FacultyRole">Professor of Computer Science</div>
            </Grid>

            <Grid container className="FacultyContact" justify="flex-start" spacing={8}>
              <Grid container justify="flex-start" direction="column">
                <Grid item>
                  <div className="label">Email</div>
                </Grid>
                <Grid item>
                  <div className="label">Phone</div>
                </Grid>
                <Grid item>
                  <div className="label">Address</div>
                </Grid>
              </Grid>
              <Grid container className="info" justify="flex-start" direction="column">
                <Grid item>
                  <div>kkarahal@illinois.edu</div>
                </Grid>
                <Grid item>
                  <div>1 217 265 6841</div>
                </Grid>
                <Grid item>
                  <div className="FacultyAddress">
                    <div>4228 Siebel Center</div>
                    <div>201 N. Goodwin Avenue</div>
                    <div>Urbana, Illinois 61801</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
       </Grid>

       <div className="StudentList">Current Students</div>
        <Grid container className="People" justify="flex-start" spacing={16}>
          {currentPeople.map(person => (
            <Grid key={people.indexOf(person)} item xs={12} sm={6}>
              <Person
                name={person.name}
		researchDesc = {person.researchDesc}
                pageUrl={person.pageUrl}
                photoUrl={person.photoUrl}
                status={person.status}
                degree={person.degree}
              />
            </Grid>
          ))}
        </Grid>

        <div className="StudentList">Alumni</div>
        <Grid container className="People" justify="flex-start" spacing={16}>
          {alumniPeople.map(person => (
            <Grid key={people.indexOf(person)} item lg={2}>
              <Alumni
                name={person.name}
                pageUrl={person.pageUrl}
                photoUrl={person.photoUrl}
                status={person.status}
                degree={person.degree}
                currentRole={person.currentRole}
                gradYear={parseInt(person.gradYear, 10)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );

}

PeopleList.propTypes = {
  json: PropTypes.object.isRequired
};


export const PublicationList = (props) => {

  const handleTopicClick = (topicName) => {
    props.handleTopicClick(topicName);
  }

  return(
      <div className="PublicationList">
        {props.publications.map(
          (publication) => <li key={props.publications.indexOf(publication)}>
                        <Publication
                          title={publication.title}
                          description={publication.description}
                          year={publication.year}
                          conference={publication.conference}
                          url={publication.url}
                          authors={publication.authorIds}
                          awards={publication.awards}
                          topics={publication.topics}
                          handleTopicClick={handleTopicClick}
                        />
                     </li>
        )}
      </div>
  );

}

PublicationList.propTypes = {
  publications: PropTypes.array.isRequired,
  displayTopic: PropTypes.string,
  handleTopicClick: PropTypes.func.isRequired
};


export const CourseList = (props) => {
  let courses = props.json.entries;

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>
      {courses.map(
        (course) => <li key={courses.indexOf(course)}>
                      <Course
                        title={course.title}
                        schedule={course.schedule}
                        abbrev={course.abbrev}
                        url={course.url}
                        description={course.description}
                        prior_versions={course.prior_versions}
                      />
                   </li>
      )}
      </Grid>
    </Grid>
  );
}

CourseList.propTypes = {
  json: PropTypes.object.isRequired
};


export const GroupList = (props) => {
  let groups = props.json.entries;

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={8} md={8} lg={6}>
      {groups.map(
        (group, idx) => <li key={`group-${idx}`}>
                      {
                        group.url
                        ?
                        <a href={group.url}>{group.name}</a>
                        :
                        <span>{group.name}</span>
                      }
                   </li>
      )}
      </Grid>
    </Grid>
  );
}

GroupList.propTypes = {
  json: PropTypes.object.isRequired
};
