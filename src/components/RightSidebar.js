import Searchbar from "./Searchbar"

function RightSidebar({ tweets, setSearchTerm }) {
  return (
    <div>
      <Searchbar tweets={tweets} setSearchTerm={setSearchTerm} />
      <div className="layout__right-sidebar-container">
        <div className="layout__right-sidebar">
          <div className="trends-for-you">
            <div className="trends-for-you__element">
              <div className="trends-for-you__heading">Trends for you</div>
            </div>
            <div className="trends-for-you__element">
              <div className="trends-for-you__meta-information">
                Trending in US
              </div>
              <div className="trends-for-you__trend-name">#Runeterra MMO</div>
              <div className="trends-for-you__meta-information">
                2.1B tweets
              </div>
            </div>
            <div className="trends-for-you__element">
              <div className="trends-for-you__meta-information">
                Trending - Trending
              </div>
              <div className="trends-for-you__trend-name">#ProjectL</div>
              <div className="trends-for-you__meta-information">
                340k Tweets
              </div>
            </div>
            <div className="trends-for-you__element">
              <div className="trends-for-you__meta-information">
                Trending in US
              </div>
              <div className="trends-for-you__trend-name">
                Cute cat brothers
              </div>
              <div className="trends-for-you__meta-information">
                712M Tweets
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
