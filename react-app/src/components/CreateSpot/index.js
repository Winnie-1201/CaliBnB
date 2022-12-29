import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import "./index.css";

function CreateSpot({ setCreateSpotModal, createSpotModal }) {
  const dispatch = useDispatch();

  const [nextStep, setNextStep] = useState(false);
  const [nextStepModal, setNextStepModal] = useState(false);
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const newErrors = {};

    // console.log("next step in useeffect", nextStep, !name);
    if (!address)
      newErrors.noAddress = "Please enter the address of your new spot.";
    if (!city) newErrors.noCity = "Please enter the city of your new spot.";
    if (!state) newErrors.noState = "Please choose the state of your new spot.";
    if (!country)
      newErrors.noCountry = "Please choose the country of your new spot.";
    if (!name) newErrors.noName = "Please enter the name of your new spot.";
    if (!type) newErrors.noType = "Please enter the type of your new spot.";
    if (name && name.length > 255)
      newErrors.longName = "The spot name you entered is too long.";

    setNextStep(false);
    setErrors(newErrors);
  }, [address, city, state, country, name, type]);

  const handleNextStep = (e) => {
    e.preventDefault();
    setNextStep(true);

    if (Object.values(errors).length === 0) {
      setNextStepModal(true);
      //   setCreateSpotModal(false);
    }
  };

  return (
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="login-header flex s-b center">
        <div className="header-left"></div>
        <div className="mlr-16">
          <h1 className="h1-inherit">Calibnb your home</h1>
        </div>
        <div className="header-right"></div>
      </div>
      <div className="p-24 cs-body">
        <div className="mtb-8-24">
          <h3 className="mb-8">Get started!</h3>
        </div>
        <form className="login-form">
          <div className="mt-16">
            {/* <div className="br relative"> */}
            <div className="flex-column cs-block">
              <label>Spot address</label>
              <input
                className="cs-text"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                //   required
                placeholder="Address"
              />
              {nextStep && errors.noAddress && (
                <div className="error-cs">* {errors.noAddress}</div>
              )}
            </div>
            <div className="flex-column cs-block">
              <label>City</label>
              <input
                className="cs-text"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                //   required
                placeholder="City"
              />
              {nextStep && errors.noCity && (
                <div className="error-cs">* {errors.noCity}</div>
              )}
            </div>
            <div className="flex-column cs-block">
              <label>State</label>
              <input
                className="cs-text"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                //   required
                placeholder="State"
              />
              {nextStep && errors.noState && (
                <div className="error-cs">* {errors.noState}</div>
              )}
            </div>
            <div className="flex-column cs-block">
              <label>Country</label>
              <input
                className="cs-text"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                //   required
                placeholder="Country"
              />
              {nextStep && errors.noCountry && (
                <div className="error-cs">* {errors.noCountry}</div>
              )}
            </div>
            <div className="flex-column cs-block">
              <label>Spot name</label>
              <input
                className="cs-text"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                //   required
                placeholder="Spot name"
              />
              {nextStep && errors.noName && (
                <div className="error-cs">* {errors.noName}</div>
              )}
            </div>
            <div className="flex-column cs-block">
              <label>Type</label>
              <input
                className="cs-text"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                //   required
                placeholder="Type (e.g. Entire home)"
              />
              {nextStep && errors.noType && (
                <div className="error-cs">* {errors.noType}</div>
              )}
            </div>
          </div>
          {/* </div> */}

          <div className="mtb-16-24">
            <div className="p-14-24" onClick={handleNextStep}>
              <span>Continue</span>
            </div>
          </div>
        </form>
        {nextStep && nextStepModal && (
          <>
            <Modal onClose={() => setNextStepModal(false)}>
              <NextStepForm setNextStepModal={setNextStepModal} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

function NextStepForm({ setNextStepModal }) {
  const [tags, setTags] = useState("");
  const [guests, setGuests] = useState();
  const [bedroom, setBedroom] = useState();
  const [beds, setBeds] = useState();
  const [bath, setBath] = useState();
  const [service, setService] = useState();
  const [clean, setClean] = useState();

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const newErros = {};
  });

  return (
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="login-header flex s-b center">
        <div className="header-left"></div>
        <div className="mlr-16">
          <h1 className="h1-inherit">Calibnb your home</h1>
        </div>
        <div className="header-right"></div>
      </div>
      <div className="p-24 login-body">
        <div className="mtb-8-24">
          <h3 className="mb-8">Continue</h3>
        </div>
        <form className="login-form">
          <div className="mt-16">
            <div className="br relative">
              <div className="flex input-box">
                <select
                  //   className="input-text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                >
                  <option value="" disabled>
                    Please select a tag
                  </option>
                  <option>Camping</option>
                  <option>Cabins</option>
                  <option>Amazing views</option>
                </select>
              </div>
              {/* {nextStep && errors.noAddress && (
                <div className="error-cs">{errors.noAddress}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Guests number"
                />
              </div>
              {/* {nextStep && errors.noCity && (
                <div className="error-cs">{errors.noCity}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                  placeholder="Bedroom(s)"
                />
              </div>
              {/* {nextStep && errors.noState && (
                <div className="error-cs">{errors.noState}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  //   required
                  placeholder="Bed(s)"
                />
              </div>
              {/* {nextStep && errors.noCountry && (
                <div className="error-cs">{errors.noCountry}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="number"
                  value={bath}
                  onChange={(e) => setBath(e.target.value)}
                  placeholder="Bath number"
                />
              </div>
              {/* {nextStep && errors.noName && (
                <div className="error-cs">{errors.noName}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="decimal"
                  value={clean}
                  onChange={(e) => setClean(e.target.value)}
                  placeholder="Clean fee (in %)"
                />
              </div>
              {/* {nextStep && errors.noType && (
                <div className="error-cs">{errors.noType}</div>
              )} */}
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="decimal"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Service fee (in %)"
                />
              </div>
            </div>
          </div>

          <div className="mtb-16-24">
            <div
              className="p-14-24"
              onClick={(e) => {
                e.preventDefault();
                // setCreateSpotModal(false);
                // setNextStep(true);
                setNextStepModal(false);
              }}
            >
              <span>Submit</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpot;
