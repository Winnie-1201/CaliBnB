import React from "react";
import "./index.css";

function PartTwo({ spot }) {
  return (
    <div className="max-width">
      <div className="flex">
        <div className="mlr-0-left relative">
          <div className="block-container">
            <div className="ptb-48-24">
              <section>
                <div className="flex">
                  <div className="flex-0-1">
                    <div className="mb-8-house">
                      <h2 className="mb-8-text">
                        Hosted by {spot.owner.firstName}
                      </h2>
                    </div>
                    <ol className="ol">
                      <li className="inline-block">
                        <span>
                          {spot.guests}
                          {spot.guests > 1 ? " guests" : " guest"}
                        </span>
                      </li>
                      <li className="inline-block pl-3">
                        <span>
                          <span> · </span>
                        </span>
                        <span>
                          {spot.bedroom}
                          {spot.bedroom > 1 ? " bedrooms" : " bedroom"}
                        </span>
                      </li>
                      <li className="inline-block pl-3">
                        <span>
                          <span> · </span>
                        </span>
                        <span>
                          {spot.beds}
                          {spot.beds > 1 ? " bedss" : " beds"}
                        </span>
                      </li>
                      <li className="inline-block pl-3">
                        <span>
                          <span> · </span>
                        </span>
                        <span>
                          {spot.bath}
                          {spot.bath > 1 ? " bath" : " bath"}
                        </span>
                      </li>
                    </ol>
                  </div>
                  <div className="ml-16">
                    <div className="wh-56">
                      <div className="wh-100-img">
                        <img
                          className="img-size-host"
                          src={spot.owner.icon}
                          alt="host icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="block-container">
            <div className="ptb-32">
              <div className="flex mb-24">
                <div className="mw-24">
                  <svg
                    className="svg-spotdetail"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 26 2 a 1 1 0 0 1 0.922 0.612 l 0.04 0.113 l 2 7 a 1 1 0 0 1 -0.847 1.269 L 28 11 h -3 v 5 h 6 v 2 h -2 v 13 h -2 l 0.001 -2.536 a 3.976 3.976 0 0 1 -1.73 0.527 L 25 29 H 7 a 3.982 3.982 0 0 1 -2 -0.535 V 31 H 3 V 18 H 1 v -2 h 5 v -4 a 1 1 0 0 1 0.883 -0.993 L 7 11 h 0.238 L 6.086 8.406 l 1.828 -0.812 L 9.427 11 H 12 a 1 1 0 0 1 0.993 0.883 L 13 12 v 4 h 10 v -5 h -3 a 1 1 0 0 1 -0.987 -1.162 l 0.025 -0.113 l 2 -7 a 1 1 0 0 1 0.842 -0.718 L 22 2 h 4 Z m 1 16 H 5 v 7 a 2 2 0 0 0 1.697 1.977 l 0.154 0.018 L 7 27 h 18 a 2 2 0 0 0 1.995 -1.85 L 27 25 v -7 Z m -16 -5 H 8 v 3 h 3 v -3 Z m 14.245 -9 h -2.491 l -1.429 5 h 5.349 l -1.429 -5 Z"></path>
                  </svg>
                </div>
                <div className="ml-16">
                  <div className="text-16">Dedicated workspace</div>
                  <div className="text-14">
                    A private room with wifi that's well-suited for working.
                  </div>
                </div>
              </div>
              <div className="flex mb-24">
                <div className="mw-24">
                  <svg
                    className="svg-spotdetail"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m 24.3334 1.66675 c 1.05437 0 1.91817 0.815871 1.99451 1.85074 l 0.0054857 0.149263 l -0.00065 24.666 l 3.00065 0.00075 v 2 h -26.6667 v -2 l 3 -0.00075 v -24.666 c 0 -1.05437 0.815873 -1.91817 1.85074 -1.99451 l 0.149263 -0.00548571 Z m -4.00065 2 h -12.666 l -0.00075 24.6663 l 12.6667 -0.00025 Z m 4.00065 0 h -2.00065 v 24.666 l 2.00025 0.00025 Z m -7.0001 11 c 0.736378 0 1.33333 0.596952 1.33333 1.33333 s -0.596952 1.33333 -1.33333 1.33333 s -1.33333 -0.596952 -1.33333 -1.33333 s 0.596952 -1.33333 1.33333 -1.33333 Z"></path>
                  </svg>
                </div>
                <div className="ml-16">
                  <div className="text-16">Self check-in</div>
                  <div className="text-14">
                    Check yourself in with the lockbox.
                  </div>
                </div>
              </div>
              <div className="flex mb-0">
                <div className="mw-24">
                  <svg
                    className="svg-spotdetail"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m 11.6667 0 l -0.00095 1.666 h 8.667 l 0.00055 -1.666 h 2 l -0.00055 1.666 l 6.00065 0.00063 c 1.05437 0 1.91817 0.815871 1.99451 1.85074 l 0.0054857 0.149263 v 15.9191 c 0 0.47157 -0.166444 0.925866 -0.466903 1.28447 l -0.11889 0.129831 l -8.74769 8.74769 c -0.33343 0.333253 -0.77231 0.536756 -1.2382 0.577865 l -0.175821 0.0077398 h -12.9192 c -2.68874 0 -4.88182 -2.12233 -4.99538 -4.78311 l -0.00461954 -0.216888 v -21.6667 c 0 -1.05436 0.815876 -1.91816 1.85074 -1.9945 l 0.149263 -0.00548569 l 5.999 -0.00063 l 0.00095 -1.666 Z m 16.666 11.666 h -24.666 v 13.6673 c 0 1.59766 1.24893 2.90366 2.82373 2.99491 l 0.176271 0.0050928 l 10.999 -0.0003 l 0.00095 -5.6664 c 0 -2.68874 2.12236 -4.88182 4.78321 -4.99538 l 0.216893 -0.0046196 l 5.66595 -0.0006 Z m -0.081 8 l -5.58495 0.0006 c -1.59773 0 -2.90376 1.24895 -2.99501 2.82373 l -0.0050929 0.17627 l -0.00095 5.5864 Z m -18.586 -16 l -5.999 0.00062 v 5.99938 h 24.666 l 0.00065 -5.99938 l -6.00065 -0.00062 l 0.00055 1.66733 h -2 l -0.00055 -1.66733 h -8.667 l 0.00095 1.66733 h -2 Z"></path>
                  </svg>
                </div>
                <div className="ml-16">
                  <div className="text-16">
                    Free cancellation before "a specific date" (change later)
                  </div>
                  <div className="text-14"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-container">
            <div className="ptb-32">
              <section>
                <div className="flex mb-16">
                  <h2 className="bir">bir</h2>
                  <h2 className="cover">cover</h2>
                </div>
                <div className="mb-16">
                  Every booking includes free protection from Host
                  cancellations, listing inaccuracies, and other issues like
                  trouble checking in.
                </div>
                <button className="showmore-button">
                  Show more (change later)
                </button>
              </section>
            </div>
          </div>
          <div className="block-container not-sure-yet">
            Where you'll sleep block
          </div>
          <div className="block-container not-sure-yet">
            what this place offers block
          </div>
          <div className="block-container">
            <div className="ptm-48">
              <div>
                <div className="calender-header">
                  <div className="stay-nights">
                    <h2 className="block-header-h2">? nights in {spot.city}</h2>
                  </div>
                  <div className="stay-dates pt-8">
                    <div className="ava-date">first few avaliable dates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-container"></div>
        </div>
        <div className="mr-0-right retative"></div>
      </div>
    </div>
  );
}

export default PartTwo;
