import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addImageThunk, createSpotThunk } from "../../../store/spots";
import Header from "../../Homepage/Header";
import "./index.css";

function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const [guests, setGuests] = useState();
  const [bedroom, setBedroom] = useState();
  const [beds, setBeds] = useState();
  const [bath, setBath] = useState();
  const [service_fee, setservice_fee] = useState();
  const [clean_fee, setclean_fee] = useState();
  const [price, setPrice] = useState();
  const [preview_img, setPreviewImg] = useState("");

  const [images, setImages] = useState({});

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
    if (!tags) newErrors.noTags = "Please select the tag of your new spot.";
    if (!guests)
      newErrors.noGuests =
        "Please enter the the maximum number of guests of your new spot.";
    if (!bedroom)
      newErrors.noBedroom =
        "Please enter the the number of bedroom in your new spot.";
    if (!beds)
      newErrors.noBeds = "Please enter the number of beds in your new spot.";
    if (!bath)
      newErrors.noBath = "Please enter the number of baths in your new spot.";
    if (!price)
      newErrors.noPrice = "Please enter the price of your spot per night.";
    if (!service_fee)
      newErrors.noservice_fee =
        "Please enter the service fee of your new spot.";
    if (!clean_fee)
      newErrors.noclean_fee = "Please enter the cleaning fee of your new spot.";
    if (!preview_img)
      newErrors.noPreviewImg = "Please choose the preview image for your spot.";
    if (name && name.length > 255)
      newErrors.longName = "The spot name you entered is too long.";

    if (images && Object.values(images).length < 4)
      newErrors.shortImage =
        "Please upload a preview image and at least 4 other images for your spot.";

    // setNextStep(false);
    setSubmit(false);
    setErrors(newErrors);
  }, [
    address,
    city,
    state,
    country,
    name,
    type,
    tags,
    guests,
    bedroom,
    beds,
    bath,
    service_fee,
    clean_fee,
    price,
    preview_img,
    images,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);
    const spotData = {
      address,
      city,
      state,
      country,
      name,
      price,
      tags,
      type,
      guests,
      bedroom,
      beds,
      bath,
      clean_fee,
      service_fee,
    };

    if (Object.values(errors).length === 0) {
      const newSpot = await dispatch(createSpotThunk(spotData));

      if (newSpot) {
        await dispatch(addImageThunk(newSpot.id, preview_img, true)); // [promise fullfilled]

        let promise_arr = [];

        img_coll.forEach((img) => {
          promise_arr.push(dispatch(addImageThunk(newSpot.id, img, false)));
        });

        Promise.all(promise_arr).then(() =>
          history.push(`/spots/${newSpot.id}`)
        );
      }
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setPreviewImg(file);

    const image = document.getElementById("preview-img");
    image.src = URL.createObjectURL(file);
  };

  const updateImages = (e, id) => {
    const file = e.target.files[0];

    const obj = {};
    obj[id] = file;
    setImages({ ...images, ...obj });
  };

  let img_coll = Object.values(images);

  const total =
    Number(price) +
    Math.round((price * service_fee) / 100) +
    Math.round((price * clean_fee) / 100);

  // console.log("preview image outside", preview_img);

  return (
    <>
      <Header />
      <div className="cs-container plr-40">
        <div className="cs-body flex-column">
          <div className="cs-imgs-container flex-column">
            <div className="cs-imgs-header flex center">
              <h3 className="cs-ih-h3">* Upload your spot images</h3>
              {submit && errors.shortImage && (
                <div className="error-cs">* {errors.shortImage}</div>
              )}
            </div>
            <div className="cs-imgs-body flex">
              <div className="flex-column s-b">
                <div className="cs-preview-img-box">
                  <img
                    id="preview-img"
                    alt="preview image"
                    className={`${
                      preview_img ? "cs-preview-img" : "no-preview-img"
                    }`}
                    hidden={preview_img ? false : true}
                  />
                  <div className={`${preview_img ? "" : "img-box"}`}></div>
                </div>
                <input
                  className="cs-preview-img-content"
                  type="file"
                  accept="image/*"
                  onChange={updateImage}
                />
                {submit && errors.noPreviewImg && (
                  <div className="error-cs">* {errors.noPreviewImg}</div>
                )}
              </div>
              <div className="cs-other-imgs flex">
                <div className="cs-imgs-block flex-column s-b">
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length > 0 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[0])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 1)}
                    />
                  </div>
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length > 5 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[4])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 5)}
                    />
                  </div>
                  {/* <div className="cs-imgs-one">
                    <i className="fa-solid fa-folder-plus" />
                  </div>
                  <div className="cs-imgs-one">
                    <i className="fa-solid fa-folder-plus" />
                  </div> */}
                </div>
                <div className="cs-imgs-block flex-column s-b">
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length > 1 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[1])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 2)}
                    />
                  </div>
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length >= 6 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[5])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 6)}
                    />
                  </div>
                </div>
                <div className="cs-imgs-block flex-column s-b">
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length >= 3 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[2])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 3)}
                    />
                  </div>
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length >= 7 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[6])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 7)}
                    />
                  </div>
                </div>
                <div className="cs-imgs-block flex-column s-b">
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length >= 4 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[3])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 4)}
                    />
                  </div>
                  <div className="cs-imgs-one flex-column">
                    {img_coll.length >= 8 ? (
                      <img
                        // id="images-1"
                        src={URL.createObjectURL(img_coll[7])}
                        alt="spot image"
                        className="image-uploaded"
                      />
                    ) : (
                      <div className="cs-imgs-one-box">
                        <i className="fa-solid fa-folder-plus" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="cs-imgs-one-input"
                      onChange={(e) => updateImages(e, 8)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-detail-container flex-column">
            <div className="cs-detail-header">
              <h3 className="cs-ih-h3">Spot information</h3>
            </div>
            <div className="cs-detail-body flex-column">
              <div className="cs-detail-top">
                <div className="cs-dt-block">
                  <div className="cs-dt-name flex-column w-45 mrb-40-20">
                    <label className="cs-detail-label">Spot name</label>
                    <input
                      type="text"
                      className="p-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {submit && errors.noName && (
                      <div className="error-cs">* {errors.noName}</div>
                    )}
                  </div>
                  <div className="cs-dt-type flex-column w-35 mrb-40-20">
                    <label className="cs-detail-label">
                      Spot type (i.e. Entire Home)
                    </label>
                    <input
                      type="text"
                      className="p-10"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                    {submit && errors.noType && (
                      <div className="error-cs">* {errors.noType}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="cs-detail-mid">
                <div className="cs-dm-block">
                  <div className="cs-dm-address flex-column w-60 mrb-40-20">
                    <label className="cs-detail-label">Address</label>
                    <input
                      type="text"
                      className="p-10"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {submit && errors.noAddress && (
                      <div className="error-cs">* {errors.noAddress}</div>
                    )}
                  </div>
                  <div className="cs-dm-city flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">City</label>
                    <input
                      type="text"
                      className="p-10"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {submit && errors.noCity && (
                      <div className="error-cs">* {errors.noCity}</div>
                    )}
                  </div>
                  <div className="cs-dm-state flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">State</label>
                    <select
                      className="p-6"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="" disable="true">
                        Please select the state
                      </option>
                      <option>California</option>
                    </select>
                    {submit && errors.noState && (
                      <div className="error-cs">* {errors.noState}</div>
                    )}
                  </div>
                  <div className="cs-dm-country flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Country</label>
                    <select
                      className="p-6"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="" disable="true">
                        Please select the country
                      </option>
                      <option>United States</option>
                    </select>
                    {submit && errors.noCountry && (
                      <div className="error-cs">* {errors.noCountry}</div>
                    )}
                    {/* <input type="text" /> */}
                  </div>
                </div>
              </div>
              <div className="cs-detail-bottom">
                <div className="cs-db-block">
                  <div className="cs-db-guests flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Guests number</label>
                    <input
                      type="number"
                      className="p-10"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    />
                    {submit && errors.noGuests && (
                      <div className="error-cs">* {errors.noGuests}</div>
                    )}
                  </div>
                  <div className="cs-db-beds flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Bed number</label>
                    <input
                      type="number"
                      className="p-10"
                      min="1"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                    />
                    {submit && errors.noBeds && (
                      <div className="error-cs">* {errors.noBeds}</div>
                    )}
                  </div>
                  <div className="cs-db-bedroom flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Bedroom number</label>
                    <input
                      type="number"
                      className="p-10"
                      min="1"
                      value={bedroom}
                      onChange={(e) => setBedroom(e.target.value)}
                    />
                    {submit && errors.noBedroom && (
                      <div className="error-cs">* {errors.noBedroom}</div>
                    )}
                  </div>
                  <div className="cs-db-bath flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Bath number</label>
                    <input
                      type="number"
                      className="p-10"
                      value={bath}
                      onChange={(e) => setBath(e.target.value)}
                    />
                    {submit && errors.noBath && (
                      <div className="error-cs">* {errors.noBath}</div>
                    )}
                  </div>
                  <div className="cs-db-tags flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">Tags</label>
                    <select
                      className="p-6"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    >
                      <option value="" disable="true">
                        Please select one tag
                      </option>
                      <option>camping</option>
                      <option>cabins</option>
                      <option>amazing views</option>
                    </select>
                    {submit && errors.noTags && (
                      <div className="error-cs">* {errors.noTags}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-price-container">
            <div className="cs-price-header">
              <h3 className="cs-ih-h3">Price detail</h3>
            </div>
            <div className="cs-price-box">
              <div className="cs-price-body flex-column">
                <div className="cs-pb-top flex">
                  <div className="cs-pb-price flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">
                      Price per night ($)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="p-10"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {submit && errors.noPrice && (
                      <div className="error-cs">* {errors.noPrice}</div>
                    )}
                  </div>
                  <div className="cs-pb-service_fee flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">
                      service_fee fee (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="p-10"
                      value={service_fee}
                      onChange={(e) => setservice_fee(e.target.value)}
                    />
                    {submit && errors.noservice_fee && (
                      <div className="error-cs">* {errors.noservice_fee}</div>
                    )}
                  </div>
                  <div className="cs-pb-clean_fee flex-column w-20 mrb-40-20">
                    <label className="cs-detail-label">clean_fee fee (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="p-10"
                      value={clean_fee}
                      onChange={(e) => setclean_fee(e.target.value)}
                    />
                    {submit && errors.noclean_fee && (
                      <div className="error-cs">* {errors.noclean_fee}</div>
                    )}
                  </div>
                </div>
                <div className="cs-pb-bottom">
                  <div className="cs-pb-total">
                    <h2 className="cs-pb-total-text">
                      Total before tax per night :{" "}
                      <span>
                        $ {price && service_fee && clean_fee ? total : ""}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-button-container">
            <button className="cs-button" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="flex-column login-form">
  //     <div className="x"></div>
  //     <div className="login-header flex s-b center">
  //       <div className="header-left"></div>
  //       <div className="mlr-16">
  //         <h1 className="h1-inherit">Calibnb your home</h1>
  //       </div>
  //       <div className="header-right"></div>
  //     </div>
  //     <div className="p-24 cs-body">
  //       <div className="mtb-8-24">
  //         <h3 className="mb-8">Get started!</h3>
  //       </div>
  //       <form className="login-form">
  //         <div className="mt-16">
  //           {/* <div className="br relative"> */}
  //           <div className="flex-column cs-block">
  //             <label>Spot address</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={address}
  //               onChange={(e) => setAddress(e.target.value)}
  //               //   required
  //               placeholder="Address"
  //             />
  //             {nextStep && errors.noAddress && (
  //               <div className="error-cs">* {errors.noAddress}</div>
  //             )}
  //           </div>
  //           <div className="flex-column cs-block">
  //             <label>City</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={city}
  //               onChange={(e) => setCity(e.target.value)}
  //               //   required
  //               placeholder="City"
  //             />
  //             {nextStep && errors.noCity && (
  //               <div className="error-cs">* {errors.noCity}</div>
  //             )}
  //           </div>
  //           <div className="flex-column cs-block">
  //             <label>State</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={state}
  //               onChange={(e) => setState(e.target.value)}
  //               //   required
  //               placeholder="State"
  //             />
  //             {nextStep && errors.noState && (
  //               <div className="error-cs">* {errors.noState}</div>
  //             )}
  //           </div>
  //           <div className="flex-column cs-block">
  //             <label>Country</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={country}
  //               onChange={(e) => setCountry(e.target.value)}
  //               //   required
  //               placeholder="Country"
  //             />
  //             {nextStep && errors.noCountry && (
  //               <div className="error-cs">* {errors.noCountry}</div>
  //             )}
  //           </div>
  //           <div className="flex-column cs-block">
  //             <label>Spot name</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               //   required
  //               placeholder="Spot name"
  //             />
  //             {nextStep && errors.noName && (
  //               <div className="error-cs">* {errors.noName}</div>
  //             )}
  //           </div>
  //           <div className="flex-column cs-block">
  //             <label>Type</label>
  //             <input
  //               className="cs-text"
  //               type="text"
  //               value={type}
  //               onChange={(e) => setType(e.target.value)}
  //               //   required
  //               placeholder="Type (e.g. Entire home)"
  //             />
  //             {nextStep && errors.noType && (
  //               <div className="error-cs">* {errors.noType}</div>
  //             )}
  //           </div>
  //         </div>
  //         {/* </div> */}

  //         <div className="mtb-16-24">
  //           <div className="p-14-24" onClick={handleNextStep}>
  //             <span>Continue</span>
  //           </div>
  //         </div>
  //       </form>
  //       {/* {nextStep && nextStepModal && (
  //         <>
  //           <Modal onClose={() => setNextStepModal(false)}>
  //             <NextStepForm setNextStepModal={setNextStepModal} />
  //           </Modal>
  //         </>
  //       )} */}
  //     </div>
  //   </div>
  // );
}

// function NextStepForm({ setNextStepModal }) {
//   const [tags, setTags] = useState("");
//   const [guests, setGuests] = useState();
//   const [bedroom, setBedroom] = useState();
//   const [beds, setBeds] = useState();
//   const [bath, setBath] = useState();
//   const [service_fee, setservice_fee] = useState();
//   const [clean_fee, setclean_fee] = useState();

//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);

//   useEffect(() => {
//     const newErros = {};
//   });

//   return (
//     <div className="flex-column login-form">
//       <div className="x"></div>
//       <div className="login-header flex s-b center">
//         <div className="header-left"></div>
//         <div className="mlr-16">
//           <h1 className="h1-inherit">Calibnb your home</h1>
//         </div>
//         <div className="header-right"></div>
//       </div>
//       <div className="p-24 login-body">
//         <div className="mtb-8-24">
//           <h3 className="mb-8">Continue</h3>
//         </div>
//         <form className="login-form">
//           <div className="mt-16">
//             <div className="br relative">
//               <div className="flex input-box">
//                 <select
//                   //   className="input-text"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Please select a tag
//                   </option>
//                   <option>Camping</option>
//                   <option>Cabins</option>
//                   <option>Amazing views</option>
//                 </select>
//               </div>
//               {/* {nextStep && errors.noAddress && (
//                 <div className="error-cs">{errors.noAddress}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="number"
//                   value={guests}
//                   onChange={(e) => setGuests(e.target.value)}
//                   placeholder="Guests number"
//                 />
//               </div>
//               {/* {nextStep && errors.noCity && (
//                 <div className="error-cs">{errors.noCity}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="number"
//                   value={bedroom}
//                   onChange={(e) => setBedroom(e.target.value)}
//                   placeholder="Bedroom(s)"
//                 />
//               </div>
//               {/* {nextStep && errors.noState && (
//                 <div className="error-cs">{errors.noState}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="number"
//                   value={beds}
//                   onChange={(e) => setBeds(e.target.value)}
//                   //   required
//                   placeholder="Bed(s)"
//                 />
//               </div>
//               {/* {nextStep && errors.noCountry && (
//                 <div className="error-cs">{errors.noCountry}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="number"
//                   value={bath}
//                   onChange={(e) => setBath(e.target.value)}
//                   placeholder="Bath number"
//                 />
//               </div>
//               {/* {nextStep && errors.noName && (
//                 <div className="error-cs">{errors.noName}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="decimal"
//                   value={clean_fee}
//                   onChange={(e) => setclean_fee(e.target.value)}
//                   placeholder="clean_fee fee (in %)"
//                 />
//               </div>
//               {/* {nextStep && errors.noType && (
//                 <div className="error-cs">{errors.noType}</div>
//               )} */}
//               <div className="flex input-box">
//                 <input
//                   className="input-text"
//                   type="decimal"
//                   value={service_fee}
//                   onChange={(e) => setservice_fee(e.target.value)}
//                   placeholder="service_fee fee (in %)"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mtb-16-24">
//             <div
//               className="p-14-24"
//               onClick={(e) => {
//                 e.preventDefault();
//                 // setCreateSpotModal(false);
//                 // setNextStep(true);
//                 setNextStepModal(false);
//               }}
//             >
//               <span>Submit</span>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

export default CreateSpot;
