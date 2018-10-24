import React from 'react';
import {
  InstantSearch, Hits, SearchBox,
  Highlight, RefinementList, Pagination,
  CurrentRefinements, ClearRefinements
} from 'react-instantsearch-dom';
import Post from './Post';
import { UserContext } from '../../App';

function Product({ hit }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <span className="hit-name">
        <UserContext.Consumer>
          {user => <Post postId={hit.objectID} post={hit} user={user} />}
        </UserContext.Consumer>
        {/* <Highlight attribute="title" hit={hit} />
        <Highlight attribute="content" hit={hit} /> */}
      </span>
    </div>
  );
}

function Search() {
  return (
    <div className="container">
      <CurrentRefinements />
      <ClearRefinements />
      <SearchBox />
      <RefinementList attribute="content" />
      <Hits hitComponent={Product} style={{flexDirection: "column"}}/>
      <Pagination />
    </div>
  );
}

function AlgoliaSearch() {
  return (
    <InstantSearch
      appId={process.env.REACT_APP_ALGOLIA_appId}
      apiKey={process.env.REACT_APP_ALGOLIA_searchOnlyApiKey}
      indexName="blog_posts"
    >
      <Search/>
    </InstantSearch>
  );
}

export default AlgoliaSearch;