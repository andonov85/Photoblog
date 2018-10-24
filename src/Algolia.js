// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
import * as algoliasearch from 'algoliasearch'; // When using TypeScript

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

const APP_ID = process.env.REACT_APP_ALGOLIA_appId;
const SEARCH_ONLY_API_KEY = process.env.REACT_APP_ALGOLIA_searchOnlyApiKey;

const client = algoliasearch(APP_ID, SEARCH_ONLY_API_KEY);
const index = client.initIndex('blog_posts');

function asearch(query) {
	return new Promise((resolve) => {
		index.search(
			{
				query: query,
				// attributesToRetrieve: ['firstname', 'lastname'],
				hitsPerPage: 50,
			},
			function searchDone(err, content) {
				if (err) throw err;
				resolve(content);
			}
		);
	});
}

export default asearch;