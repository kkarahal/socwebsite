import peopleJson from '../data/json/people.json';
import publicationsJson from '../data/json/publications.json';


// Takes in name in format FirstName LastName or FirstName MiddleName LastName,
// and returns the name in format F. Lastname or F. M. LastName
function name_format_helper(name) {
  let name_split = name.split(" ")
  for (var i = 0; i < name_split.length; i++) {
    if (i !== name_split.length - 1) {
      name_split[i] = name_split[i][0] + "."
    }
  }
  return name_split.join(" ");
}

// Returns an array of author names that match the netIds given
// [PARAMS] netIds - the array of netIds to be matched
export function getMatchingAuthorNames(netIds){
  //console.log(netIds);
  const allAuthors = peopleJson.entries;
  const authorNames = netIds.map((netId) => {
    if (netId === "kkarahal"){
      return "K. Karahalios";
    }

    const matchingAuthor = allAuthors.find((author) => {
      return (author.netId === netId);
    });

    if (matchingAuthor){
      return name_format_helper(matchingAuthor.name);
    }

    return netId;
  });

  return authorNames.join(", ");
}

// returns an array of num most recent publications
// [PARAMS] num - number of most recent publications to return
//          publicationsJson - the json to find matching data from
export function getRecentPublications(num, publicationsJson){
  // get all publications
  // sort them by year 
  let publications = publicationsJson.entries;
  publications.sort((a, b) => b.year - a.year);
  return publications.slice(0, num);
}


// topics: array of strings
// OUTDATED - this function returns the UNION of publications
//            that contain one or more of the topics
export function getMatchingPubsByTopics(topics){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(publication){
      let hasMatch = 0;
      topics.forEach(function(topic){
        hasMatch += publication.topics.includes(topic);
      });
      return (hasMatch > 0);
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);

  return matchingPubs;
}

// topic: a string representing a topic, or "ALL" for all topics
// CURRENT - returns all publications that have this topic tagged,
//           or every publication in the json if topic === "ALL"
export function getMatchingPubsByTopic(topic){
  let allPublications = publicationsJson.entries;


  if (topic === "All"){
    return allPublications;
  }

  let matchingPubs = allPublications.filter(
    function(publication){
      const equalTopi = (topi) => topi.trim() === topic;
      if (publication.topics.some(equalTopi)) {
        return true;
      }
      return false;
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);

  return matchingPubs;
}
