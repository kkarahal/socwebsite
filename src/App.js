import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.scss';

import pagesJson from './data/json/pages.json';
import homeJson from './data/json/home.json';
import coursesJson from './data/json/courses.json';
import peopleJson from './data/json/people.json';
import publicationsJson from './data/json/publications.json';
import otherGroupsJson from './data/json/other_groups.json';
import {getRecentPublications} from './utils/utils.js'

import { ListPage } from './containers/ListContainers';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
/**
 * App - contains everything. Wraps a NavBar and a page contents.
 *
 * [STATE] currentPage - The page being displayed. "Home" by default.
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: "Home"
    };
    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(pageName){
    this.setState({
      currentPage: pageName
    });
  }

  render(){

    return(
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <NavBar json={pagesJson} loadPage={this.goToPage}/>
          <Switch>
      	    <Route exact path="/">
                  <HomePage />
      	    </Route>
      	    <Route exact path="/Home">
                  <HomePage />
      	    </Route>
            <Route exact path="/People">
                  <ListPage json={peopleJson} pageType = "People"/>
      	    </Route>
      	    <Route exact path="/Publications">
                  <ListPage json={publicationsJson} pageType = "Publications"/>
      	    </Route>
            <Route exact path="/Courses">
                  <ListPage json={coursesJson} pageType = "Courses"/>
      	    </Route>
            <Route exact path="/Others">
                  <ListPage json={otherGroupsJson} pageType = "Others"/>
            </Route>
    	    </Switch>
    	  </Router>
      </div>
    );
  }

}


/**
 * NavBar - the navigation bar at the top of the page.
 *          https://react-bootstrap.github.io/components/navbar/
 *
 * [PROPS] loadPage - function that passes page clicked to App
 */
class NavBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isMobile: false,
      isOpen: false,
      currentPage: null
    };

  }

  handleClick(pageName){
    this.props.loadPage(pageName);
    let newState = {...this.state};
    newState.currentPage = pageName;
    this.setState(newState);
  }

  handleWindowSizeChange = () => {
    let newState = {...this.state};
    if (window.innerWidth < 760){ // tentative width for mobile cutoff
      newState.isMobile = true;
    } else {
      newState.isMobile = false;
    }
    this.setState(newState);
  }

  toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
  }

  componentDidMount(){
    this.handleWindowSizeChange();
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  render(){
    let pagesArray = pagesJson.pages;
    let pages = pagesArray.map(
      (page) => <NavOption
                  highlight={page.extension === this.state.currentPage}
                  key={pagesArray.indexOf(page)}
                  title={page.title}
	                extension={page.extension}
                  onClick={this.handleClick}
                />
    );

    let mobileNav = 
    <div>
      <div className="MobileNav">
          <img 
            src={process.env.PUBLIC_URL +"/images/hamburger_icon.svg"}
            alt=""
            onClick={this.toggle}
          />
          <span>
            {pages[0]}
          </span>
          <div className={`MobileNavLinks${this.state.isOpen ? " Open" : ""}`}>
            {
              this.state.isOpen

              ?

              <div>
                {pages.slice(1, pages.length).map(
                  (page, idx) => <div key={idx}>{page}</div>
                )}
              </div>

              :
              
              <span></span> 
            }
          </div>
      </div>
    </div>;

    return(
      <div className="NavBar">
          {this.state.isMobile ? mobileNav : pages}
      </div>
    );

  }
}


/**
 * NavOption - one of the links in the navigation bar.
 *
 * [PROPS] onClick - function to be called when clicked.
 *         title - the title of the page it links to
 */
class NavOption extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick(this.props.extension);
  }

  render(){
    return(
      <Link to={"/" + this.props.extension}>
        <span 
          onClick={this.handleClick} 
          className={`NavOption${this.props.highlight ? " active" : ""}`}
          id={this.props.extension}
        >
          {this.props.title}
        </span>
      </Link>
    );
  }

}


/*****************************************************************************************************************

                                            INDIVIDUAL PAGES

*****************************************************************************************************************/


/* HomePage - The home page of the social spaces website.
 *
 * [PROPS]
 */
class HomePage extends Component {
  render(){

    let goalsList = homeJson.goals.map((goal, idx) => 
      <li key={idx} className="Goal">{goal}</li>
    );

    let recentPubs = getRecentPublications(3, publicationsJson);
    let pubList = recentPubs.map((pub, idx) => 
      <div className={"PubCard"} key={idx}>
        <a href={pub.url}>{pub.title}</a>
        <p>{pub.conference}</p>
      </div>
    );

    return(
      <div className="Home" style={{
	      backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/home_lighter.png)'
      }}>
        <div className="HomeImage">
          <div className="Statement">
            <h1>Welcome to Social Spaces</h1>
            <p>{homeJson.statement}</p>
            <div>{goalsList}</div>
          </div> 
        </div>
        <div className="WhatsNew">
          <h2>What's New</h2>
          <div className="HomePubList">{pubList}</div>
        </div>
        <p className="Caption">
          Image: A protest in Urbana, July 2020. Illust. Joon Park
        </p>
      </div>

    );
  }
}


export default App;
