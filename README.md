# How can I update my website profile?
To update your profile on the **People** page, you can do so by editing `socwebsite/src/data/json/people.json`.

# How do I add a new publication to the website?
To add a paper to the website, you first need to add the file to your folder in `socwebsite/public`. Next, you will need to add an entry to `socwebsite/src/data/json/publications.json`. When creating the entry, the `url` field should be `/papers/[your-netid]/[paper-file]` (this is the path to the paper file once the website is built).

# Where is our website hosted?
Our website is hosted on [cPanel](https://web.illinois.edu/), a web hosting service provided by the university.
