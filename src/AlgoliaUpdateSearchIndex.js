import algoliasearch from 'algoliasearch';

const ALGOLIA_ID = process.env.REACT_APP_ALGOLIA_appId;
const ALGOLIA_ADMIN_KEY = process.env.REACT_APP_ALGOLIA_adminApiKey;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const ALGOLIA_INDEX_NAME = 'blog_posts';

// Update the search index.
function AlgoliaUpdateSearchIndex(post) {
		// Write to the algolia index
		const index = client.initIndex(ALGOLIA_INDEX_NAME);
		return index.addObject(post, function(err, content) {
			if (err) console.log(err);
			console.log(content);
		  });
}

export { AlgoliaUpdateSearchIndex };